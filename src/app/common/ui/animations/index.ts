import { trigger, state, style, animate, transition, keyframes, group } from '@angular/animations';

import { DoneLoadingTransitionAnimation } from './route-transition.animation';
export { RouteTransitionAnimation, DoneLoadingTransitionAnimation } from './route-transition.animation';

export const FadeInOut = trigger('fadeInOut', [
    state('void', style({ width: '0px', height: '0px', opacity: '0' })),
    transition(':enter', [
        animate(400, keyframes([
            style({ width: '0px', height: '0px', opacity: 0, offset: 0.50 }),
            style({ width: '*', height: '*', opacity: 0, offset: 0.51 }),
            style({ opacity: 1, offset: 1 })
        ]))
    ]),
    transition(':leave', animate('0.15s ease-in-out', style({ opacity: '0' })))
]);