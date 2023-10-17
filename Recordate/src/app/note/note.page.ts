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


 

  constructor(
    private firebaseSvc:FirebaseService
  ) { }

  ngOnInit() {
  }
}
