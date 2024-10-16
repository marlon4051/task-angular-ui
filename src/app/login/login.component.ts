import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NewUserModalComponent } from '../new-user-modal/new-user-modal.component';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public email = '';
  public password = '';

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _modalService: BsModalService
  ) {}

  ngOnInit(): void {
    const token = this._authService.getToken();
    if (token) {
      this._router.navigate(['/tasks']);
    }
  }

  public async login() {
    await this._authService.login(this.email, this.password);

    if (this._authService.isLoggedIn()) {
      this._router.navigate(['/tasks']);
    } else {
      alert('Login failed');
    }
  }

  public openRegisterModal() {
    const bsModalRef: BsModalRef = this._modalService.show(
      NewUserModalComponent,
      {
        backdrop: 'static', // Prevent closing by clicking outside
        keyboard: false, // Prevent closing by pressing the Escape key
      }
    );

    bsModalRef.content.userRegistered.subscribe(async (newUser: User) => {
      const response = await this._authService.register(
        newUser.userName,
        newUser.email,
        newUser.password
      );
      if (response.message == 'User registered successfully') {
        alert('Register Success');
      } else {
        alert(`Failed to create the user, error: ${response.error}`);
      }
    });
  }
}
