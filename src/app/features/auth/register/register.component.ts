import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent {
  hide: boolean = true;
  formGroup!: FormGroup;
  loadingButton: boolean = false;
  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _matSnackBar: MatSnackBar
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
      ])],
      confirmPassword: [null, Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])],
      accept: [false, Validators.required]
    });
  }
  async submit() {
    this.loadingButton = true;
    try {
      await this._authService.register(
        this.formGroup.get("email")?.value,
        this.formGroup.get("password")?.value
      )
        .then((result) => {
          console.log("register", result);
          localStorage.setItem("token", "true");
          this.sendEmailVerification(result.user);
          this._router.navigate(["/features/auth/login"]);
        })
        .catch(exception => {
          this._matSnackBar.open(exception, undefined, {
            duration: 3000
          });
          console.warn("exception", exception);
        });
    }
    catch (error) {
      console.error("error", error);
    }
    finally {
      this.loadingButton = false;
    }
  }
  async sendEmailVerification(user: any) {
    try {
      this.loadingButton = true;
      await this._authService.sendEmailVerification(user)
        .then((result) => {
          console.log("send email verification", result);
        })
        .catch(exception => {
          console.warn(exception);
        })
    }
    catch (error) {
      console.error("error", error);
    }
    finally {
      this.loadingButton = false;
    }
  }
}
