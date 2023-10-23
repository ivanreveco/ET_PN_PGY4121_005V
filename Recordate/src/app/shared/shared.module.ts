import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraComponent } from 'src/app/shared/barra/barra.component';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BarraComponent,
    CustomInputComponent
  ],
  exports:[
    BarraComponent,
    CustomInputComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterLink,
    ReactiveFormsModule
    
  ]
})
export class SharedModule { }
