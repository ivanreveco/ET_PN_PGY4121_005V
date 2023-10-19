import { FirebaseService } from 'src/app/services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { UtilsService } from 'src/app/services/utils.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.scss'],
})
export class BarraComponent implements OnInit {

  name: string = '';
  usercorreo: string = '';

  newUser: User = {
    uid : '',
    name: '',
    lastName:'',
    password: '',
    email: '',
  };

  uid = '';

  constructor(
    public auth : FirebaseService,
    private db : UtilsService,
    private modalController: ModalController
  ) {
    this.auth.getAuthState().subscribe( res => {
      if (res !== null) {
        this.uid = res.uid;
        this.getUserInfo(this.uid);
      }
    });
  }

  ngOnInit() {}

  getUserInfo(uid : string) {
    const path = 'Users';
    this.db.getDoc<User>(path, uid).subscribe( res => {
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
