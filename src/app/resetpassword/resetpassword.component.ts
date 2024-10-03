import { Component, inject } from '@angular/core';
import { FormBuilder,Validators} from '@angular/forms';
import { UserregisterService } from '../services/userregister.service'; 
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {
  toast = inject(NgToastService)
  fb = inject(FormBuilder)
    //Form for the user credentials with validators using Form Builder
  user=this.fb.group({
    token:(['',Validators.required]),
    password:(['',Validators.required]),
    confirmpassword:(['',Validators.required])
    
  })
 
  //getters
  get token() {
    return this.user.get('token')
  }
  get password() {
    return this.user.get('password')
  }
  get confirmpassword() {
    return this.user.get('confirmpassword')
  }
  constructor(private logindata:UserregisterService,private router:Router,private cart:CartService){}
  reset(){
    // console.log(this.user.value);
     this.logindata.resetPassword(this.user.value).subscribe({
       next:(res)=>{
         if(res.message==="password reset succesfully"){
          this.toast.success({
            detail:'Password Reset Successful',
            summary:'Your new password is successfully updated',
            position:'topCenter',
            duration:3000
          })
         this.router.navigate([`/home`])
         
        
         }
         
       },
       error:(error)=>{
        this.toast.error({
          detail:'Check entered details',
          summary:'You have entered invalid credentials',
          position:'topCenter',
          duration:3000
        })
         console.log('err in reset password',error)
       }
     })
 
 }


  
}
