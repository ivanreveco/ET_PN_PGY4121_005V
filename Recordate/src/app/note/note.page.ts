import { Tiponota } from './../models/note.models';
import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../models/note.models';
import { User } from '../models/user.models';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {
@Input() note: Note;
  user = {} as User

  form = new FormGroup({
    id:new FormControl(''),
    nombreNota:new FormControl('',[Validators.required]),
    descripcion:new FormControl('',[Validators.required])
   

  })

  constructor(

  ) { }

  ngOnInit() {
  }

}
