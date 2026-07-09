#!/usr/bin/env node
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'english-content-'));

const errors = [];
const warnings = [];
const stats = {
  preparedLevels: 0,
  units: 0,
  lessons: 0,
  vocabWords: 0,
  scenarios: 0,
  conversationRefs: 0,
};

try {
  compileData();
  const { LEVELS } = require(path.join(tempDir, 'data/levels.js'));
  const { SCENARIOS } = require(path.join(tempDir, 'data/scenarios.js'));

  validateLevels(LEVELS, SCENARIOS);
  validateScenarios(SCENARIOS);
  report();
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}

function compileData() {
  execFileSync(
    process.execPath,
    [
      path.join(root, 'node_modules/typescript/bin/tsc'),
      'src/data/levels.ts',
      'src/data/scenarios.ts',
      '--ignoreConfig',
      '--outDir',
      tempDir,
      '--rootDir',
      'src',
      '--module',
      'Node16',
      '--target',
      'ES2020',
      '--moduleResolution',
      'node16',
      '--esModuleInterop',
      '--skipLibCheck',
      '--strict',
      '--noEmitOnError',
    ],
    { cwd: root, stdio: 'pipe' }
  );
}

function validateLevels(levels, scenarios) {
  if (!Array.isArray(levels)) {
    fail('LEVELS must be an array');
    return;
  }

  if (levels.length !== 20) {
    fail(`LEVELS should contain 20 levels, found ${levels.length}`);
  }

  const levelIds = new Set();
  const unitIds = new Set();
  const lessonIds = new Set();
  const referencedScenarios = new Set();

  levels.forEach((level, index) => {
    const location = `Level ${level?.id ?? index + 1}`;

    if (!isPositiveInteger(level?.id)) {
      fail(`${location}: id must be a positive integer`);
      return;
    }
    if (level.id !== index + 1) fail(`${location}: expected id ${index + 1}`);
    if (levelIds.has(level.id)) fail(`${location}: duplicate level id`);
    levelIds.add(level.id);

    requiredString(level.title, `${location}.title`);
    requiredString(level.subtitle, `${location}.subtitle`);
    requiredString(level.cefr, `${location}.cefr`);
    requiredString(level.color, `${location}.color`);
    if (!Array.isArray(level.cando) || level.cando.length < 2) {
      fail(`${location}.cando: expected at least 2 items`);
    }
    if (!isPositiveInteger(level.targetVocab)) {
      fail(`${location}.targetVocab: must be a positive integer`);
    }

    if (!level.units) return;

    stats.preparedLevels += 1;
    const expectedUnits = level.id + 7;
    if (!Array.isArray(level.units)) {
      fail(`${location}.units: must be an array when present`);
      return;
    }
    if (level.units.length !== expectedUnits) {
      fail(`${location}: expected ${expectedUnits} units, found ${level.units.length}`);
    }

    level.units.forEach((unit, unitIndex) => {
      validateUnit(unit, unitIndex, level, unitIds, lessonIds, referencedScenarios, scenarios);
    });
  });

  Object.keys(scenarios).forEach((scenarioId) => {
    if (!referencedScenarios.has(scenarioId)) {
      warn(`Scenario '${scenarioId}' is not referenced by any prepared lesson`);
    }
  });
}

function validateUnit(unit, unitIndex, level, unitIds, lessonIds, referencedScenarios, scenarios) {
  const unitLocation = `Level ${level.id} Unit ${unit?.order ?? unitIndex + 1}`;
  const expectedUnitId = `${level.id}-${unitIndex + 1}`;

  if (typeof unit?.id !== 'string' || !new RegExp(`^${level.id}-\\d+$`).test(unit.id)) {
    fail(`${unitLocation}: invalid unit id '${unit?.id}'`);
  } else if (unit.id !== expectedUnitId) {
    warn(`${unitLocation}: id '${unit.id}' does not match order-based id '${expectedUnitId}'`);
  }
  if (unitIds.has(unit.id)) fail(`${unitLocation}: duplicate unit id '${unit.id}'`);
  unitIds.add(unit.id);

  if (unit.levelId !== level.id) fail(`${unitLocation}: levelId should be ${level.id}`);
  if (unit.order !== unitIndex + 1) fail(`${unitLocation}: order should be ${unitIndex + 1}`);
  requiredString(unit.title, `${unitLocation}.title`);
  requiredString(unit.icon, `${unitLocation}.icon`);
  requiredString(unit.description, `${unitLocation}.description`);

  if (!Array.isArray(unit.lessons) || unit.lessons.length === 0) {
    fail(`${unitLocation}: lessons must be a non-empty array`);
    return;
  }

  stats.units += 1;
  unit.lessons.forEach((lesson, lessonIndex) => {
    validateLesson(
      lesson,
      lessonIndex,
      unit,
      unitLocation,
      lessonIds,
      referencedScenarios,
      scenarios
    );
  });
}

