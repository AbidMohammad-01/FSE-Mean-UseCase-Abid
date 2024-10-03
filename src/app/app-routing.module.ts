import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { authGuard } from './auth.guard';

import { CartComponent } from './cart/cart.component';
import { ComparisonComponent } from './comparison/comparison.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MovieComponent } from './movie/movie.component';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProductComponent } from './product/product.component';
import {RegisterComponent} from './register/register.component'
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { TicketComponent } from './ticket/ticket.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

const routes: Routes = [
  
  {
    path:'home',
    component:HomeComponent,
    
  },
  {
    path:'register',
    component:RegisterComponent
    
  },
  {
    path:'forgot',
    component:ForgotpasswordComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'reset',
    component:ResetpasswordComponent
  },
  {
    path:'cart',
    component:CartComponent,
    canActivate:[authGuard]
  },
  {
    path:'ticket',
    component:TicketComponent,
    canActivate:[authGuard]
  },
  {
    path:'compare',
    component:ComparisonComponent,
    canActivate:[authGuard]

  },
  {
    path:'admin',
    component:AdminhomeComponent,
    canActivate:[authGuard]
  },
  {
    path:'userprofile/:username',
    component:UserprofileComponent
  },
  {
    path:'movie/:title',
    component:MovieComponent
  },
 
  {
    path:'userprofile',
    component:UserprofileComponent
  },
 // {path:'**',component:PagenotfoundComponent},
  {path:'',redirectTo:'home',pathMatch:'full'},
  { path: '**', pathMatch: 'full',  
  component: PagenotfoundComponent }, 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
