import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrl: './create-task-modal.component.scss',
})
export class CreateTaskModalComponent {
  @Output() taskAdded = new EventEmitter<any>();
  @Input() lastId!: number;
  public taskTitle!: string;
  public taskDescription!: string;
  public taskStatus!: string;
  public statuses = ['pending', 'working', 'completed'];

  constructor(public bsModalRef: BsModalRef) {}

  onClose(): void {
    this.bsModalRef.hide(); 
  }

  addTask() {
    const newTask = {
      id: this.lastId++,
      title: this.taskTitle,
      description: this.taskDescription,
      status: this.taskStatus 
    };
    this.taskAdded.emit(newTask);
    this.bsModalRef.hide();
  }
}

