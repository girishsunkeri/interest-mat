import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularMaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EnrollEventComponent } from './components/enroll-event/enroll-event.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { EventService } from './shared/event.service';
import { EnrollEventService } from './shared/enroll-event.service';
import { AddEventComponent } from './components/add-event/add-event.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserService } from './shared/user.service';
import { LoginComponent } from './components/login/login.component';
import { PythonApiService } from './shared/python-api.service';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './components/register/register.component';
import { UserInterestsComponent } from './components/user-interests/user-interests.component';

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    EnrollEventComponent,
    AddEventComponent,
    EditEventComponent,
    AddUserComponent,
    UserListComponent,
    LoginComponent,
    RegisterComponent,
    UserInterestsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],

  providers: [EventService, EnrollEventService, UserService, AuthService, PythonApiService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