function validateLesson(
  lesson,
  lessonIndex,
  unit,
  unitLocation,
  lessonIds,
  referencedScenarios,
  scenarios
) {
  const lessonLocation = `${unitLocation} Lesson ${lesson?.order ?? lessonIndex + 1}`;
  const expectedLessonId = `${unit.id}-${lessonIndex + 1}`;

  if (lesson?.id !== expectedLessonId) {
    fail(`${lessonLocation}: expected id '${expectedLessonId}', found '${lesson?.id}'`);
  }
  if (lessonIds.has(lesson.id)) fail(`${lessonLocation}: duplicate lesson id '${lesson.id}'`);
  lessonIds.add(lesson.id);

  if (lesson.unitId !== unit.id) fail(`${lessonLocation}: unitId should be '${unit.id}'`);
  if (lesson.order !== lessonIndex + 1) fail(`${lessonLocation}: order should be ${lessonIndex + 1}`);
  requiredString(lesson.type, `${lessonLocation}.type`);
  requiredString(lesson.title, `${lessonLocation}.title`);
  if (!isPositiveInteger(lesson.xp)) fail(`${lessonLocation}.xp: must be a positive integer`);

  if (!lesson.content || lesson.content.kind !== lesson.type) {
    fail(`${lessonLocation}: content.kind should match lesson.type '${lesson.type}'`);
    return;
  }

  stats.lessons += 1;

  switch (lesson.content.kind) {
    case 'vocab':
      validateVocab(lesson.content, lessonLocation);
      break;
    case 'grammar':
      validateGrammar(lesson.content, lessonLocation);
      break;
    case 'build':
      validateBuild(lesson.content, lessonLocation);
      break;
    case 'listening':
      validateListening(lesson.content, lessonLocation);
      break;
    case 'speaking':
      validateSpeaking(lesson.content, lessonLocation);
      break;
    case 'conversation':
      validateConversationContent(lesson.content, lessonLocation, referencedScenarios, scenarios);
      break;
    case 'review':
      validateQuestions(lesson.content.questions, `${lessonLocation}.questions`);
      break;
    case 'test':
      if (!isPositiveInteger(lesson.content.passScore) || lesson.content.passScore > 100) {
        fail(`${lessonLocation}.passScore: must be between 1 and 100`);
      }
      validateQuestions(lesson.content.questions, `${lessonLocation}.questions`);
      break;
    default:
      fail(`${lessonLocation}: unknown content kind '${lesson.content.kind}'`);
  }
}

function validateVocab(content, location) {
  if (!Array.isArray(content.words) || content.words.length < 4) {
    fail(`${location}.words: expected at least 4 words`);
    return;
  }

  const seen = new Set();
  content.words.forEach((word, index) => {
    const wordLocation = `${location}.words[${index}]`;
    requiredEnglish(word.en, `${wordLocation}.en`);
    requiredString(word.ko, `${wordLocation}.ko`);
    requiredEnglish(word.example, `${wordLocation}.example`);
    requiredString(word.exampleKo, `${wordLocation}.exampleKo`);

    const key = word.en.trim().toLowerCase();
    if (seen.has(key)) fail(`${wordLocation}: duplicate vocab word '${word.en}' in lesson`);
    seen.add(key);
    stats.vocabWords += 1;
  });
}

function validateGrammar(content, location) {
  requiredString(content.point, `${location}.point`);
  requiredString(content.explanation, `${location}.explanation`);
  if (!Array.isArray(content.examples) || content.examples.length < 2) {
    fail(`${location}.examples: expected at least 2 examples`);
    return;
  }
  content.examples.forEach((example, index) => {
    requiredEnglish(example.en, `${location}.examples[${index}].en`);
    requiredString(example.ko, `${location}.examples[${index}].ko`);
  });
  if (content.tips && !Array.isArray(content.tips)) fail(`${location}.tips: must be an array`);
}

function validateBuild(content, location) {
  if (!Array.isArray(content.items) || content.items.length < 1) {
    fail(`${location}.items: expected at least 1 build item`);
    return;
  }
  if (content.items.length < 3) warn(`${location}.items: only ${content.items.length} build items`);
  content.items.forEach((item, index) => {
    const itemLocation = `${location}.items[${index}]`;
    requiredString(item.ko, `${itemLocation}.ko`);
    if (!Array.isArray(item.answer) || item.answer.length < 1) {
      fail(`${itemLocation}.answer: expected at least 1 word`);
    }
    if (!Array.isArray(item.bank) || item.bank.length < item.answer.length) {
      fail(`${itemLocation}.bank: expected at least answer length`);
    } else if (!containsAllWords(item.bank, item.answer)) {
      fail(`${itemLocation}.bank: must contain every answer token`);
    }
  });
}

function validateListening(content, location) {
  if (!Array.isArray(content.items) || content.items.length < 1) {
    fail(`${location}.items: expected at least 1 listening item`);
    return;
  }
  if (content.items.length < 3) warn(`${location}.items: only ${content.items.length} listening items`);
  content.items.forEach((item, index) => {
    const itemLocation = `${location}.items[${index}]`;
    requiredEnglish(item.audioText, `${itemLocation}.audioText`);
    requiredString(item.question, `${itemLocation}.question`);
    validateOptions(item.options, item.answerIndex, itemLocation);
  });
}

