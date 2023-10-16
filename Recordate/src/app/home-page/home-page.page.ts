import { Component, OnInit } from '@angular/core';
import { Note } from '../models/note.models';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';
import { User } from '../models/user.models';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  notes: Note[] = [];

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) {}

  ngOnInit() {
    // Llama a la función para obtener las notas
    this.getNotesForCurrentUser();
  }

  getNotesForCurrentUser() {
    let user: User = this.utilsSvc.getElementInStorage('user');
    if (user) {
      let path = `Users/${user.uid}/Notes`;
      
      this.firebaseSvc.getSubCollection(path, 'Notes').subscribe({
        next: (res: Note[]) => {
          console.log('Notas obtenidas:', res);
          this.notes = res;
        },
        error: (error) => {
          console.error('Error fetching notes:', error);
        }
      });
    } else {
      console.error('No se pudo obtener el usuario.');
    }
  }
}
