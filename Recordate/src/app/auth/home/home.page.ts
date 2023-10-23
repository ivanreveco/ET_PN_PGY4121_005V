import { Router } from '@angular/router';
import { NavController , ToastController} from '@ionic/angular';
import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/models/user.models';


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

 


  constructor(
    private utilsSvc: UtilsService,
    private firebaseSvc: FirebaseService,
    private router: Router
  ) {
  }

  ngOnInit() {
      
  }

  submit() {
    if (this.form.valid) {
      this.utilsSvc.presentLoading({ message: 'iniciando session...', duration: 1000 });
      this.firebaseSvc.login(this.form.value as User).then(
        async (res) => {
          this.form.reset();
          this.redirectToHomePage(); 
          console.log(res);

          let user: User = {
            uid: res.user.uid,
            name: res.user.displayName,
            email: res.user.email,
            lastName: res.user.displayName,
          };

          this.utilsSvc.setElementeInStorage('user', user);
          this.utilsSvc.dismissloading();

         
        },
        (error) => {
          this.utilsSvc.dismissloading();
          this.utilsSvc.presentToast({
            message: 'Correo o contraseña incorrecta',
            duration: 5000,
            color: 'warning',
            icon: 'alert-circle-outline',
          });
        }
      );
    }
  }
  private redirectToHomePage() {
    this.router.navigateByUrl('/home-page');
    setTimeout(() => {
      location.reload();
    }, 100);
  }

}
  