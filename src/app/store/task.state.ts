import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { Injectable } from '@angular/core';
import { firstValueFrom, tap } from 'rxjs';

export class GetTasks {
  static readonly type = '[Task] Get Tasks';
}
export class CreateTask {
  static readonly type = '[Task] Create Task';
  constructor(public payload: Task) {}
}

export class UpdateTask {
  static readonly type = '[Task] Update Task';
  constructor(public id: number, public payload: Task) {}
}

export class DeleteTask {
  static readonly type = '[Task] Delete Task';
  constructor(public id: number) {}
}

export interface TaskStateModel {
  tasks: Task[];
}
@Injectable()
@State<TaskStateModel>({
  name: 'tasks',
  defaults: {
    tasks: [],
  },
})
export class TaskState {
  constructor(private taskService: TaskService) {}

  @Selector()
  static getTasks(state: TaskStateModel) {
    return state.tasks;
  }

  @Action(GetTasks)
  getTasks(ctx: StateContext<TaskStateModel>) {
    return this.taskService.getTasks().pipe(
      tap((result) => {
        ctx.setState({
          ...ctx.getState(), 
          tasks: result 
        });
      })
    );
  }

  @Action(CreateTask)
  async createTask(
    { dispatch }: StateContext<TaskStateModel>,
    { payload }: CreateTask
  ) {
    await firstValueFrom(this.taskService.createTask(payload));
    dispatch(new GetTasks());
  }

  @Action(UpdateTask)
  async updateTask(
    { dispatch }: StateContext<TaskStateModel>,
    { id, payload }: UpdateTask
  ) {
    await firstValueFrom(this.taskService.updateTask(id, payload));
    dispatch(new GetTasks());
  }

  @Action(DeleteTask)
  async deleteTask(
    { dispatch }: StateContext<TaskStateModel>,
    { id }: DeleteTask
  ) {
    await firstValueFrom(this.taskService.deleteTask(id));
    dispatch(new GetTasks());
  }
}
