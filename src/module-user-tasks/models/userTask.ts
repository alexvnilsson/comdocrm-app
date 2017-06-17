export class UserTask {
    id?: string;
    container: UserTaskContainer;
    userId?: string;

    displayName: string;
    summaryText: string;
    
    constructor(
        
    ){}
}

export class UserTaskContainer {
    type: string;
    id: string;
}