import { Injectable } from '@angular/core';
import { LoadingController, LoadingOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private errorMessageShown: boolean = false;

  constructor(private loadingController: LoadingController, private router: Router, private toastController: ToastController,
   private auth:AngularFireAuth,
   private db:AngularFirestore ) {}

  async presentLoading(opts: LoadingOptions) {
    const loading = await this.loadingController.create(opts);
    await loading.present();
  }

  async dismissloading() {
    return await this.loadingController.dismiss();
  }

  setElementeInStorage(key: string, element: any) {
    return localStorage.setItem(key, JSON.stringify(element));
  }

  getElementInStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  async presentToast(opts: ToastOptions) {
    const toast = await this.toastController.create(opts);
    toast.present();

    // Set errorMessageShown to true when displaying a toast
    this.errorMessageShown = true;
  }

  isErrorMessageShown() {
    return this.errorMessageShown;
  }

  resetErrorMessageShown() {
    this.errorMessageShown = false;
  }

  RouterLink(url: string) {
    return this.router.navigateByUrl(url);
  }
  createDoc(data: any, path: string, id: string) {
    const collection = this.db.collection(path);
    return collection.doc(id).set(data);
}
getDoc<tipo>(path: string, id: string) {
  const collection = this.db.collection<tipo>(path);
  return collection.doc(id).valueChanges();
}
createId(){
  return this.db.createId();
}

}
