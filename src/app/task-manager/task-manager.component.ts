import { Component } from '@angular/core';
import { Task } from '../models/task.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateTaskModalComponent } from './create-task-modal/create-task-modal.component';
import { EditTaskModalComponent } from './edit-task-modal/edit-task-modal.component';
import { Store } from '@ngxs/store';
import { AddTask, DeleteTask, UpdateTask } from '../store/task.state';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.scss',
})
export class TaskManagerComponent {
  public tasks!: Task[];
  public bsModalRef!: BsModalRef;
  public lastId = 1;
  public userName!: string;
  constructor(private _modalService: BsModalService, private store: Store, private _authService: AuthService ) {
    this.store
      .select((state) => state.tasks.tasks)
      .subscribe((tasks: Task[]) => {
        if (tasks.length > 0) {
          this.tasks = tasks;
          this.lastId = tasks[tasks.length - 1].id + 1;
        }
      });
    this.userName = this._authService.getUserName();
  }

  public logout() {
    this._authService.logout();
  }

  public createTask() {
    const initialState = {
      lastId: this.lastId, // Clonamos la tarea para evitar mutaciones directas
    };
    const modalRef: BsModalRef = this._modalService.show(
      CreateTaskModalComponent,
      { initialState }
    );
    modalRef.content.taskAdded.subscribe((newTask: Task) => {
      this.store.dispatch(new AddTask(newTask));
      this.lastId = this.lastId++;
    });
  }

  public editTask(task: any) {
    const initialState = {
      task: { ...task },
    };
    const bsModalRef: BsModalRef = this._modalService.show(
      EditTaskModalComponent,
      { initialState }
    );

    bsModalRef.content.taskUpdated.subscribe((updatedTask: Task) => {
      this.store.dispatch(new UpdateTask(updatedTask));
    });
  }

  public deleteTask(task: any) {
    const confirmDelete = confirm('Are you sure you want to delete this task?');

    if (confirmDelete) {
      this.store.dispatch(new DeleteTask(task.id));
      console.log('Deleted task:', task);
    } else {
      console.log('Deletion canceled');
    }
  }
}
