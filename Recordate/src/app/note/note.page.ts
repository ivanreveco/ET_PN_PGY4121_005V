import { User } from 'src/app/models/user.models';
import { ToastController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../models/note.models';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {

  newNote: Note = {
    id: "",
    nombreNota: "",
    tiponota: "",
    descripcion: "",
  };

  id: string = "";
  userId: string;

  constructor(
    private firebaseSvc: FirebaseService,
    private utilSvc: UtilsService,
    private toastController: ToastController
  ) { }

  async ngOnInit() {
    this.userId = await this.firebaseSvc.getUid();
    console.log(this.userId);
  }

  crearIdNote() {
    if (!this.newNote.id) {
      this.newNote.id = this.utilSvc.createId(); // Asigna un ID si no está definido
    }

    const path = `Users/${this.userId}/Notes`;

    this.utilSvc.createDoc(this.newNote, path, this.newNote.id).then(res => {
      console.log('Guardado con éxito');
      this.mostrarMensajeRegistro();
    }).catch(error => {
      console.error('Error al guardar la nota:', error);
    });
  }

  async mostrarMensajeRegistro() {
    const toast = await this.toastController.create({
      message: 'Nota creada correctamente',
      duration: 1000,
      position: 'bottom'
    });
    toast.present();
  }
}
