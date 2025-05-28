export interface LearningDay {
  id: number;
  date: string;
  completed: boolean;
  notes?: string;
}

export interface CourseProgress {
  python: LearningDay[];
  sql: LearningDay[];
  tableau: LearningDay[];
}

export interface RoadmapSection {
  id: number;
  day: number;
  topic: string;
  description: string;
  objectives: string[];
  resources: string[];
  practice: string[];
}

export interface RoadmapData {
  python: RoadmapSection[];
  sql: RoadmapSection[];
  tableau: RoadmapSection[];
}