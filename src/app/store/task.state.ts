import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Task } from '../models/task.model';

export class AddTask {
  static readonly type = '[Task] Add';
  constructor(public payload: Task) {}
}

export class UpdateTask {
  static readonly type = '[Task] Update';
  constructor(public payload: Task) {}
}

export class DeleteTask {
  static readonly type = '[Task] Delete';
  constructor(public payload: number) {} // Payload es el ID de la tarea a eliminar
}

export interface TaskStateModel {
  tasks: Task[];
}

@State<TaskStateModel>({
  name: 'tasks',
  defaults: {
    tasks: [
      {
        id: 1,
        title: 'Card 1',
        description: 'This is the description for card 1.',
        status: 'completed',
      },
      {
        id: 2,
        title: 'Card 3',
        description: 'This is the description for card 3.',
        status: 'working',
      },
      {
        id: 3,
        title: 'Card 4',
        description: 'This is the description for card 1.',
        status: 'completed',
      },
      {
        id: 4,
        title: 'Card 4',
        description: 'This is the description for card 1.',
        status: 'pending',
      },
    ],
  },
})
export class TaskState {
  @Selector()
  static getTasks(state: TaskStateModel) {
    return state.tasks;
  }

  @Action(AddTask)
  addTask(ctx: StateContext<TaskStateModel>, action: AddTask) {
    const state = ctx.getState();
    ctx.setState({
      tasks: [...state.tasks, action.payload],
    });
  }

  @Action(UpdateTask)
  updateTask(ctx: StateContext<TaskStateModel>, action: UpdateTask) {
    const state = ctx.getState();
    const tasks = state.tasks.map((task) =>
      task.id === action.payload.id ? action.payload : task
    );
    ctx.setState({
      tasks,
    });
  }

  @Action(DeleteTask)
  deleteTask(ctx: StateContext<TaskStateModel>, action: DeleteTask) {
    const state = ctx.getState();
    const tasks = state.tasks.filter((task) => task.id !== action.payload);
    ctx.setState({
      tasks,
    });
  }
}
