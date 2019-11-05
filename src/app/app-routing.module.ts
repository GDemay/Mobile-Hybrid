import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
   // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: '', loadChildren: './pages/idea-list/idea-list.module#IdeaListPageModule'} ,
  { path: 'recording', loadChildren: './pages/idea-list/idea-list.module#IdeaListPageModule' , canActivate: [AuthGuard]} ,
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', loadChildren: './pages/idea-list/idea-list.module#IdeaListPageModule', },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  {path: 'logout', loadChildren: './logout/logout.module#LogoutPageModule'},
  {path: 'about', loadChildren: './about/about.module#AboutPageModule' , canActivate: [AuthGuard]},
  {path: 'recording', loadChildren: './recording/recording.module#RecordingPageModule', canActivate: [AuthGuard]},
  { path: 'home', loadChildren: './pages/idea-list/idea-list.module#IdeaListPageModule' },
  { path: 'idea-details', loadChildren: './pages/idea-details/idea-details.module#IdeaDetailsPageModule', canActivate: [AuthGuard] } ,
   { path: 'idea', loadChildren: './pages/idea-details/idea-details.module#IdeaDetailsPageModule', canActivate: [AuthGuard]  },
   { path: 'idea/:id', loadChildren: './pages/idea-details/idea-details.module#IdeaDetailsPageModule', canActivate: [AuthGuard]  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
