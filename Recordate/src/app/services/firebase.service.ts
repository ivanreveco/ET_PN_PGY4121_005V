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
    private utilSvc:UtilsService
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
    this.utilSvc.RouterLink('/home');
    localStorage.removeItem('user')
  }

  
  
  
}