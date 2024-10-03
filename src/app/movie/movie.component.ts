import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Movie } from '../models/movie';
import { CartService } from '../services/cart.service';
import { MoviesService } from '../services/movies.service';
import { UserregisterService } from '../services/userregister.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {
  constructor(private movie:MoviesService,private router:Router,private cart:CartService,private http:HttpClient,private activate:ActivatedRoute){
   
  }
  selectedProduct:Movie
ticketQuantity:number
ticket:any
price:Number
// title:String
// theatre:String
selectedSeats:[]

    ngOnInit(): void {
      let title=this.activate.snapshot.paramMap.get('title'); //id of selected mobile
      //displaying the selected product using method in service
      this.movie.displayMovieById(title).subscribe(
        (s)=>{
          this.selectedProduct=s.payload[0];
    
        },
      (error)=>{console.log("Error in displaying",error)
      }    
      )
    }
      
    bookTickets(theatre:string,title:string){
      this.movie.bookMovieTickets(theatre,title,this.ticketQuantity,this.selectedSeats).subscribe(
        (res)=>{
          this.ticket=res.payload
          
         
        },
        (error)=>{console.error();
        }
      )

    }
    calculatePrice(seats:any,price:any): number {
      
      return parseInt(seats) * parseInt(price);
    }
  
}
