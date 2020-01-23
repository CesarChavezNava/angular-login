import * as firebase from 'firebase/app';

import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AngularFireAuth  } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fbAuth: AngularFireAuth) { }

  async register(user: User) {
    const  result = await this.fbAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    user.uid = result.user.uid;
  }

  async loginWithEmail(user: User) {
    const result = await this.fbAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    user.uid = result.user.uid;
  }

  async logOut() {
    await this.fbAuth.auth.signOut();
  }

  async loginWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    await this.fbAuth.auth.signInWithPopup(provider);
  }

  async loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    await this.fbAuth.auth.signInWithPopup(provider);
  }
}
