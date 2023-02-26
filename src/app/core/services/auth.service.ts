import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _fireAuth: AngularFireAuth,
    private _router: Router
  ) { }
  login(email: string, password: string) {
    this._fireAuth.signInWithEmailAndPassword(email, password).then((result) => {
      console.log("login", result);
      localStorage.setItem("token", "true");
      this._router.navigate(["dashboard"]);
    },
      error => {
        alert("Somethhing went wrong");
        console.error("error", error);
        this._router.navigate(["/login"]);
      });
  }
  register(email: string, password: string) {
    this._fireAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log("register", result);
        localStorage.setItem("token", "true");
        this._router.navigate(["/login"]);
      },
        error => {
          alert("Somethhing went wrong");
          console.error("error", error);
        });
  }
  logout() {
    this._fireAuth.signOut().then((result) => {
      console.log("register", result);
      localStorage.removeItem("token");
      this._router.navigate(["../login"]);
    },
      error => {
        alert("Somethhing went wrong");
        console.error("error", error);
        this._router.navigate(["../login"]);
      });
  }
}
