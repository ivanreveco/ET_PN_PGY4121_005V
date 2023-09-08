import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit  {

  user={
  nombre: '',
  apellidos :'',
  email:'',
  password :'',
  confirmarPassword: ''
}
  
  constructor() {
   
   }

  ngOnInit() {
  }


 

  validarFormulario(): boolean {
    // Validar que todos los campos estén completos
    if (this.user.nombre === '' || this.user.apellidos === '' || this.user.email === '' || this.user.password === '' || this.user.confirmarPassword === '') {
      return false;
    }

    // Validar que la contraseña y la confirmación de contraseña coincidan
    if (this.user.password !== this.user.confirmarPassword) {
      return false;
    }

    // Devolver true si el formulario es válido
    localStorage.setItem('user',JSON.stringify(this.user));
    return true;
  }

  
}











