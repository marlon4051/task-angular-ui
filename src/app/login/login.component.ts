import { Component } from '@angular/core';
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
export class LoginComponent {
  public email = '';
  public password = '';

  constructor(private _router: Router, private _authService: AuthService, private _modalService: BsModalService) {}

  public async login() {
    await this._authService.login(this.email, this.password)
    
    if (this._authService.isLoggedIn()) {
      this._router.navigate(['/tasks']);
    } else {
      alert('Login failed');
    }
  }

  public openRegisterModal() {
    const bsModalRef: BsModalRef = this._modalService.show(NewUserModalComponent);
    
    bsModalRef.content.userRegistered.subscribe(async(newUser: User) => {
      const response = await this._authService.register(newUser.userName, newUser.email, newUser.password)
      if(response) {
        alert('Register Success');
      } else {
        alert('Failed to create the user');
      }
    });
  }
}