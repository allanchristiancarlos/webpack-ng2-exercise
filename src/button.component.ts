import { Component, Input } from "@angular/core";

@Component({
    selector: 'my-button',
    template: `<button>{{title}}</button>`
})
export class ButtonComponent {
    @Input()
    title: string = 'My Button';
}