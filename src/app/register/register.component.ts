import { Component,inject } from '@angular/core';
import { UserregisterService } from '../services/userregister.service'; 
import {FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/usertype'; 
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  duplicateUserStatus=false //initializing duplicateUserStatus as false 
  fb:FormBuilder = inject(FormBuilder);
  router = inject(Router)
  toast = inject(NgToastService)
  userReg=inject(UserregisterService)
  //Form for the user registeration details with validators using Form Builder
  user = this.fb.group({
    firstname:['',Validators.required],
    lastname:['',Validators.required],
    id:['',Validators.required],
    password:['',Validators.required],
    confirmpassword:['',Validators.required],
    email:['',Validators.required],
    phone:['',Validators.required],
    
  })
  //getters for the details from the form
  get firstname() {
    return this.user.get('firstname')
  }
 
  get lastname() {
    return this.user.get('lastname')
  }
 
  get id() {
    return this.user.get('id')
  }
 
  get password() {
    return this.user.get('password')
  }

  get confirmpassword() {
    return this.user.get('confirmpassword')
  }
 
  get email() {
    return this.user.get('email')
  }
  get phone() {
    return this.user.get('phone')
  }
 //On submitting the form details 
  onSubmitUser(){
    let {firstname,lastname,id,password,confirmpassword,email,phone} = this.user.value; //create obj of user Details
    let newUser = new User(firstname,lastname,id,password,confirmpassword,email,phone); // assigning newUser to the User Model of User Credentials
   //from userService create User method is used to post the user details
    this.userReg.createUser(newUser).subscribe({
      next:(res)=>{
        
        if(res.message=== "succesfully registered"){
          //if user is created successfully then notify user
          this.toast.success({
            detail:'Registration Successful',
            summary:'User Created navigating to Login...',
            position:'topCenter',
            duration:3000
          })
        this.router.navigate(['/login']) //navigating to login
        }
        else{
          //If the user details are already present then duplicate user is detected 
            this.duplicateUserStatus=true //changing status to true
            this.toast.success({
              detail:'Registration Error',
              summary:'User already Exists',
              position:'topCenter',
              duration:3000
            })
      
        }
      },
      error:(error)=>{
        
        console.log("Error in user Creation",error)
      }
  })
  }
}