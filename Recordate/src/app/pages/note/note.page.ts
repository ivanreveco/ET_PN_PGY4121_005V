import { User } from 'src/app/models/user.models';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Note, tiponota } from 'src/app/models/note.models';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {
  @Input() note: Note;
  user = {} as User;
  tiposNota: tiponota[] = [
    { id: 'compras', name: 'Compras' },
    { id: 'estudios', name: 'Estudios' },
    { id: 'trabajo', name: 'Trabajo' },
    { id: 'personal', name: 'Personal' }
  ];



  form = new FormGroup({
    nombreNota: new FormControl('', [Validators.required, Validators.minLength(1)]),
    descripcion: new FormControl('', Validators.required),
    tipoNotaId: new FormControl('', Validators.required),
  });

  constructor(
    private firebaseSvc: FirebaseService,
    private router: Router,
    private utilsSvc: UtilsService
  ) { }

  ngOnInit() {
    this.user = this.utilsSvc.getElementInStorage('user');

    if (this.note) {
      this.form.setValue({
        nombreNota: this.note.nombreNota,
        descripcion: this.note.descripcion,
        tipoNotaId: this.note.tipoNotaId,
      });
    }
  }

  submit() {
    if (this.form.valid) {
      if (this.note) {
        this.updateNote();
      } else {
        this.createNote();
      }
    }
  }

  createNote() {
    let path = `user/${this.user.uid}`;

    this.firebaseSvc.addToSubcollection(path, 'note', this.form.value).then(
      res => {
        this.utilsSvc.presentToast({
          message: 'Tarea creada exitosamente',
          color: 'success',
          icon: 'checkmark-circle-outline',
          duration: 1500
        });

        this.router.navigate(['/home-page']);
      },
      error => {
        this.utilsSvc.presentToast({
          message: error,
          color: 'warning',
          icon: 'alert-circle-outline',
          duration: 5000
        });
      }
    );
  }

  updateNote() {
    let path = `users/${this.user.uid}/note/${this.note.id}`;

    this.firebaseSvc.addToSubcollection(path, 'note', this.form.value).then(
      res => {
        this.utilsSvc.presentToast({
          message: 'Tarea actualizada exitosamente',
          color: 'success',
          icon: 'checkmark-circle-outline',
          duration: 1500
        });
      },
      error => {
        this.utilsSvc.presentToast({
          message: error,
          color: 'warning',
          icon: 'alert-circle-outline',
          duration: 5000
        });
      }
    );
  }
  // Resto del código...

getAllowedOptions() {
  return this.tiposNota.map(tipo => tipo.id);
}

}
