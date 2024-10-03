import { inject, Injectable ,signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs'
import { User } from '../models/usertype';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class UserregisterService {
  toast=inject(NgToastService);

  constructor(private http:HttpClient,private router:Router) { }
  userStatus=new BehaviorSubject<boolean>(false)
  currentUser=new BehaviorSubject<User>({
    firstname:'',
    lastname:'',
    id:'',
    password:'',
    confirmpassword:'',
    email:'',
    phone:''
  })

  role=signal('')
  setLoginStatus(value:boolean){
    this.userStatus.next(value)
  }
  getLoginStatus(){
    return this.userStatus.asObservable()
  }
  setCurrentUser(user:User){
    this.currentUser.next(user)
  }
  getCurrentUser(){
    return this.currentUser.asObservable()

  }
  createUser(data:User):Observable<any>{
    return this.http.post(`http://localhost:3000/api/v1.0/moviebooking/register`,data)
  }
  userLogin(logindata:User|any,role:string):Observable<any>{
    
    return this.http.post(`http://localhost:3000/api/v1.0/moviebooking/login`,logindata)
  }
forgotPassword(username:any):Observable<any>{
    console.log(username);
    
    return this.http.get(`http://localhost:3000/api/v1.0/moviebooking/${username.id}/forgot`)
  }
  resetPassword(data:any):Observable<any>{
    console.log(data);
    
    return this.http.post(`http://localhost:3000/api/v1.0/moviebooking/reset-password/${data.token}`,data)
  }
 setUserRole(value){
  this.role.set(value)
 }

 
  //User Logout function
  userLogOut(){
    //reset current use,login status,remove token
    this.setLoginStatus(false)
    this.setCurrentUser({firstname:'',
    lastname:'',
    id:'',
    password:'',
    confirmpassword:'',
    email:'',
    phone:''})
    localStorage.removeItem('token')
    this.toast.success({
      detail:'Log Out Success',
      summary:'User logged out successfully',
      position:'topCenter',
      duration:3000
    })
    this.router.navigate(['/home'])

  }

}
  


