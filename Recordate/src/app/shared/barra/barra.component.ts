import { Component, OnInit, } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.scss'],
})
export class BarraComponent implements OnInit {

  user = {} as User
  constructor(
    private utilsSvc: UtilsService,
    private firesSvc: FirebaseService

  ) { }

  ngOnInit() {
    this.getUser()
  }

  singOut() {
    this.firesSvc.singOut();
  }
  getUser() {
    return this.user = this.utilsSvc.getElementInStorage('user')
  }
}
