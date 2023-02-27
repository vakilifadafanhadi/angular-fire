import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent {
  loadingButton: boolean = false;
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
  }
  async logout() {
    this.loadingButton = true;
    try {
      await this._authService.logout()
        .then((result) => {
          console.log("logout", result);
          localStorage.removeItem("token");
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
}
