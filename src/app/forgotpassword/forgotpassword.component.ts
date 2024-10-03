import { Component, inject } from '@angular/core';
import { FormBuilder,Validators} from '@angular/forms';
import { UserregisterService } from '../services/userregister.service'; 
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {
  toast = inject(NgToastService)
  fb = inject(FormBuilder)
    //Form for the user credentials with validators using Form Builder
  user=this.fb.group({
    id:(['',Validators.required]),
 
  })
 
  //getters
  get id() {
    return this.user.get('id')
  }
  constructor(private logindata:UserregisterService,private router:Router,private cart:CartService){}
  forgot(){
    // console.log(this.user.value);
     this.logindata.forgotPassword(this.user.value).subscribe({
       next:(res)=>{
         if(res.message==="reset password email sent succesfully"){
         this.router.navigate([`/reset`])
         
        
         }
         
       },
       error:(error)=>{
        this.toast.success({
          detail:'Check Id entered',
          summary:'You have entered invalid ID',
          position:'topCenter',
          duration:3000
        })
         console.log('err in reset password',error)
       }
     })
 
 }


}
