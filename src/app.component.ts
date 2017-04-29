import {Component} from '@angular/core';
import './app.component.scss';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    name: string = 'Nice';
    checked: boolean = false;
}