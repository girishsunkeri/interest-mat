import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { EnrollEventComponent } from './components/enroll-event/enroll-event.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserInterestsComponent } from './components/user-interests/user-interests.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-event' },
  { path: 'add-event', component: AddEventComponent },
  { path: 'edit-event/:id', component: EditEventComponent },
  { path: 'events-list', component: EventListComponent },
  { path: 'enroll-event/:id', component: EnrollEventComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'interests', component: UserInterestsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
