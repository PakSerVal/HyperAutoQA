import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditorModule} from 'primeng/editor';

@NgModule({
    imports: [ReactiveFormsModule, FormsModule, EditorModule],
    exports: [ReactiveFormsModule, FormsModule, EditorModule]
})

export class SharedModule {}
