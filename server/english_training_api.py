#!/usr/bin/env python3
import argparse
import hashlib
import hmac
import json
import os
import secrets
import sqlite3
import time
import unicodedata
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse


DEFAULT_PROGRESS = {"completedLessons": {}, "xp": 0, "weakItems": []}
TOKEN_TTL_SECONDS = 60 * 60 * 24 * 60
PBKDF2_ITERATIONS = 210_000


class ApiError(Exception):
  def __init__(self, status, message):
    super().__init__(message)
    self.status = status
    self.message = message


def now():
  return int(time.time())


def normalize_name(name):
  return unicodedata.normalize("NFKC", name).strip()


def account_key(name):
  return normalize_name(name).lower()


def hash_password(password, salt_hex=None):
  salt = bytes.fromhex(salt_hex) if salt_hex else secrets.token_bytes(16)
  digest = hashlib.pbkdf2_hmac(
    "sha256", password.encode("utf-8"), salt, PBKDF2_ITERATIONS
  )
  return salt.hex(), digest.hex()


def token_hash(token):
  return hashlib.sha256(token.encode("utf-8")).hexdigest()


def parse_progress(value):
  if not isinstance(value, dict):
    return DEFAULT_PROGRESS.copy()

  completed = value.get("completedLessons")
  weak = value.get("weakItems")
  xp = value.get("xp")

  return {
    "completedLessons": completed if isinstance(completed, dict) else {},
    "xp": xp if isinstance(xp, int) and xp >= 0 else 0,
    "weakItems": weak if isinstance(weak, list) else [],
  }


class Store:
  def __init__(self, db_path):
    self.db_path = db_path
    Path(db_path).parent.mkdir(parents=True, exist_ok=True)
    self.init_db()

  def connect(self):
    conn = sqlite3.connect(self.db_path)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn

  def init_db(self):
    with self.connect() as conn:
      conn.executescript(
        """
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          account_key TEXT NOT NULL UNIQUE,
          password_salt TEXT NOT NULL,
          password_hash TEXT NOT NULL,
          created_at INTEGER NOT NULL,
          updated_at INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS sessions (
          token_hash TEXT PRIMARY KEY,
          user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          created_at INTEGER NOT NULL,
          expires_at INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS progress (
          user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
          data TEXT NOT NULL,
          updated_at INTEGER NOT NULL
        );

        CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON sessions(user_id);
        CREATE INDEX IF NOT EXISTS sessions_expires_at_idx ON sessions(expires_at);
        """
      )

  def create_user(self, name, password):
    clean_name = normalize_name(name)
    if len(clean_name) < 2:
      raise ApiError(400, "이름은 2글자 이상 입력해주세요.")
    if len(password) < 6:
      raise ApiError(400, "비밀번호는 6글자 이상 입력해주세요.")

    salt, password_digest = hash_password(password)
    current = now()
    try:
      with self.connect() as conn:
        cursor = conn.execute(
          """
          INSERT INTO users (name, account_key, password_salt, password_hash, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?)
          """,
          (clean_name, account_key(clean_name), salt, password_digest, current, current),
        )
        user_id = cursor.lastrowid
        conn.execute(
          "INSERT INTO progress (user_id, data, updated_at) VALUES (?, ?, ?)",
          (user_id, json.dumps(DEFAULT_PROGRESS), current),
        )
        return self.issue_session(conn, user_id, clean_name)
    except sqlite3.IntegrityError:
      raise ApiError(409, "이미 있는 사용자입니다. 로그인으로 진행해주세요.")

  def login(self, name, password):
    key = account_key(name)
    with self.connect() as conn:
      user = conn.execute("SELECT * FROM users WHERE account_key = ?", (key,)).fetchone()
      if not user:
        raise ApiError(404, "계정을 찾을 수 없습니다. 먼저 계정을 만들어주세요.")

      _, password_digest = hash_password(password, user["password_salt"])
      if not hmac.compare_digest(password_digest, user["password_hash"]):
        raise ApiError(401, "비밀번호가 맞지 않습니다.")

      conn.execute("UPDATE users SET updated_at = ? WHERE id = ?", (now(), user["id"]))
      return self.issue_session(conn, user["id"], user["name"])

  def issue_session(self, conn, user_id, name):
    token = secrets.token_urlsafe(32)
    current = now()
    expires_at = current + TOKEN_TTL_SECONDS
    conn.execute(
      "INSERT INTO sessions (token_hash, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)",
      (token_hash(token), user_id, current, expires_at),
    )
    return {"token": token, "user": self.public_user({"id": user_id, "name": name})}

  def public_user(self, user):
    return {"id": str(user["id"]), "name": user["name"]}

  def get_user_for_token(self, token):
    if not token:
      raise ApiError(401, "로그인이 필요합니다.")

    current = now()
    with self.connect() as conn:
      row = conn.execute(
        """
        SELECT users.id, users.name
        FROM sessions
        JOIN users ON users.id = sessions.user_id
        WHERE sessions.token_hash = ? AND sessions.expires_at > ?
        """,
        (token_hash(token), current),
      ).fetchone()

      if not row:
        raise ApiError(401, "로그인이 만료되었습니다. 다시 로그인해주세요.")
      return row

  def delete_session(self, token):
    if not token:
      return
    with self.connect() as conn:
      conn.execute("DELETE FROM sessions WHERE token_hash = ?", (token_hash(token),))

  def get_progress(self, user_id):
    with self.connect() as conn:
      row = conn.execute("SELECT data FROM progress WHERE user_id = ?", (user_id,)).fetchone()
      if not row:
        return DEFAULT_PROGRESS.copy()
      try:
        return parse_progress(json.loads(row["data"]))
      except json.JSONDecodeError:
        return DEFAULT_PROGRESS.copy()

  def save_progress(self, user_id, progress):
    clean = parse_progress(progress)
    current = now()
    with self.connect() as conn:
      conn.execute(
        """
        INSERT INTO progress (user_id, data, updated_at)
        VALUES (?, ?, ?)
        ON CONFLICT(user_id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at
        """,
        (user_id, json.dumps(clean, ensure_ascii=False), current),
      )
    return clean


