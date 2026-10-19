export type SubjectType = 'food' | 'beverage';

export type OutputMode = 'one-message' | 'two-messages';

export type AspectRatio = '1:1' | '4:5' | '3:4' | '9:16' | '16:9';

export interface FormState {
  subjectType: SubjectType;
  menuName: string;
  cuisineHint: string;
  cameraAngle: string;
  lighting: string;
  mood: string;
  beverageEffect: string;
  secondaryEffect?: string;
  mainPosition: string;
  cropDistance: string;
  backgroundDetail: string;
  aspectRatio: AspectRatio;
  additionalNotes: string;
  outputMode: OutputMode;
}

export interface PresetItem {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  subjectType: SubjectType;
  menuName: string;
  cuisineHint: string;
  cameraAngle: string;
  lighting: string;
  mood: string;
  beverageEffect: string;
  secondaryEffect?: string;
  mainPosition: string;
  cropDistance: string;
  backgroundDetail: string;
  aspectRatio: AspectRatio;
  additionalNotes: string;
  outputMode: OutputMode;
  coverImageDataUrl?: string;
}

export interface GeneratedPromptResult {
  gemini: {
    singleMessage: string;
    message1: string;
    message2: string;
  };
  chatgpt: {
    singleMessage: string;
    message1: string;
    message2: string;
  };
}
