import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  email=null;
  constructor(private auth:AuthService,private router:Router,private toastr:ToastrService) { 
    //helper
    auth.getUser().subscribe((user)=>{
      console.log("User Is:", user);
      this.email=user?.email;
    })
  }

  ngOnInit(): void {
  }
  //signOut method
  // async handleSignOut()
  // {
  //   try {
  //     //code for logout
  //     await this.auth.signOut();
  //     //redirect to signin page
  //     this.router.navigateByUrl('/signin');
  //     //LogOut notification
  //     this.toastr.info("LogOut Successfully");
  //     //make the email null
  //     this.email=null;

  //   } catch (error) {
  //     //error notification for signout
  //     this.toastr.error("Problem in SignOut");
      
  //   }
  // }
  async handleSignOut()
  {
    try {
      await this.auth.signOut();
      
      this.router.navigateByUrl('/signin');
      this.toastr.info("Logout success");
      this.email = null;
    } catch (error) {
      this.toastr.error("Problem in signout");
    }
  }

}
