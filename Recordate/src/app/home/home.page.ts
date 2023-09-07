import { Component } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  name='';

  constructor() {}

  enviar() {
    // Código para enviar el nombre

    // Obtenemos el valor del name
    const name = this.name;

    // Enviamos el nombre
    this.enviarName();
  }

  enviarName() {
    // Código para enviar el nombre al servidor
  }

}