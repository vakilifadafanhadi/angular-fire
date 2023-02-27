import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'src/app/core/models/student';
import { AuthService } from 'src/app/core/services/auth.service';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  loadingButton: boolean = false;
  studentsList: Student[] = [];
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'mobile', 'actions'];
  formGroup!: FormGroup;
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _dataService: DataService
  ) {
  }
  ngOnInit(): void {
    this.list();
    this.initForm();
  }
  initForm() {
    this.formGroup = this._formBuilder.group<Student>({
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      mobile: ""
    });
  }
  async logout() {
    this.loadingButton = true;
    try {
      await this._authService.logout()
        .then((result) => {
          console.log("logout", result);
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
          this._router.navigate(["../auth/login"]);
        })
        .catch(exception => {
          alert("Somethhing went wrong");
          console.warn("exception", exception);
          this._router.navigate(["../auth/login"]);
        });
    }
    catch (error) {
      console.error("error", error);
    }
    finally {
      this.loadingButton = false;
    }
  }
  list() {
    // this.loadingButton = true;
    this._dataService.list().subscribe(res => {
      this.studentsList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        this.loadingButton = false;
        return data;
      })
    }, err => {
      console.warn("exception", err);
      this.loadingButton = false;
    });
  }
  create() {
    if (this.formGroup.invalid) {
      return;
    }
    if (this.formGroup.get("id")?.value == "")
      this._dataService.create(this.formGroup.value);
    else
      this._dataService.update(this.formGroup.value);
    this.formGroup.reset();
  }

  select(student: Student) {
    this.formGroup.patchValue(student);
  }
  delete(student: Student) {
    if (window.confirm("are you sure to delete " + student?.last_name))
      this._dataService.delete(student.id!);
  }
  resetForm() {
    this.formGroup.reset();
  }
}
