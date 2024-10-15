import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from '../models/user.model';

@Component({
  selector: 'app-new-user-modal',
  templateUrl: './new-user-modal.component.html',
  styleUrl: './new-user-modal.component.scss'
})
export class NewUserModalComponent {
  @Output() userRegistered = new EventEmitter<any>();
  constructor(public bsModalRef: BsModalRef) {}
  
  newUser: User = {
    userName: '',
    email: '',
    password: ''
  };

  register() {
    this.userRegistered.emit(this.newUser);
    this.bsModalRef.hide(); // Cerrar el modal
  }
}
