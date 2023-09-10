import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.scss'],
})
export class BarraComponent implements OnInit {
  nombre: string = '';
  apellidos: string = '';
  email : string = '';

  constructor(
    private alertCtrl: AlertController,//controlar alerts
    private navCtrl: NavController//controlar los links
  ) {}

  ngOnInit() {
    //obtener dato nombre de user
    const userString = localStorage.getItem('user');
    if (userString !== null) {
      const user = JSON.parse(userString);
      this.nombre = user.nombre;
      this.apellidos = user.apellidos;
      this.email = user.email;
    }
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: '¿Está seguro de querer cerrar la sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          },
        },
        {
          text: 'OK',
          handler: () => {
            console.log('Cerrar sesión');
            localStorage.removeItem('user');//borrar datos del localstorage
            this.navCtrl.navigateForward('/home');//redireccionar a  la pagina de loggin
          },
        },
      ],
    });
    await alert.present();
  }
}
