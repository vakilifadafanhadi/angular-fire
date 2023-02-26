import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent {
  hide: boolean = true;
  formGroup!: FormGroup;
  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder
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
  submit() {
    this._authService.register(
      this.formGroup.get("email")?.value,
      this.formGroup.get("password")?.value
    );
  }
}
