import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrl: './edit-task-modal.component.scss',
})
export class EditTaskModalComponent implements OnInit {
  @Input() task: any;
  @Output() taskUpdated = new EventEmitter<unknown>();
  public statuses = ['pending', 'working', 'completed'];
  public taskForm!: FormGroup;

  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [
        this.task.title,
        [Validators.required, Validators.maxLength(100)],
      ],
      description: [
        this.task.description,
        [Validators.required, Validators.minLength(5)],
      ],
      status: [this.task.status, Validators.required],
    });
  }

  public updateTask() {
    if (this.taskForm.valid) {
      const newTask = {
        id: this.task.id,
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        status: this.taskForm.value.status,
      };
      this.taskUpdated.emit(newTask);
      this.bsModalRef.hide();
    }
  }
}
