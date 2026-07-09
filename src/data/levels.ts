import { Level } from '../types/curriculum';
import { LEVEL_1_UNITS } from './level01';
import { LEVEL_2_UNITS } from './level02';
import { LEVEL_3_UNITS } from './level03';
import { LEVEL_4_UNITS } from './level04';
import { LEVEL_5_UNITS } from './level05';
import { LEVEL_6_UNITS } from './level06';
import { LEVEL_7_UNITS } from './level07';
import { LEVEL_8_UNITS } from './level08';
import { LEVEL_9_UNITS } from './level09';
import { LEVEL_10_UNITS } from './level10';
import { LEVEL_11_UNITS } from './level11';
import { LEVEL_12_UNITS } from './level12';
import { LEVEL_13_UNITS } from './level13';
import { LEVEL_14_UNITS } from './level14';
import { LEVEL_15_UNITS } from './level15';
import { LEVEL_16_UNITS } from './level16';
import { LEVEL_17_UNITS } from './level17';
import { LEVEL_18_UNITS } from './level18';
import { LEVEL_19_UNITS } from './level19';
import { LEVEL_20_UNITS } from './level20';

/**
 * 20개 영어 등급 = 앱의 뼈대.
 * 구조(20개)는 지금 전부 정의하고, 실제 콘텐츠(units)는 Level 1~20까지 채운다.
 *
 * CEFR 매핑으로 난이도 기준을 고정:
 *   L1~4 = A1, L5~7 = A2, L8~11 = B1, L12~15 = B2, L16~18 = C1, L19~20 = C2
 */
