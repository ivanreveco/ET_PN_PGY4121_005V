import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  correo_ingreso ='';
  contrasena_ingreso = '';
  name = '';

  constructor() {}

  ngOnInit(){}

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

  login(){

    if(this.correo_ingreso === '' || this.contrasena_ingreso === ''){
      this.limpiarCampos();
    }
    
  }
  limpiarCampos(){
    this.contrasena_ingreso = ' ';
    this.correo_ingreso = ' ';
  }
  validarIngreso() : boolean {

    if (this.contrasena_ingreso === '' || this.correo_ingreso === '') {return false;}
    return true;
    
  }

 
    

}