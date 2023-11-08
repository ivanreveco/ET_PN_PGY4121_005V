
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraComponent } from 'src/app/shared/barra/barra.component';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditNoteComponent } from './edit-note/edit-note.component';


@NgModule({
  declarations: [
    BarraComponent,
    CustomInputComponent,
    EditNoteComponent
  ],
  exports:[
    BarraComponent,
    CustomInputComponent,
    EditNoteComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterLink,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
