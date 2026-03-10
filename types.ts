
export type Difficulty = 'Random' | 'Easy' | 'Medium' | 'Hard';

export type Category = 
  | 'Random'
  | 'Plants & Nature'
  | 'Marine Life'
  | 'Personality & Psychology'
  | 'Travel'
  | 'World Cultures'
  | 'Urban Planning'
  | 'Philosophy'
  | 'Technology'
  | 'History'
  | 'Everyday Mysteries';

export interface CuriosityTopic {
  id: string;
  category: Category;
  question: string;
  prompts: string[];
  direction: string;
  activity?: string;
}

export interface AIPromptResponse {
  curiosityQuestions: {
    question: string;
    explanation: string;
    explorationPrompt: string;
  }[];
}
