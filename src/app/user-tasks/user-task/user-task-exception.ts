export interface IUserTaskException {
    Message: string;
    NoContainer?: boolean;
    NoType?: boolean;
}

export class UserTaskException implements IUserTaskException{
    Message: string;

    NoContainer: boolean = false;
    NoType: boolean = false;

    constructor(
        options: IUserTaskException
    ) {
        this.Message = options.Message;

        this.NoContainer = options.NoContainer;
        this.NoType = options.NoType;
    }
}