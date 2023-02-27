import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private _fireAuth: AngularFireAuth
  ) { }
  login(email: string, password: string): Promise<any> {
    return this._fireAuth.signInWithEmailAndPassword(email, password);
  }
  register(email: string, password: string): Promise<any> {
    return this._fireAuth.createUserWithEmailAndPassword(email, password);
  }
  logout(): Promise<any> {
    return this._fireAuth.signOut();
  }
  forgetPassword(email: string): Promise<any> {
    return this._fireAuth.sendPasswordResetEmail(email);
  }
  sendEmailVerification(user: any): Promise<any> {
    return user.sendEmailVerification();
  }
  googleSignIn() {
    return this._fireAuth.signInWithPopup(new GoogleAuthProvider);
  }
}
