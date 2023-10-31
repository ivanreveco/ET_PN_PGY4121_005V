import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../models/note.models';

@Injectable({
  providedIn: 'root'
})
export class SharingdataService {
  private selectedNoteSubject = new BehaviorSubject<Note | null>(null);
  selectedNote$ = this.selectedNoteSubject.asObservable();

  setSelectedNote(note: Note) {
    this.selectedNoteSubject.next(note);
  }
}
