import { Injectable } from '@angular/core';
//import AngularFireAuth
import{AngularFireAuth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:AngularFireAuth) { }


  //signup service
  signUp(email:string,password:string)
  {
    return this.auth.createUserWithEmailAndPassword(email,password);
  }

  //signIn service
  signIn(email:string,password:string)
  {
    return this.auth.signInWithEmailAndPassword(email,password);
  }
  //getUser service
  getUser()
  {
    return this.auth.authState;
  }
  //signOut service
  signOut()
  {
    return this.auth.signOut();
  }
}
