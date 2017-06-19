export interface IFormError {
    validationError?: any;
}

export class FormError implements IFormError {
    constructor(
        public validationError: any
    ) {}
}