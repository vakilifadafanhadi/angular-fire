import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private _router: Router
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
          this._router.navigate(["/login"]);
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
}
