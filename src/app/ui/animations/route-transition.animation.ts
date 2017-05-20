import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

export const RouteTransitionAnimation = trigger('routeTransition', [
    transition('void => *', [
        animate(300, keyframes([
            style({ transform: 'translateX(-100%)', position: 'fixed', offset: 0 }),
            style({ transform: "translateX(0%)", position: 'relative', offset: 1 })
        ]))
    ]),
    transition('* => void', [
        animate(300, keyframes([
            style({ transform: 'translateX(0%)', position: 'fixed', opacity: '1.0', offset: 0 }),
            style({ transform: "translateX(200%)", position: 'fixed', opacity: '0', offset: 1 })
        ]))
    ])
]);