export type View =
  | 'dashboard'
  | 'email'
  | 'meeting'
  | 'tasks'
  | 'research'
  | 'chat'
  | 'presentation';

export interface EmailInput {
  topic: string;
  tone: string;
  audience: string;
  length: string;
  purpose: string;
}

export interface EmailOutput {
  subject: string;
  body: string;
  tips: string[];
}

export interface MeetingInput {
  notes: string;
  format: string;
}

export interface MeetingOutput {
  summary: string;
  keyPoints: string[];
  actionItems: { task: string; owner: string; deadline: string }[];
  decisions: string[];
}

export interface TaskInput {
  tasks: string;
  workHours: string;
  deadline: string;
}

export interface TaskOutput {
  schedule: {
    priority: string;
    task: string;
    time: string;
    rationale: string;
  }[];
  tips: string[];
}

export interface ResearchInput {
  topic: string;
  depth: string;
}

export interface ResearchOutput {
  overview: string;
  insights: { title: string; detail: string }[];
  keyFindings: string[];
  recommendations: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
