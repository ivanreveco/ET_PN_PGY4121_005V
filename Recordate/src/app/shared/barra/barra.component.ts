import { FirebaseService } from 'src/app/services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { ModalController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.scss'],
})

export class BarraComponent implements OnInit {
  newUser: User = {
    uid: '',
    name: '',
    lastName: '',
    password: '',
    email: '',
  };

  uid = '';
  

  constructor(
    public auth: FirebaseService,
    private db: UtilsService, // Asegúrate de tener este servicio correctamente inyectado
    private modalController: ModalController
) {

    this.auth.getAuthState().subscribe(res => {
      if (res !== null) {
        this.uid = res.uid;
        this.getUserInfo(this.uid);
      }
    });
  }
  async TakeImage() {
    try {
        const photo = await this.db.takePicture('Imagen del boludo');
        const dataUrl = photo.dataUrl; // Aquí asumimos que la URL está en la propiedad dataUrl del resultado de la foto
        // Aquí puedes realizar acciones con la URL de la imagen capturada
    } catch (error) {
        // Maneja cualquier error que pueda ocurrir al capturar la imagen
        console.error('Error al tomar la foto:', error);
    }
}

  ngOnInit() {}

  getUserInfo(uid: string) {
    const path = 'Users';
    this.db.getDoc<User>(path, uid).subscribe(res => {
      if (res !== undefined) {
        this.newUser = res;
      }
    });
  }

  async salir() {
    await this.auth.singOut();
    this.dismiss();
  }

  async dismiss() {
    await this.modalController.dismiss();
  }

  
}
