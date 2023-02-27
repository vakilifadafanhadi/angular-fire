import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

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
}
