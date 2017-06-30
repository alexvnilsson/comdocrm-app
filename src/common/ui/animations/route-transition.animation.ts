import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

export const RouteTransitionAnimation = trigger('routeTransition', [
    state('void', style({ position: 'fixed', opacity: '0' })),
    transition(':enter', [
        animate('0.2s 300ms', keyframes([
            style({ opacity: '0', offset: 0 }),
            style({ opacity: '1', position: 'static', offset: 1 })
        ]))
    ]),
    transition(':leave', [
        animate('0.2s', keyframes([
            style({ opacity: '1', position: 'fixed', offset: 0 }),
            style({ opacity: '0', offset: 1 })
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