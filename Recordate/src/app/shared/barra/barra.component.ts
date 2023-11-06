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
  capturedImage: string | null = null; // Variable para almacenar la URL de la imagen capturada

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
      this.capturedImage = photo.dataUrl; // Asigna la URL de la imagen capturada a la variable
      // Aquí puedes realizar otras acciones con la URL de la imagen capturada si es necesario
    } catch (error) {
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
