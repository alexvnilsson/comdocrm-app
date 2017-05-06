import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

export const RouteTransitionAnimation = trigger('routeTransition', [
    state('*', style({
        transform: 'translateX(-400%)'
    })),
    transition(':enter', [
        animate(".25s", keyframes([
        style({ transform: 'translateX(-400%)', offset: 0 }),
        style({ transform: "translateX(10%)", offset: 0.8 }),
        style({ transform: "translateX(0)", offset: 1 })
        ]))
    ])
]);