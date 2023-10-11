import { FirebaseService } from '../../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {UtilsService, } from '../../services/utils.service'
import { User } from 'src/app/models/user.models';
import { customValidators } from 'src/app/util/custom-validators';




@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit  {
 

  form=new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(7)]),
    name: new FormControl('',[Validators.required, Validators.minLength(4)]),
    lastName:new FormControl('',[Validators.required, Validators.minLength(4)]),
    confirmPasword: new FormControl(''),

  })
 
  confirmPasswordV(){
    this.form.controls.confirmPasword.setValidators([Validators.required,
    customValidators.machValues(this.form.controls.password) 
    ])
    this.form.controls.confirmPasword.updateValueAndValidity();
  }
  constructor( private firebaseSvc :FirebaseService,
  private utilsSvc: UtilsService){
   
  }

  ngOnInit() {
    this.confirmPasswordV()
  }
  submit(){
    if(this.form.valid){
      console.log(this.form.value)
      this.utilsSvc.presentLoading({ message:'Registrando...'})
      this.firebaseSvc.SignUp(this.form.value as User).then(async res =>{
        console.log(res);

        await this.firebaseSvc.updateUser({displayName: this.form.value.name})
        let user: User = {
          uid: res.user.uid,
          name: res.user.displayName,
          email:res.user.email,
          lastName:this.form.value.lastName
        }
        this.utilsSvc.setElementeInStorage('user',user);
        this.utilsSvc.RouterLink('/note') 

        this.utilsSvc.dismissloading();
      
      })
    }
  }
}

 




  












