import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraComponent } from 'src/app/shared/barra/barra.component';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';


@NgModule({
  declarations: [
    BarraComponent
  ],
  exports:[
    BarraComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterLink
    
  ]
})
export class SharedModule { }
