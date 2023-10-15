import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent implements OnInit {

  @Input() control: FormControl;
  @Input() label: string;
  @Input() icon: string;
  @Input() type: string;
  @Input() allowedOptions: string[];
  isPassword: boolean;
  hide: boolean = true;

  constructor() { }

  ngOnInit() {
    if (this.type === 'password') {
      this.isPassword = true;
    }
  }

  showPassword() {
    this.hide = !this.hide;
  }
}
