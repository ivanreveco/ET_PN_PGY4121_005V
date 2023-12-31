import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Note } from '../../models/note.models';
import { FirebaseService } from '../../services/firebase.service';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {

  newNote: Note = {
    id: '',
    nombreNota: '',
    tiponota: 'personal',
    descripcion: '',
    fecha: null, // Inicializamos la fecha como null
  };
 
  userId: string;

  constructor(
    private firebaseSvc: FirebaseService,
    private utilSvc: UtilsService,
    private toastController: ToastController,
    private router: Router
  ) { }

  async ngOnInit() {
    this.userId = await this.firebaseSvc.getUid();
    console.log(this.userId);
  }
 
  crearIdNote() {
    if (!this.newNote.id) {
      this.newNote.id = this.utilSvc.createId(); // Assign an ID if not defined
    }

    const path = `Users/${this.userId}/Notes`;

    this.utilSvc.createDoc(this.newNote, path, this.newNote.id).then(res => {
      console.log('Guardado con éxito');
      this.redirect();
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

  redirect() {
    this.router.navigate(['/home-page']);
  }

  setFechaNota(dia: number, mes: number, anio: number) {
    this.newNote.fecha = new Date(anio, mes - 1, dia); 
  }

  diaNota: number; 
  mesNota: number;
  anioNota: number;

  isValidNote() {
    return this.newNote.nombreNota.trim() !== '' && this.newNote.descripcion.trim() !== '';
  }

  guardarNota() {
    this.setFechaNota(this.diaNota, this.mesNota, this.anioNota);
    
    this.newNote = {
      id: '',
      nombreNota: '',
      tiponota: 'personal',
      descripcion: '',
      fecha: null, // Reinicializamos la fecha como null
    };
  }
  
}
