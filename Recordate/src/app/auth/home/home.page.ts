import { NavController , ToastController} from '@ionic/angular';
import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  form=new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required])
  })

 


  constructor() {
  }

  ngOnInit() {
      
  }

  submit(){
    if(this.form.valid){
      console.log(this.form.value);
    }
  }
}
  