import { Subtask } from "./Subtask";
import { User } from "./User";

export class CalendarPlannedEntry {
    id?: number;
    subtaskId?: number;
    date?: Date;
    hours?: number;
    isPlanned?: boolean;
}

export class CalendarEntry {
    id?: number;
    userId?: number;
    subtaskId?: number;
    date?: Date;
    hours?: number;
    description?: string;
    isPlanned?: boolean;
}

export class FreeTimeInfo {
    id?: number;
    userId?: number;
    user?: User;
    subtaskId?: number;
    subtask?: Subtask;
    date?: Date;
    hours?: number;
    description?: string;
    isPlanned?: boolean;
}
