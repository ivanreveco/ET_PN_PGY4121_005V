import { Component, OnInit , OnDestroy} from '@angular/core';
import { AlertController, NavController , ModalController} from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.scss'],
})
export class BarraComponent implements OnInit , OnDestroy{
  nombre: string = '';
  apellidos: string = '';
  email : string = '';

  constructor(
    private alertCtrl: AlertController,//controlar alerts
    private navCtrl: NavController,//controlar los links
    private modalController : ModalController,
    private firebasSvc: FirebaseService
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

  singOut(){
    this.firebasSvc.singOut();
  }

  

  ngOnDestroy() {
    this.modalController.dismiss();
    
  }
}
