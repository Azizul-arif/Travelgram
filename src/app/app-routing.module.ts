import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { AddpostComponent } from './pages/addpost/addpost.component';

import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  AngularFireAuthGuardModule,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['signin']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);
AddpostComponent;
PagenotfoundComponent;
SigninComponent;
SignupComponent;
HomeComponent;

const routes: Routes = [
  //declare the path and component
  {
    path: 'signin',
    component: SigninComponent,
    canActivate:[AngularFireAuthGuard],
    data:{authGuardPipe:redirectLoggedInToHome}
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate:[AngularFireAuthGuard],
    data:{authGuardPipe:redirectLoggedInToHome}
  },
  {
    path: 'addpost',
    component: AddpostComponent,
    canActivate:[AngularFireAuthGuard],
    data:{authGuardPipe:redirectUnauthorizedToLogin}
  },
  {
    path: '',
    component: HomeComponent,
    canActivate:[AngularFireAuthGuard],
    data:{authGuardPipe:redirectUnauthorizedToLogin}
  },
  {
    path:"**",
    component:PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
