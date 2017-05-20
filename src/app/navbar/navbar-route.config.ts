import { Route } from '@angular/router';

export interface NavbarItemRoute extends Route {
    mainNav?: boolean,
    text?: string,
    faIcon?: string,
    children?: NavbarItemRoute[]
}

export declare type NavbarRouteConfig = NavbarItemRoute[];