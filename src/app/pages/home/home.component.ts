import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users=[];
  posts=[];
  isLoading=false;

  constructor(private toastr:ToastrService,
    private db:AngularFireDatabase) {
      this.isLoading =true;
      //get all the users ('/users') came from firbase
      db.object('/users').valueChanges().subscribe((obj)=>{
        if(obj){
          this.users = Object.values(obj);
          this.isLoading = false;
        }
        else{
          //if no user found check the db, testing purpose
          this.toastr.error("No User Found");
          this.users = [];
          this.isLoading = false;
        }
      });
      //grab all posts from firebase
      db.object('/posts').valueChanges().subscribe((obj)=>{
        if(obj)
        {
          this.posts = Object.values(obj).sort((a,b) => b.date-a.date);
          this.isLoading = false;

        }
        else{
          this.toastr.error("No Posts Available");
          this.posts = [];
          this.isLoading = false;
        }
        

      });
     }

  ngOnInit(): void {
  }

}
