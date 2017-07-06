
export class UserTask {
    id?: string;
    ownerId?: string;
    userId?: string;

    displayName: string;
    summaryText: string;

    hasReminder: boolean;
    reminderDate?: Date;
}