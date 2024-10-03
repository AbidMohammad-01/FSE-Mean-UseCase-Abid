import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { UserregisterService } from '../services/userregister.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  cartItem:any
 id:string
  
constructor(private movie:MoviesService,private http:HttpClient,private user:UserregisterService){
 
}
  ngOnInit(): void {
    this.user.getCurrentUser().subscribe(
      (res)=>{
        this.id=res.id
      }
    )
    this.movie.showCart(this.id).subscribe(
      (res)=>{
        this.cartItem=res.details
        console.log("cart",this.cartItem);
        
      },
      (err)=>{
        console.log("Error Occured",err)
      }
    )
    
  }
}
