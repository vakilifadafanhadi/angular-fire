import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  formGroup!: FormGroup;
  loadingButton: boolean = false;
  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) { }
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.formGroup = this._formBuilder.group({
      email: [null, Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(360)
      ])],
      password: [null, Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])]
    });
  }

  async submit() {
    if (this.formGroup.invalid) {
      return;
    }
    this.loadingButton = true;
    try {
      await this._authService.login(
        this.formGroup.get("email")?.value,
        this.formGroup.get("password")?.value
      )
        .then((result) => {
          console.log("login", result);
          localStorage.setItem("token", "true");
          this._router.navigate(["dashboard"]);
        })
        .catch(exception => {
          this._snackBar.open(exception, undefined, {
            duration: 3000
          });
          console.warn("exception", exception);
          this._router.navigate(["/login"]);
        });
    }
    catch (error) {
      console.error("error", error);
    }
    finally {
      this.loadingButton = false;
    }
  }
}
