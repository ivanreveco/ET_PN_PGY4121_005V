import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit  {

  nombre = '';
  apellidos = '';
  email = '';
  password = '';
  confirmarPassword = '';
  public alertButtons = 'OK';

  
  constructor() {
   
   }

  ngOnInit() {
  }


  registrar() {
    // Validar que todos los campos estén completos
    if (this.nombre === '' || this.apellidos === '' || this.email === '' || this.password === '' || this.confirmarPassword === '') {
      alert('Por favor, complete todos los campos.');
      return;
    }

    // Validar que la contraseña y la confirmación de contraseña coincidan
    if (this.password !== this.confirmarPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    

    // Registrar al usuario
    // ...
  }

  validarFormulario(): boolean {
    // Validar que todos los campos estén completos
    if (this.nombre === '' || this.apellidos === '' || this.email === '' || this.password === '' || this.confirmarPassword === '') {
      return false;
    }

    // Validar que la contraseña y la confirmación de contraseña coincidan
    if (this.password !== this.confirmarPassword) {
      return false;
    }

    // Devolver true si el formulario es válido
    return true;
  }



}











