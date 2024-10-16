import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from '../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user-modal',
  templateUrl: './new-user-modal.component.html',
  styleUrl: './new-user-modal.component.scss',
})
export class NewUserModalComponent implements OnInit {
  userForm!: FormGroup;
  @Output() userRegistered = new EventEmitter<any>();

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  register() {
    if (this.userForm.valid) {
      const newUser: User = this.userForm.value;
      this.userRegistered.emit(newUser);
      this.bsModalRef.hide();
    }
    
  }
}
