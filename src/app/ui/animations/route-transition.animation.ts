import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

export const RouteTransitionAnimation = trigger('routeTransition', [
    transition('void => *', [
        animate(600, keyframes([
            style({ opacity: '0', offset: 0 }),
            style({ opacity: '0', offset: 0.5 }),
            style({ opacity: '1', offset: 1 })
        ]))
    ]),
    transition('* => void', [
        animate(300, keyframes([
            style({ opacity: '1', offset: 0 }),
            style({ opacity: '0', offset: 1 })
        ]))
    ])
]);