function validateSpeaking(content, location) {
  if (!Array.isArray(content.prompts) || content.prompts.length < 1) {
    fail(`${location}.prompts: expected at least 1 prompt`);
    return;
  }
  if (content.prompts.length < 3) warn(`${location}.prompts: only ${content.prompts.length} prompts`);
  content.prompts.forEach((prompt, index) => {
    requiredEnglish(prompt.en, `${location}.prompts[${index}].en`);
    requiredString(prompt.ko, `${location}.prompts[${index}].ko`);
  });
}

function validateConversationContent(content, location, referencedScenarios, scenarios) {
  requiredString(content.scenarioId, `${location}.scenarioId`);
  requiredString(content.title, `${location}.title`);
  requiredString(content.situation, `${location}.situation`);
  if (!isPositiveInteger(content.goalTurns)) fail(`${location}.goalTurns: must be positive`);

  stats.conversationRefs += 1;
  referencedScenarios.add(content.scenarioId);
  if (!scenarios[content.scenarioId]) {
    fail(`${location}: missing scenario '${content.scenarioId}'`);
  }
}

function validateQuestions(questions, location) {
  if (!Array.isArray(questions) || questions.length < 1) {
    fail(`${location}: expected at least 1 question`);
    return;
  }
  if (questions.length < 3) warn(`${location}: only ${questions.length} questions`);
  questions.forEach((question, index) => {
    const questionLocation = `${location}[${index}]`;
    requiredString(question.prompt, `${questionLocation}.prompt`);
    validateOptions(question.options, question.answerIndex, questionLocation);
  });
}

function validateScenarios(scenarios) {
  const keys = Object.keys(scenarios ?? {});
  stats.scenarios = keys.length;

  if (keys.length === 0) {
    fail('SCENARIOS must not be empty');
    return;
  }

  keys.forEach((key) => {
    const scenario = scenarios[key];
    const location = `Scenario '${key}'`;

    if (scenario.id !== key) fail(`${location}: id should match object key`);
    if (!Array.isArray(scenario.steps) || scenario.steps.length < 1) {
      fail(`${location}.steps: expected at least 1 step`);
      return;
    }

    scenario.steps.forEach((step, index) => {
      const stepLocation = `${location}.steps[${index}]`;
      requiredEnglish(step.bot, `${stepLocation}.bot`);
      requiredString(step.botKo, `${stepLocation}.botKo`);
      if (!Array.isArray(step.suggestions) || step.suggestions.length < 2) {
        fail(`${stepLocation}.suggestions: expected at least 2 suggestions`);
      } else {
        step.suggestions.forEach((suggestion, suggestionIndex) => {
          requiredEnglish(suggestion, `${stepLocation}.suggestions[${suggestionIndex}]`);
        });
      }
    });

    requiredEnglish(scenario.closing?.bot, `${location}.closing.bot`);
    requiredString(scenario.closing?.botKo, `${location}.closing.botKo`);
  });
}

function validateOptions(options, answerIndex, location) {
  if (!Array.isArray(options) || options.length < 2) {
    fail(`${location}.options: expected at least 2 options`);
    return;
  }
  if (!Number.isInteger(answerIndex) || answerIndex < 0 || answerIndex >= options.length) {
    fail(`${location}.answerIndex: ${answerIndex} is out of range`);
  }
  options.forEach((option, index) => requiredString(option, `${location}.options[${index}]`));
}

function requiredString(value, location) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    fail(`${location}: required non-empty string`);
    return false;
  }
  return true;
}

function requiredEnglish(value, location) {
  if (!requiredString(value, location)) return;
  if (/[가-힣]/.test(value)) fail(`${location}: English field contains Korean text`);
}

function containsAllWords(bank, answer) {
  const counts = new Map();
  bank.forEach((word) => counts.set(word, (counts.get(word) ?? 0) + 1));
  return answer.every((word) => {
    const count = counts.get(word) ?? 0;
    if (count <= 0) return false;
    counts.set(word, count - 1);
    return true;
  });
}

function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function report() {
  console.log('Content validation summary');
  console.log(`- prepared levels: ${stats.preparedLevels}`);
  console.log(`- units: ${stats.units}`);
  console.log(`- lessons: ${stats.lessons}`);
  console.log(`- vocab words: ${stats.vocabWords}`);
  console.log(`- scenario refs: ${stats.conversationRefs}`);
  console.log(`- scenarios: ${stats.scenarios}`);

  if (warnings.length > 0) {
    console.log(`\nWarnings (${warnings.length})`);
    warnings.slice(0, 20).forEach((message) => console.log(`- ${message}`));
    if (warnings.length > 20) console.log(`- ...and ${warnings.length - 20} more`);
  }

  if (errors.length > 0) {
    console.error(`\nErrors (${errors.length})`);
    errors.slice(0, 80).forEach((message) => console.error(`- ${message}`));
    if (errors.length > 80) console.error(`- ...and ${errors.length - 80} more`);
    process.exit(1);
  }

  console.log('\nContent validation passed.');
}
