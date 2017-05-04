import { Component, Input } from '@angular/core';

@Component({
    selector: 'leads-timeline-message',
    template: `<div class="card">
        <div class="card-block">
            <h4 class="card-title">{{ message.classification }}</h4>
            {{ message.message }}
        </div>

        <div class="card-footer text-muted">
            {{ message.date }}
        </div>
    </div>`
})
export class TimelineMessageComponent {
    @Input() message: any;
}