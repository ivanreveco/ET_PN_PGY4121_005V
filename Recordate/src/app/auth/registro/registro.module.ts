import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroPageRoutingModule } from './registro-routing.module';

import { RegistroPage } from './registro.page';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
    declarations: [RegistroPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RegistroPageRoutingModule,
        SharedModule
    ]
})
export class RegistroPageModule {}
