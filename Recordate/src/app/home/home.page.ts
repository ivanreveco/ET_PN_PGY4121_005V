import { NavController , ToastController} from '@ionic/angular';
import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  user={
    nombre: '',
    apellidos :'',
    email:'',
    password :'',
    confirmarPassword: ''
  }
  ValidarFormulario = false;

  public alertButtons = 'OK';


  constructor(private navCtrl: NavController, private toastController : ToastController) {
  }




  ngOnInit(){
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      console.log('Datos en localStorage:', user);
    } else {
      console.log('No hay datos en localStorage.');
    }
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
    //validar que la contraseña no sea menor de 7 caracteres
    if (this.user.password.length <7){
      return false;
    }
    // Validar que el correo termine con hotmail yahoo o gmail
    if (!/.(gmail|yahoo|hotmail)./.test(this.user.email)) {
      return false;
      }
   

    // Devolver true si el formulario es válido
    //guardar datos en el localstorage
    localStorage.setItem('user',JSON.stringify(this.user));
    return true;
  }
    


  IngresoFormulario() {
    // Recupera los datos almacenados en el LocalStorage
    const userString = localStorage.getItem('user');

    if (userString) {
      const storedUserData = JSON.parse(userString);

      // Verifica si el nombre de usuario y la contraseña coinciden
      if (
        this.user.email === storedUserData.email &&
        this.user.password === storedUserData.password
      ) {
        // Inicio de sesión exitoso, redirige a la página principal
        this.navCtrl.navigateForward('/home-page'); // Cambia '/home' por la ruta correcta
      } else {
        // Las credenciales no coinciden, muestra un mensaje de error
        console.log('Credenciales incorrectas.');
        this.mostrarMensaje();
      }
    } else {
      // No se encontraron datos de usuario en el LocalStorage
      console.log('La cuenta no existe.');
      this.mostrarMensaje();
    }

    
  }

  async mostrarMensaje() {
    const toast = await this.toastController.create({
      message: 'La cuenta ingresada no es correcta o no estas registrado',
      duration: 1500, // Duración en milisegundos
      position: 'bottom' // Posición en la que aparecerá el mensaje
    });
    toast.present();
  }

  
  

}