export interface UiState {
    uiState: UiStateComponentObject;

    uiOnComplete(): any;
    uiOnError(error: any): any;
}

export class UiStateComponentObject {
    private _isLoading: boolean;
    get isLoading() {
        return this._isLoading;
    }
    set isLoading(value: boolean) {
        if(value === true)
            this._isComplete = false;

        this._isLoading = value;
    }

    isDoneLoading: boolean = false;
    
    private _isComplete: boolean;
    get isComplete() {
        return this._isComplete;
    }
    set isComplete(value: boolean) {
        if(value === true)
            this.isLoading = false;

        this._isComplete = value;
    }

    hasErrors: boolean = false;
    errors: Array<Error> = [];

    constructor(shouldLoad?: boolean) {
        if(shouldLoad) {
            this.isLoading = true;
        } else {
            this.isComplete = true;
        }
    }

    onError(error: Error) {
        this.isLoading = false;
        this.hasErrors = true;

        this.errors.push(error);
    }

    onComplete() {
        this.isLoading = false;
        this.hasErrors = false;
        this.isComplete = true;
    }
}