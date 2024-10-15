import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CreateTaskModalComponent } from './task-manager/create-task-modal/create-task-modal.component';
import { EditTaskModalComponent } from './task-manager/edit-task-modal/edit-task-modal.component';
import { NewUserModalComponent } from './new-user-modal/new-user-modal.component';
import { TaskState } from './store/task.state';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TaskManagerComponent,
    CreateTaskModalComponent,
    EditTaskModalComponent,
    NewUserModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ModalModule.forRoot(),
    NgxsModule.forRoot([TaskState]) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
