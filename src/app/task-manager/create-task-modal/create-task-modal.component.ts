import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrl: './create-task-modal.component.scss',
})
export class CreateTaskModalComponent implements OnInit {
  @Output() taskAdded = new EventEmitter<unknown>();
  public taskTitle!: string;
  public taskDescription!: string;
  public taskStatus!: string;
  public statuses = ['pending', 'working', 'completed'];
  public taskForm!: FormGroup;

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      status: ['', Validators.required],
    });
  }

  public onClose(): void {
    this.bsModalRef.hide();
  }

  public addTask() {
    if (this.taskForm.valid) {
      this.taskAdded.emit(this.taskForm.value);
      this.bsModalRef.hide();
    }
  }
}
