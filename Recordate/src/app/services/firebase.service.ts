import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user.models'; 


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
  ) { }

  login(user: User) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password);
  }
  SignUp(user: User){
    return this.auth.signInWithEmailAndPassword(user.email, user.password);
  }
  getAuthState(){
    return this.auth.authState;
  }
  
  async signOut(){
    await this.auth.signOut();

  }
  getSubCollection(path: string, SubCollectionName: string ){
    return this.db.doc(path).collection(SubCollectionName).valueChanges({idFiel: 'id'});
  }

  addToSubCollection(path: string, SubCollectionName: string, object: any){
    return this.db.doc(path).collection(SubCollectionName).add(object);
  }

  updateDocument(path: string, object: any){
    return this.db.doc(path).update(object);
  }

  deleteDocument(path: string){
    return this.db.doc(path).delete();
  }
}
