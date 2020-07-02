

import { Component, OnInit } from '@angular/core';
//importt Toastr
import { ToastrService } from 'ngx-toastr';
//services
import { AuthService } from './../../services/auth.service';
//import Router
import { Router } from '@angular/router';
//Angular form
import{NgForm} from "@angular/forms";
import {finalize} from 'rxjs/operators';
//firebase
import{AngularFireStorage} from "@angular/fire/storage";
import{AngularFireDatabase} from "@angular/fire/database";
//browser-image-resizer
import { readAndCompressImage } from 'browser-image-resizer';
//imageConfig
import { imageConfig } from './../../../utils/config';
ToastrService
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  picture: string ="https://learnyst.s3.amazonaws.com/assets/schools/2410/resources/images/logo_lco_i3oab.png";
  uploadPercent:number = null;

  constructor(
    private auth:AuthService,
    private router:Router,
    private toastr:ToastrService,
    private db:AngularFireDatabase,
    private storage:AngularFireStorage
  ) { }

  ngOnInit(): void {}

  onSubmit(f:NgForm)
  {
    const{email,password,username,country,bio,name}=f.form.value;
    //bring up service
    this.auth.signUp(email,password)
    .then((res)=>{
      console.log(res);
      const {uid}=res.user;
      this.db.object(`/users/${uid}`)
      .set({
        id:uid,
        name:name,
        email:email,
        instaUserName:username,
        country:country,
        bio:bio,
        picture:this.picture
      })

    })
    .then(()=>{
      //navgation to home and notify
      this.router.navigateByUrl('/');
      this.toastr.success("Successfully SignUp");
    })
    .catch((err)=>{
      this.toastr.error("SignUp Failed");

    })
  }

  async uploadFile(event)
  {
    //which file it will take
    const file= event.target.files[0];
    //resize image
    let resizedImage =await readAndCompressImage(file,imageConfig);
    const filePath = file.name //rename the image with todo:uuid
    const fileRef=this.storage.ref(filePath);

    //upload image
    const task=this.storage.upload(filePath,resizedImage);
    task.percentageChanges().subscribe((percentage)=>{
      this.uploadPercent = percentage;
    });


    task.snapshotChanges().pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe((url)=>{
          this.picture=url;
          this.toastr.success("Image Upload Success");
        })
      })
    ).subscribe();
  }

}
