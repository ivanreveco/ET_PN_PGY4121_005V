import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';
import { Note } from '../models/note.models';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  userId: string;
  userNotes: Note[] = [];

  constructor(
    private firebaseSvc: FirebaseService,
    private utilSvc: UtilsService
  ) {}

  async ngOnInit() {
    this.userId = await this.firebaseSvc.getUid();

    const subCollectionName = 'Notes';

    this.firebaseSvc
      .getSubCollection('Users/' + this.userId, subCollectionName)
      .subscribe(
        (notes: Note[]) => {
          // Mostrar en la consola los datos de la subcolección "Notes"
          console.log('Notas del usuario:', notes);

          // Asignar las notas al arreglo para mostrar en el HTML
          this.userNotes = notes;
        },
        (error) => {
          console.error('Error al obtener las notas:', error);
        }
      );
  }
}
