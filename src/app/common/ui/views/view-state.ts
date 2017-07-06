export interface IViewState {
    isLoading: boolean;

    hasErrors?: boolean;
    errors?: Array<any>;
}

export class ViewState implements IViewState {
    isLoading: boolean = null;

    hasErrors: boolean = false;
    errors: Array<any> = [];

    constructor(state?: IViewState) {
        if(state) {
            this.isLoading = state.isLoading;

            this.hasErrors = state.hasErrors;
            this.errors = state.errors;
        }
    }
}