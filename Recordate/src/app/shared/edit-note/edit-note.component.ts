import { Note } from './../../models/note.models';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SharingdataService } from 'src/app/services/sharingdata.service';

import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss'],
})
export class EditNoteComponent implements OnInit {
  selectedNote: Note | null = null;
  userId: string | null = null;

  constructor(
    private modalController: ModalController,
    private dataSharingService: SharingdataService,
    private firebaseSvc: FirebaseService, // Asumo que el servicio se llama FirebaseService
    private afAuth: AngularFireAuth,
    private utilsSvc:UtilsService
  ) {}

  ngOnInit() {
    this.dataSharingService.selectedNote$.subscribe((note) => {
      this.selectedNote = note;
      console.log('Tipo de Nota:', this.selectedNote.tiponota);
    });

    // Obtiene el usuario autenticado actual
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid; // userId del usuario autenticado
      }
    });
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  async eliminarNota() {
    if (this.selectedNote) {
      try {
        if (this.userId) {
          const path = `Users/${this.userId}/Notes`; // Ajusta la ruta a tu estructura de Firebase
          await this.firebaseSvc.deleteDoc(path, this.selectedNote.id); // Llama a tu método de eliminación en Firebase

          // Notifica que la nota se eliminó con éxito
          console.log('Nota eliminada con éxito de la base de datos.');

          // Cierra el modal
          this.modalController.dismiss();
        } else {
          console.error('No se encontró el userId.');
        }
      } catch (error) {
        // Maneja errores de eliminación
        console.error('Error al eliminar la nota de la base de datos:', error);
      }
    } else {
      console.error('No se encontró la nota a eliminar.');
    }
  }
  getDefaultTipoNota(): string | null {
    if (this.selectedNote) {
      // Verifica que selectedNote.tiponota sea igual a una de las opciones
      if (["personal", "trabajo", "estudio"].includes(this.selectedNote.tiponota)) {
        return this.selectedNote.tiponota;
      }
    }
    return null; // Valor predeterminado si no coincide con ninguna opción
  }
  async updateTask() {
    if (this.selectedNote && this.userId) {
      const path = `Users/${this.userId}/Notes/${this.selectedNote.id}`;

      
      delete this.selectedNote.id;

      try {
        await this.firebaseSvc.updateDocument(path, this.selectedNote);

        
        this.utilsSvc.presentToast({
          message: 'Tarea actualizada exitosamente',
          color: 'success',
          icon: 'checkmark-circle-outline',
          duration: 1500,
        });

       
      } catch (error) {
        this.utilsSvc.presentToast({
          message: error,
          color: 'warning',
          icon: 'alert-circle-outline',
          duration: 5000,
        });
      }
    } else {
      console.error('No se encontró la nota o el userId.');
    }
  }
}

