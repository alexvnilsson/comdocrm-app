import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

export const RouteTransitionAnimation = trigger('routeTransition', [
    state('void', style({ display: 'none', transform: 'translateX(-20%)', position: 'fixed', opacity: '0' })),
    transition(':enter', [
        animate('0.1s 300ms', keyframes([
            style({ opacity: '0', transform: 'translateX(-20%)', position: 'fixed', offset: 0 }),
            style({ opacity: '1', transform: 'translateX(0%)', offset: 0.99 }),
            style({ opacity: '1', position: 'relative', offset: 1 })
        ]))
    ]),
    transition(':leave', [
        animate('0.2s', keyframes([
            style({ opacity: '1', offset: 0 }),
            style({ opacity: '0', offset: 1 })
        ]))
    ])
]);

export const SlideDownTransitionAnimation = trigger('slideDownTransition', [
    state('void', style({ display: 'none', transform: 'translateY(-10%)', opacity: '0' })),
    transition(':enter', [
        animate('0.15s 300ms', keyframes([
            style({ opacity: '0', transform: 'translateY(-10%)', offset: 0 }),
            style({ opacity: '1', transform: 'translateY(0%)', offset: 1 })
        ]))
    ]),
    transition(':leave', [
        animate('0.2s', keyframes([
            style({ opacity: '1', transform: 'translateY(0%)', offset: 0 }),
            style({ opacity: '0', transform: 'translateY(-10%)', offset: 1 }),
        ]))
    ])
]);

export const DoneLoadingTransitionAnimation = trigger('doneLoadingTransition', [
    state('void', style({opacity: '0'})),
    state('*', style({})),
    transition(':enter', [
        animate('0.2s 500ms', keyframes([
            style({ opacity: '0', offset: 0 }),
            style({ opacity: '1', offset: 1 })
        ]))
    ]),
    transition(':leave', [
        animate('0.2s', keyframes([
            style({ opacity: '1', offset: 0 }),
            style({ opacity: '0', offset: 1 })
        ]))
    ])
]);