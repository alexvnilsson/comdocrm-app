import { Route } from '@angular/router';

export interface CustomRoute extends Route {
    mainNav?: boolean,
    href?: string,
    text?: string,
    faIcon?: string,
    children?: CustomRoute[],
    showSub?: boolean;
}