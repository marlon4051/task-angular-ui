import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateTaskModalComponent } from './create-task-modal/create-task-modal.component';
import { EditTaskModalComponent } from './edit-task-modal/edit-task-modal.component';
import { Store } from '@ngxs/store';
import {
  CreateTask,
  DeleteTask,
  GetTasks,
  UpdateTask,
} from '../store/task.state';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.scss',
})
export class TaskManagerComponent implements OnInit {
  public tasks!: Task[];
  public bsModalRef!: BsModalRef;
  public userName!: string;
  constructor(
    private _modalService: BsModalService,
    private store: Store,
    private _authService: AuthService
  ) {
    this.userName = this._authService.getUserName();
  }

  public ngOnInit(): void {
    this.loadTasks();
  }

  public loadTasks() {
    this.store.dispatch(new GetTasks()).subscribe((result: any) => {
      this.tasks = result.tasks.tasks;
      console.log(result.tasks.tasks);
    });
  }

  public logout() {
    this._authService.logout();
  }

  public createTask() {
    const modalRef: BsModalRef = this._modalService.show(
      CreateTaskModalComponent,
      {
        backdrop: 'static', // Prevent closing by clicking outside
        keyboard: false, // Prevent closing by pressing the Escape key
      }
    );
    modalRef.content.taskAdded.subscribe((newTask: Task) => {
      this.store.dispatch(new CreateTask(newTask)).subscribe(() => {
        this.loadTasks();
      });
    });
  }

  public editTask(task: Task) {
    const initialState = {
      task: { ...task },
    };
    const bsModalRef: BsModalRef = this._modalService.show(
      EditTaskModalComponent,
      {
        initialState,
        backdrop: 'static', // Prevent closing by clicking outside
        keyboard: false, // Prevent closing by pressing the Escape key
      }
    );

    bsModalRef.content.taskUpdated.subscribe((updatedTask: Task) => {
      this.store
        .dispatch(new UpdateTask(updatedTask.id, updatedTask))
        .subscribe(() => {
          this.loadTasks();
        });
    });
  }

  public deleteTask(task: Task) {
    const confirmDelete = confirm('Are you sure you want to delete this task?');

    if (confirmDelete) {
      this.store.dispatch(new DeleteTask(task.id)).subscribe(() => {
        this.loadTasks();
      });
      console.log('Deleted task:', task);
    } else {
      console.log('Deletion canceled');
    }
  }
}
