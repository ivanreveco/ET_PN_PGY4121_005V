import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  correo_ingreso ='';
  contrasena_ingreso = '';

  public alertButtons = 'OK';


  constructor() {}

  ngOnInit(){}

 
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