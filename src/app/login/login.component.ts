import { Component, inject } from '@angular/core';
import { FormBuilder,Validators} from '@angular/forms';
import { UserregisterService } from '../services/userregister.service'; 
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  userCredErr={userCredErrStatus:false,userCredErrMsg:''} //user cred error status and msg
  toast = inject(NgToastService)
    //Form for the user credentials with validators using Form Builder
  user=this.fb.group({
    id:(['',Validators.required]),
    password:(['',Validators.required]),
    role:(['',Validators.required])
    
  })
  //getters
  get id() {
    return this.user.get('id')
  }
 
  get password() {
    return this.user.get('password')
  }
  constructor(private logindata:UserregisterService,private router:Router,private fb:FormBuilder,private cart:CartService){}
//User Login and Autentication using JWT
  userLogin(){
     console.log(this.user.value);
     this.logindata.userLogin(this.user.value,this.user.value.role).subscribe({
       next:(res)=>{
         if(res.message==="logged in succesfully"){
         
         if(this.user.value.role==='user'){
          localStorage.setItem('token',res.token) //can use local or session storage but session is more secure
         //set user status and current user to service
         //this.cart.usernameSignal.set(res.user.id)
         this.logindata.setUserRole(this.user.value.role)
         this.logindata.setLoginStatus(true)
         console.log('uSER',res)
         this.logindata.setCurrentUser(res.user)
         this.router.navigate([`/userprofile/${res.user.id}`])
         }
         else{
          console.log('admin',res);
          
          localStorage.setItem('token',res.token)
          this.logindata.setLoginStatus(true)
          this.logindata.setCurrentUser(res.user)
          this.router.navigate([`/admin`])
         }
         }
         else{
           this.userCredErr={userCredErrStatus:true,userCredErrMsg:res.message}
         }
       },
       error:(error)=>{
        this.toast.success({
          detail:'Select Role',
          summary:'Choose a role to login',
          position:'topCenter',
          duration:3000
        })
         console.log('err in user login',error)
       }
     })
 
 }

}
