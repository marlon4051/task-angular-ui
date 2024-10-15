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
  email: string = '';
  password: string = '';

  constructor(private _router: Router, private _authService: AuthService, private _modalService: BsModalService) {}

  public login() {
    if (this._authService.login(this.email, this.password)) {
      // Redirige al dashboard
      this._router.navigate(['/tasks']);
    } else {
      alert('Login failed');
    }
  }

  public openRegisterModal() {
    const bsModalRef: BsModalRef = this._modalService.show(NewUserModalComponent);
    
    bsModalRef.content.userRegistered.subscribe((newUser: User) => {
      // Aquí puedes manejar la lógica para el nuevo usuario registrado
      console.log('Usuario registrado:', newUser);
      // Puedes realizar acciones adicionales, como enviar el usuario a un servicio de backend.
    });
  }
}