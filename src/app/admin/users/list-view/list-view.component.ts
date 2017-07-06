import { Component } from '@angular/core';
import { User } from '../../../common/users/user';

@Component({
    selector: 'admin-users-list-view',
    templateUrl: './list-view.component.html'
})
export class ListViewComponent {
    users: Array<User> = [];
}
