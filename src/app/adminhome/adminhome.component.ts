import { Component ,inject,OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';  
import { User } from '../models/usertype';
import { Movie } from '../models/movie';
import { AdminService } from '../services/admin.service';
@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.css'
})
export class AdminhomeComponent implements OnInit {
  users:any|User
  movie = inject(AdminService);
  fb:FormBuilder=inject(FormBuilder);
  routerObj = inject(Router)
  bookedTickets:number
  movies:Movie|any
  toast=inject(NgToastService)
name:string
  movieCounts:any
  selectedMovieIndex: number = -1;


  moviedetails=this.fb.group({
    title:(['']),
    theatre:(['']),
    totaltickets:([0]),
    availabletickets:([0]),
    price:([0]),
    img:([''])
  })
  ngOnInit(): void {
 
    this.movie.getMovies().subscribe({
     next:(res)=>{
      this.movies=res.payload
      this.movieCounts = new Array(this.movies.length).fill(0);
     }
     
     
    })
       
    
  }
    
  selectMovie(index: number) {
    this.selectedMovieIndex = index;
  }
  // enableCountInput(index: number,bookedTickets:number) {
  //   if (bookedTickets > 0) {
  //     this.selectedMovieIndex = index;
  //   } else {
  //     this.selectedMovieIndex = -1;
  //   }
  // }
  send(){
  let {title,theatre,totaltickets,availabletickets,price,img} = this.moviedetails.value;
    let newmovie = new Movie(title,img,theatre,totaltickets,availabletickets,price)
    console.log("newmovie ",newmovie);
    this.movie.addMovie(newmovie).subscribe({
      next:(res)=>{
        
        this.toast.success({
          detail:'Movie Added',
          summary:'Movie added to Database.',
          position:'topCenter',
          duration:3000
        })
      },
      error:(error)=>{
        console.log("Error in user Creation",error)
      }
  })
}

deleteMovie(name:string,index:number):void{

  this.movie.deleteMovie(name).subscribe(
    (res)=>{ 
     
      this.movies.splice(index,1)
      this.toast.success({
        detail:'Movie Deleted',
        summary:'Movie Deleted from Database.',
        position:'topCenter',
        duration:3000
      })
    },
    (err)=>{
      console.log("Error in Deleting...",err)
    }
  
  )
}

getTitle(title:string){
this.name=title
}

updateStatus():void{
console.log('Tickets-103',this.bookedTickets);

  this.movie.updateTicketStatus(this.name,this.bookedTickets).subscribe(
    (res)=>{ 
      if(res.message==='Status Updated')
      this.toast.success({
        detail:'Status Updated',
        summary:'Staus of movie Updated.',
        position:'topCenter',
        duration:3000
      })
    },
    (err)=>{
      console.log("Error in Updating...",err)
    }
  
  )
}
}

