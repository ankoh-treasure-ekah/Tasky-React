import {TaskLevel, TaskDifficulty, TaskStatus} from '../constants/constants.enum'

export interface ITask {
    name: string;
    description: string;
    startDAte: any;
    dueDate: any;
    status: TaskStatus;
    level: TaskLevel;
    image?: string;
    userId: string;
    difficulty: TaskDifficulty;
    resources?: object | [];
    id: number;
}