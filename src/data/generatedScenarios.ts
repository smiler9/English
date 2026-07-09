import { Scenario } from '../engine/conversationEngine';
import { makeGeneratedScenarios } from './generatedAdvancedContent';

export const GENERATED_SCENARIOS: Record<string, Scenario> = makeGeneratedScenarios();
