import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit  {

  nombre: string = '';
  apellidos = '';
  email = '';
  password = '';
  confirmarPassword = '';
  public alertButtons = 'OK';
  nombreMostrado: string = '';

  
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

  guardarNombre() {
    if (this.nombre.trim() !== '') {
        localStorage.setItem('nombre', this.nombre);
        // Puedes mostrar un mensaje de éxito aquí si lo deseas
        console.log('Nombre guardado en localStorage.');
      }
    
    }



  obtenerNombre() {
    try {
      const nombreGuardado = localStorage.getItem('nombre');
      if (nombreGuardado) {
        this.nombreMostrado = nombreGuardado; // Asigna el valor a nombreMostrado
        console.log('Nombre obtenido de localStorage:', nombreGuardado);
      } else {
        console.log('El nombre no se ha guardado previamente.');
      }
    } catch (error) {
      console.error('Error al obtener el nombre:', error);
    }
  }

}











