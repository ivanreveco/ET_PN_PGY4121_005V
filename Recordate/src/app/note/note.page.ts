import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../models/note.models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {
@Input() note: Note;
newNote: Note = {
  id: '',
  nombreNota: '',
  descripcion: '',
  tiponota: '',
};

  form = new FormGroup({
    nombreNota:new FormControl('',[Validators.required]),
    descripcion:new FormControl('',[Validators.required]),
    Tiponota:new FormControl('')
   

  })

  constructor(
    private firebaseSvc:FirebaseService
  ) { }

  ngOnInit() {
  }
  save(){
    console.log('Esto se envia a firebase ' ,this.newNote)
    const data = this.newNote;
    data.id = this.firebaseSvc.createId();
    const enlace = 'user';
    this.firebaseSvc.set_User<Note>(data, enlace, data.id);
    console.log(data,enlace,'Hola');

  }

}
