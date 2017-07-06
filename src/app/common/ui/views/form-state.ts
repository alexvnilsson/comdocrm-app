import { IFormError, FormError } from './form-error';

export interface IFormState {
    isLoading: boolean;

    hasErrors?: boolean;
    errors?: Array<IFormError>;
}

export class FormState implements IFormState {
    isLoading: boolean = null;

    hasErrors: boolean = false;
    errors: Array<IFormError> = [];

    constructor(state?: IFormState) {
        if(state) {
            this.isLoading = state.isLoading;

            this.hasErrors = state.hasErrors;
            this.errors = state.errors;
        }
    }
}