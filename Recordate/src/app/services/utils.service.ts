import { Injectable } from '@angular/core';
import { LoadingController, LoadingOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private loadingController: LoadingController,
    private router :Router,
    private toastController: ToastController ) {}
   async presentLoading(opts: LoadingOptions) {
    const loading = await this.loadingController.create(opts);
    await loading.present();
   }
   async dismissloading(){
    return await this.loadingController.dismiss()
   }
   setElementeInStorage(key: string, element: any){
    return localStorage.setItem(key, JSON.stringify(element))
   }
   getElementInStorage(key: string){
    return JSON.parse(localStorage.getItem(key))
   }
   async presentToast(opts:ToastOptions) {
    const toast = await this.toastController.create(opts);
    toast.present();
   }

   RouterLink(url : string){
    return this.router.navigateByUrl(url);
   }
}
