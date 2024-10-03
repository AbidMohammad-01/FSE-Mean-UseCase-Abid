import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';  

export const authGuard: CanActivateFn = (route, state) => {
  let token=localStorage.getItem('token') //getting the token value from local storage
  console.log(token)
  let toast=inject(NgToastService) 
  const router=inject(Router)
  if(token===null){
    //if token is null then user is not logged in 
  toast.success({
    detail:'Login Needed',
    summary:'Login to access the route.',
    position:'topCenter',
    duration:3000
  }) //Toast to notify the user to login
    router.navigate(['login']) //navigating to login page
    return false;
  }
  else{
    //get token and allow access to view the route
  return true;
  }
};
