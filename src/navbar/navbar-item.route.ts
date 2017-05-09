import { Route } from '@angular/router';

export interface NavbarItemRoute extends Route {
    mainNav: boolean,
    module?: string,
    text?: string,
    faIcon?: string,
    children?: NavbarItemRoute[]
}

export declare type NavbarRouteConfig = NavbarItemRoute[];