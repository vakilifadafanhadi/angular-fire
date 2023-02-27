import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.less']
})
export class ForgetPasswordComponent implements OnInit {
  loadingButton: boolean = false;
  formGroup!: FormGroup;
  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) { }
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.formGroup = this._formBuilder.group({
      email: [null],
      password: [null]
    });
  }
  async submit() {
    this.loadingButton = true;
    try {
      await this._authService.forgetPassword(
        this.formGroup.get("email")?.value
      )
        .then((result) => {
          console.log("register", result);
          localStorage.setItem("token", "true");
          this._router.navigate(["/login"]);
          this.sendEmailVerification();
        })
        .catch(exception => {
          alert("Somethhing went wrong");
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
  async sendEmailVerification() {
    try {
      this.loadingButton = true;
      await this._authService.sendEmailVerification(this.formGroup.get("email")?.value)
        .then((result) => {
          console.log("send email verification", result);
          this._router.navigate(["/verify-email"]);
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
