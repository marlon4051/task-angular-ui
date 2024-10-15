import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrl: './edit-task-modal.component.scss',
})
export class EditTaskModalComponent {
  @Input() task: any;
  @Output() taskUpdated = new EventEmitter<any>();
  public statuses = ['pending', 'working', 'completed'];

  constructor(public bsModalRef: BsModalRef) {}

  public updateTask() {
    this.taskUpdated.emit(this.task);
    this.bsModalRef.hide();
  }
}
