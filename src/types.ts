export type TopicId = string;

export interface Topic {
  id: TopicId;
  name: string;
  shortName: string;
  description: string;
  icon: TopicIconName;
}

export type TopicIconName =
  | 'cloud'
  | 'layers'
  | 'shield'
  | 'compute'
  | 'network'
  | 'governance'
  | 'pricing'
  | 'availability'
  | 'storage'
  | 'security'
  | 'database'
  | 'analytics'
  | 'monitor'
  | 'iac'
  | 'support'
  | 'compliance';

export interface DistractorExplanation {
  whatItMeans: string;
  whyItMaySeemRight: string;
  whyNotHere: string;
  whenItWouldFit: string;
}

export interface AnswerOption {
  id: string;
  text: string;
  whyIncorrect: string;
  distractor?: DistractorExplanation;
}

export interface SignalStep {
  phrase: string;
  reasoning: string;
}

export interface PracticeQuestion {
  id: string;
  topicId: TopicId;
  prompt: string;
  options: AnswerOption[];
  correctOptionId: string;
  explanation: {
    simpleTerms: string;
    realLifeExample: string;
  };
  signal: {
    phrase: string;
    suggests: string;
    steps?: SignalStep[];
    conclusion?: string;
  };
}

export interface QuestionResult {
  questionId: string;
  topicId: TopicId;
  selectedOptionId: string;
  correct: boolean;
  timestamp: number;
}

export interface SessionResult {
  questionId: string;
  topicId: TopicId;
  selectedOptionId: string;
  correct: boolean;
  timestamp: number;
}

export interface ExamTrapItem {
  name: string;
  whatItDoes: string;
  whenToUse: string;
  examClue: string;
}

export interface ExamTrapGroup {
  id: string;
  title: string;
  summary: string;
  items: ExamTrapItem[];
}
