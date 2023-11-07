import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Note } from 'src/app/models/note.models';
import { SharingdataService } from 'src/app/services/sharingdata.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss'],
})
export class EditNoteComponent implements OnInit {
  selectedNote: Note | null = null;

  constructor(
    private modalController: ModalController,
    private dataSharingService: SharingdataService
  ) {}

  ngOnInit() {
    this.dataSharingService.selectedNote$.subscribe((note) => {
      this.selectedNote = note;
    });
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  guardarCambios() {
    if (this.selectedNote) {
      // Implementa la lógica para guardar los cambios en la nota
      // Puedes usar un servicio para actualizar la nota en la base de datos
      // Después, cierra el modal
      this.modalController.dismiss(this.selectedNote);
    }
  }

}
