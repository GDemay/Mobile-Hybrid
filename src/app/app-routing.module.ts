import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  {path: 'logout', loadChildren: './logout/logout.module#LogoutPageModule'},
  {path: 'about', loadChildren: './about/about.module#AboutPageModule', canActivate: [AuthGuard]},
  {path: 'recording', loadChildren: './recording/recording.module#RecordingPageModule', canActivate: [AuthGuard]},
  { path: 'conversation-details', loadChildren: './conversation-details/conversation-details.module#ConversationDetailsPageModule' },
  { path: 'conversation-details/:id', loadChildren: './conversation-details/conversation-details.module#ConversationDetailsPageModule' },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
