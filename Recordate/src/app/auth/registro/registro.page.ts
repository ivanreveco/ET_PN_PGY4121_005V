import { FirebaseService } from 'src/app/services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user.models';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  newUser: User = {
    uid : '',
    name: '',
    lastName:'',
    password: '',
    email: '',
  };

  newFile: any;
   
  uid = '';

  
  mensaje_error1 : string = 'Contraseñas incorrectas';
  mensaje_error2 : string = 'Contraseña debe tener almenos 6 caracteres';
  mensaje_error3 : string = 'Ingrese un correo correcto';
  mostrarMensajeError1: boolean = false;
  mostrarMensajeError2: boolean = false;
  mostrarMensajeError3: boolean = false;
  confirmPassword: string = ''; // Nuevo campo para confirmar la contraseña
  
  constructor(private navCtrl: NavController,
    private toastController: ToastController,
    private  UtilsSvc: UtilsService, 
    public firebaseSvc : FirebaseService,
    private router: Router) { 
    
  }

  async ngOnInit() {
    const uid = await this.firebaseSvc.getUid();
    console.log(uid);
  }

  async register() {
    // Validar que la contraseña tenga al menos 6 caracteres
    if (this.newUser.password) {
      // Contraseña cumple con la longitud mínima
  
      // Validar que la contraseña y la confirmación coincidan
      if (this.newUser.password === this.confirmPassword) {
        // Contraseña y confirmación coinciden, procede con el registro
        if (this.newUser.email.includes('@')) {
        // Guarda los datos en el LocalStorage
        //localStorage.setItem('User', JSON.stringify(this.newUser));
      
          const credenciales = {
              email: this.newUser.email,
              password: this.newUser.password,
          };
          const res = await this.firebaseSvc.SignUp(credenciales.email,credenciales.password).catch( err => {
            console.log( 'error -> ',  err);
        });
          const uid = await this.firebaseSvc.getUid();
          console.log(uid);
          if (uid) {
            this.newUser.uid = uid;
            this.guardarUser();
           
          } else {
            console.log('Error: No se pudo obtener el UID');
            return; // Evita continuar si no se obtiene el UID
          }
     
    

        // Redirige a la página de inicio de sesión u otra página según tu flujo de la aplicación
        this.mostrarMensajeRegistro()
        this.navCtrl.navigateForward('/home');
        //const storedUserString = localStorage.getItem('User');
        //console.log(storedUserString)

      } else {
        // Correo electrónico no válido, muestra un mensaje de error
        this.mostrarMensajeError3 = true;
      }
      } else {
        // Las contraseñas no coinciden, muestra un mensaje de error
        this.mostrarMensajeError1 = true;
      }
    } else {
      // La contraseña no cumple con la longitud mínima
      this.mostrarMensajeError2 = true;
      console.log('La contraseña debe tener al menos 6 caracteres.');
      
      }
    }

    guardarUser(){
      const path = 'Users'
      const name = this.newUser.name;
      this.UtilsSvc.createDoc(this.newUser, path, this.newUser.uid).then( res => {
        console.log('guardado con exito');
    }).catch( error => {
    });
      
    }

    async mostrarMensajeRegistro() {
      const toast = await this.toastController.create({
        message: 'Cuenta creada correctamente',
        duration: 1000, // Duración en milisegundos
        position: 'bottom' // Posición en la que aparecerá el mensaje
      });
      toast.present();
    }
 
  }