import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/tasks';
  constructor(
    private http: HttpClient
  ) {}

  getTasks() {
    return this.http.request<any>('get',this.apiUrl);
  }

  createTask(task: Task) {
    return this.http.request<any>('post',this.apiUrl, {body:task});
  }

  updateTask(id: number, task: Task) {
    return this.http.request<any>('put', `${this.apiUrl}/${id}`, {body:task});
  }

  deleteTask(id: number) {
    return this.http.request<any>('delete',`${this.apiUrl}/${id}`);
  }
}
