import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { UtilsService } from '../../services/utils.service';
import { Note } from '../../models/note.models';
import { Router } from '@angular/router';
import { SharingdataService } from 'src/app/services/sharingdata.service';
import { EditNoteComponent } from 'src/app/shared/edit-note/edit-note.component';
import { ModalController } from '@ionic/angular';
 // Importa el servicio de intercambio de datos

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
    private utilSvc: UtilsService,
    private modalController: ModalController,
    private dataSharingService: SharingdataService // Inyecta el servicio de intercambio de datos
  ) {}

  async ngOnInit() {
    this.userId = await this.firebaseSvc.getUid();

    const subCollectionName = 'Notes';

    this.firebaseSvc
      .getSubCollection('Users/' + this.userId, subCollectionName)
      .subscribe(
        (notes: Note[]) => {
          console.log('Notas del usuario:', notes);
          this.userNotes = notes;
        },
        (error) => {
          console.error('Error al obtener las notas:', error);
        }
      );
  }

  deleteNote(noteId: string) {
    // ...
  }

  async editNote(noteId: string) {
    const selectedNote = this.userNotes.find((note) => note.id === noteId);
    if (selectedNote) {
      this.dataSharingService.setSelectedNote(selectedNote);
      const modal = await this.modalController.create({
        component: EditNoteComponent,
      });
      await modal.present();
    } else {
      console.error('No se encontró la nota a editar.');
    }
  }
}
