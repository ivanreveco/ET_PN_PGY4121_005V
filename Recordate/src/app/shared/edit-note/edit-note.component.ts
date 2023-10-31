import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'src/app/models/note.models';
import { SharingdataService } from 'src/app/services/sharingdata.service';


@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss'],
})
export class EditNoteComponent implements OnInit {
  selectedNote: Note | null = null;

  constructor(private dataSharingService: SharingdataService) {}

  ngOnInit() {
    this.dataSharingService.selectedNote$.subscribe((note) => {
      this.selectedNote = note;
    });
  }
}
