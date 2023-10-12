import { Component, OnInit ,} from '@angular/core';
import { AlertController, NavController , ModalController} from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.scss'],
})
export class BarraComponent implements OnInit{
  

  constructor(
    private utilsSvc: UtilsService,
    private firesSvc: FirebaseService

  ) {}

  ngOnInit() {
  
  }

  singOut(){
   this.firesSvc.singOut();
  }
  
}
