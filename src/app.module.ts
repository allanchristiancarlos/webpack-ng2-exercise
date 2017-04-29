import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import {
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule
} from '@angular/material';

@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        MdButtonModule,
        MdCardModule,
        MdCheckboxModule
    ],
    exports: [
        MdButtonModule,
        MdCardModule,
        MdCheckboxModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {

}