class Handler(BaseHTTPRequestHandler):
  store = None

  def do_OPTIONS(self):
    self.send_response(204)
    self.send_cors_headers()
    self.end_headers()

  def do_GET(self):
    self.handle_request()

  def do_POST(self):
    self.handle_request()

  def do_PUT(self):
    self.handle_request()

  def handle_request(self):
    try:
      path = urlparse(self.path).path

      if self.command == "GET" and path == "/health":
        return self.respond({"ok": True, "service": "english-training-api"})

      if self.command == "POST" and path == "/auth/register":
        body = self.read_json()
        result = self.store.create_user(body.get("name", ""), body.get("password", ""))
        result["progress"] = DEFAULT_PROGRESS.copy()
        return self.respond(result, 201)

      if self.command == "POST" and path == "/auth/login":
        body = self.read_json()
        result = self.store.login(body.get("name", ""), body.get("password", ""))
        result["progress"] = self.store.get_progress(int(result["user"]["id"]))
        return self.respond(result)

      if self.command == "POST" and path == "/auth/logout":
        self.store.delete_session(self.get_bearer_token())
        return self.respond({"ok": True})

      if self.command == "GET" and path == "/auth/me":
        user = self.store.get_user_for_token(self.get_bearer_token())
        return self.respond({"user": self.store.public_user(user)})

      if self.command == "GET" and path == "/progress":
        user = self.store.get_user_for_token(self.get_bearer_token())
        return self.respond({"progress": self.store.get_progress(user["id"])})

      if self.command == "PUT" and path == "/progress":
        user = self.store.get_user_for_token(self.get_bearer_token())
        body = self.read_json()
        progress = self.store.save_progress(user["id"], body.get("progress"))
        return self.respond({"progress": progress})

      raise ApiError(404, "요청한 API를 찾을 수 없습니다.")
    except ApiError as err:
      self.respond({"error": err.message}, err.status)
    except Exception as err:
      print(f"Unhandled API error: {err}", flush=True)
      self.respond({"error": "서버 오류가 발생했습니다."}, 500)

  def read_json(self):
    length = int(self.headers.get("Content-Length") or "0")
    if length <= 0:
      return {}
    raw = self.rfile.read(length)
    try:
      return json.loads(raw.decode("utf-8"))
    except json.JSONDecodeError:
      raise ApiError(400, "JSON 형식이 올바르지 않습니다.")

  def get_bearer_token(self):
    auth = self.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
      return ""
    return auth.removeprefix("Bearer ").strip()

  def respond(self, payload, status=200):
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    self.send_response(status)
    self.send_cors_headers()
    self.send_header("Content-Type", "application/json; charset=utf-8")
    self.send_header("Content-Length", str(len(body)))
    self.end_headers()
    if self.command != "HEAD":
      self.wfile.write(body)

  def send_cors_headers(self):
    origin = self.headers.get("Origin")
    self.send_header("Access-Control-Allow-Origin", origin or "*")
    self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
    self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS")

  def log_message(self, fmt, *args):
    print(f"{self.address_string()} - {fmt % args}", flush=True)


def main():
  parser = argparse.ArgumentParser()
  parser.add_argument("--host", default=os.environ.get("HOST", "127.0.0.1"))
  parser.add_argument("--port", type=int, default=int(os.environ.get("PORT", "8798")))
  parser.add_argument(
    "--db",
    default=os.environ.get("DB_PATH", "/srv/english-training-api/data/app.db"),
  )
  args = parser.parse_args()

  Handler.store = Store(args.db)
  server = ThreadingHTTPServer((args.host, args.port), Handler)
  print(f"english-training-api listening on {args.host}:{args.port}", flush=True)
  server.serve_forever()


if __name__ == "__main__":
  main()
