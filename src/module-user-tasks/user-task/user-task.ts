import { UserTaskType } from './user-task-type';
import { UserTaskContainer } from './user-task-container';

export class UserTask {
    account?: string;
    id?: string;
    container: UserTaskContainer;
    type: UserTaskType;

    userId?: string;
    displayName: string;
    summaryText: string;

    hasReminder: boolean;
    reminderDate?: Date;
}