export const LEVELS: Level[] = [
  {
    id: 1,
    title: '완전 왕초보',
    subtitle: '알파벳·소리·기본 인사',
    cefr: 'A1',
    cando: ['알파벳과 소리 알기', '기본 인사하기', '이름·나이·국가 말하기'],
    targetVocab: 100,
    color: '#5b8cff',
    units: LEVEL_1_UNITS,
  },
  {
    id: 2,
    title: '왕초보 탈출',
    subtitle: 'be동사·기본 명사·가족',
    cefr: 'A1',
    cando: ['가족·사물 소개', 'this/that 구분', '기초 단어 200개'],
    targetVocab: 200,
    color: '#5b8cff',
    units: LEVEL_2_UNITS,
  },
  {
    id: 3,
    title: '기초 다지기',
    subtitle: '일반동사 현재형',
    cefr: 'A1',
    cando: ['일상 행동 말하기', '좋아하는 것 표현', '단어 300개'],
    targetVocab: 300,
    color: '#5b8cff',
    units: LEVEL_3_UNITS,
  },
  {
    id: 4,
    title: '기초 완성',
    subtitle: '의문문·부정문',
    cefr: 'A1',
    cando: ['질문하고 답하기', '부정 표현', '단어 450개'],
    targetVocab: 450,
    color: '#5b8cff',
    units: LEVEL_4_UNITS,
  },
  {
    id: 5,
    title: '기초 회화 가능',
    subtitle: '현재진행·일상 루틴',
    cefr: 'A2',
    cando: ['하루 일과 말하기', '카페·편의점·길 묻기', '3~5턴 회화'],
    targetVocab: 700,
    color: '#3ddc97',
    units: LEVEL_5_UNITS,
  },
  {
    id: 6,
    title: '생활 회화',
    subtitle: '시간·요일·빈도',
    cefr: 'A2',
    cando: ['약속 잡기', '일정 말하기', '단어 900개'],
    targetVocab: 900,
    color: '#3ddc97',
    units: LEVEL_6_UNITS,
  },
  {
    id: 7,
    title: '생활 회화 완성',
    subtitle: '조동사 can/should',
    cefr: 'A2',
    cando: ['능력·허락·조언 표현', '부탁하기', '단어 1100개'],
    targetVocab: 1100,
    color: '#3ddc97',
    units: LEVEL_7_UNITS,
  },
  {
    id: 8,
    title: '여행 영어 입문',
    subtitle: '과거형',
    cefr: 'B1',
    cando: ['어제 한 일 말하기', '경험 말하기', '단어 1400개'],
    targetVocab: 1400,
    color: '#ffd166',
    units: LEVEL_8_UNITS,
  },
  {
    id: 9,
    title: '여행/일상 대화',
    subtitle: '미래형·계획',
    cefr: 'B1',
    cando: ['식당·호텔·공항·쇼핑', '계획 말하기', '상황극 대화'],
    targetVocab: 1700,
    color: '#ffd166',
    units: LEVEL_9_UNITS,
  },
  {
    id: 10,
    title: '자유로운 일상',
    subtitle: '비교급·최상급',
    cefr: 'B1',
    cando: ['비교해서 말하기', '자기 경험 설명', '발음·문법 피드백'],
    targetVocab: 2000,
    color: '#ffd166',
    units: LEVEL_10_UNITS,
  },
  {
    id: 11,
    title: '일상 마스터',
    subtitle: '현재완료',
    cefr: 'B1',
    cando: ['경험·완료 표현', '긴 대화 유지', '단어 2400개'],
    targetVocab: 2400,
    color: '#ffd166',
    units: LEVEL_11_UNITS,
  },
  {
    id: 12,
    title: '중급 진입',
    subtitle: '관계대명사',
    cefr: 'B2',
    cando: ['긴 문장 만들기', '설명 덧붙이기', '단어 2800개'],
    targetVocab: 2800,
    color: '#ff9f68',
    units: LEVEL_12_UNITS,
  },
  {
    id: 13,
    title: '의견 말하기',
    subtitle: '이유·근거 표현',
    cefr: 'B2',
    cando: ['의견 말하기', '이유 설명하기', '취미·일 대화'],
    targetVocab: 3200,
    color: '#ff9f68',
    units: LEVEL_13_UNITS,
  },
  {
    id: 14,
    title: '자연스러운 표현',
    subtitle: '가정법 기초',
    cefr: 'B2',
    cando: ['가정 상황 말하기', '자연스러운 표현 교정', '단어 3600개'],
    targetVocab: 3600,
    color: '#ff9f68',
    units: LEVEL_14_UNITS,
  },
  {
    id: 15,
    title: '중급 완성',
    subtitle: '수동태·분사',
    cefr: 'B2',
    cando: ['뉴스·이슈 대화', '복잡한 문장', '단어 4000개'],
    targetVocab: 4000,
    color: '#ff9f68',
    units: LEVEL_15_UNITS,
  },
  {
    id: 16,
    title: '고급 진입',
    subtitle: '관용표현·구동사',
    cefr: 'C1',
    cando: ['관용표현 사용', '뉘앙스 이해', '단어 4800개'],
    targetVocab: 4800,
    color: '#c98bff',
    units: LEVEL_16_UNITS,
  },
  {
    id: 17,
    title: '유창함 훈련',
    subtitle: '토론·논리 전개',
    cefr: 'C1',
    cando: ['토론하기', '논리적으로 말하기', '단어 5600개'],
    targetVocab: 5600,
    color: '#c98bff',
    units: LEVEL_17_UNITS,
  },
  {
    id: 18,
    title: '고급 완성',
    subtitle: '비즈니스 영어',
    cefr: 'C1',
    cando: ['회의·이메일·발표', '격식 표현', '단어 6500개'],
    targetVocab: 6500,
    color: '#c98bff',
    units: LEVEL_18_UNITS,
  },
  {
    id: 19,
    title: '원어민에 가깝게',
    subtitle: '면접·협상',
    cefr: 'C2',
    cando: ['면접·협상', '미묘한 뉘앙스', '단어 7500개'],
    targetVocab: 7500,
    color: '#ff6b9d',
    units: LEVEL_19_UNITS,
  },
  {
    id: 20,
    title: '베테랑',
    subtitle: '프리토킹·고급 토론',
    cefr: 'C2',
    cando: ['어떤 주제든 프리토킹', '고급 문장·관용표현', '원어민 수준 대응'],
    targetVocab: 8000,
    color: '#ff6b9d',
    units: LEVEL_20_UNITS,
  },
];

export function getLevel(id: number): Level | undefined {
  return LEVELS.find((l) => l.id === id);
}
