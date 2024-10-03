import { Component, effect, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { UserregisterService } from '../services/userregister.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  userService=inject(UserregisterService)
  cartService=inject(CartService)
  user:string
  status:boolean
  router=inject(Router)
  count:number
  constructor(){
    effect(()=>{this.count=this.cartService.cartNum()})
  }
  ngOnInit(): void {
    this.userService.getLoginStatus().subscribe({
      next:(userLoginStatus)=>this.status=userLoginStatus
    })
    this.userService.getCurrentUser().subscribe({
      next:(loggedInUser)=>this.user=loggedInUser.id
     
    })
    
    
  }
  
userProfile(){
  this.userService.getCurrentUser().subscribe({
    next:(details)=>{this.user=details.id
      
    this.router.navigate([`/userprofile/${this.user}`])
      
     
    }
    

  })
}
  }




