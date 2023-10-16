
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, updateProfile } from 'firebase/auth';
import { User } from '../models/user.models';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private utilsSvc: UtilsService,
  ) { }

  login(user: User) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  SignUp(user: User) {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  updateUser(user: any) {
    const auth = getAuth(); 
    return updateProfile(auth.currentUser, user);
  }
  getAuthState(){
    return this.auth.authState
  }

  async singOut(){
    await this.auth.signOut();
    this.utilsSvc.RouterLink('/home');
    localStorage.removeItem('user');
  }
  
  getSubCollection(path:string, subCollectionName:string){
    return this.db.doc(path).collection(subCollectionName).valueChanges({ idField:'id'})
  }
  set_User<tipo>(data: tipo, enlace : string, id : string) {
    const ref = this.db.collection<tipo>(enlace);
    return ref.doc(id).set(data);
  }
  createId(){
    return this.db.createId();
  }
  
}