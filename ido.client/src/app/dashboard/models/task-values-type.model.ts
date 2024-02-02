import { ImportanceOptions } from './importance-options.model';
import { TaskStatus } from './task-status.model';

export interface TaskValuesType {
  id: string;
  title: string;
  category: string;
  dueDate: string;
  estimate: estimate;
  importance: ImportanceOptions;
  status: TaskStatus;
}

export interface estimate {
  id: number;
  number: number;
  unit: string;
}
