import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Mobile } from '../models/mobile';
import { Movie } from '../models/movie';
import { User } from '../models/usertype';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) {
   
   
   }
  addMovie(data:Movie):Observable<any>{
    let token=localStorage.getItem('token') 
   const headers = {'Authorization':`Bearer ${token}`}
    return this.http.post(`http://localhost:3000/api/v1.0/moviebooking/add`,data,{headers:new HttpHeaders(headers)})
  }
  updateTicketStatus(title:string,ticket:number): Observable<any> {
    console.log('Ticket',ticket);
    
   let url = "http://localhost:3000/api/v1.0/moviebooking"
   let token=localStorage.getItem('token') 
   const headers = {'Authorization':`Bearer ${token}`}
    return this.http.post(`${url}/update/${title}`,{ticket},{headers:new HttpHeaders(headers)})
  }
  getMovies(): Observable<any> {
    return this.http.get<Movie>(`http://localhost:3000/api/v1.0/moviebooking/all`)
  }
  deleteMovie(title:string){
    let token=localStorage.getItem('token') 
    const headers = {'Authorization':`Bearer ${token}`}
    return this.http.delete(`http://localhost:3000/api/v1.0/moviebooking/delete/${title}`,{headers:new HttpHeaders(headers)})
  }
}

