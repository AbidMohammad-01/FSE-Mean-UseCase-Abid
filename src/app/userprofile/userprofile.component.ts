
import { Component, inject, OnInit } from '@angular/core';
import { UserregisterService } from '../services/userregister.service';
import { User } from '../models/usertype';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent implements OnInit {
  userService = inject(UserregisterService)
  loggedInUser: User; //getting Logged in user details
  toast = inject(NgToastService)
  ngOnInit(): void {
  //from user service use getCurrent user method to extract the details of Current User
    this.userService.getCurrentUser().subscribe({
      next: (user: User) => {
        this.loggedInUser = user;
       
      },
      error: (err) => {
        console.log('Error', err)
      }
    })

  }
  save() {
    this.toast.success({
      detail: 'Success',
      summary: 'User Additional Details added Successfully',
      position: 'topCenter',
      duration: 3000
    })
  }
}