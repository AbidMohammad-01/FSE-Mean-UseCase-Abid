import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Movie} from '../models/movie'
@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  usernameSignal = signal('')
 
  
  constructor(private http:HttpClient) { }
  //display the products on home page when we routed to home page (TOP SELLERS)
  displayProducts():Observable<any>{
    return this.http.get<Movie>('http://localhost:3000/api/v1.0/moviebooking/all')
  }

  displayMovieById(title:string):Observable<any>{
    
    return this.http.get<Movie>(`http://localhost:3000/api/v1.0/moviebooking/movies/search/${title}`)
  }
 
  bookMovieTickets(title:string,theatre:string,seats:Number,seatnum:[]):Observable<any>{
    let token=localStorage.getItem('token') 
    const headers = {'Authorization':`Bearer ${token}`}
    return this.http.post(`http://localhost:3000/api/v1.0/moviebooking/bookticket`,{title,theatre,seats,seatnum},{headers:new HttpHeaders(headers)})
  }
  showCart(id:string): Observable<any> {
    let token=localStorage.getItem('token') 
    console.log('ID',id);
    
    const headers = {'Authorization':`Bearer ${token}`}
    return this.http.get(`http://localhost:3000/api/v1.0/moviebooking/gettickets/${id}`,{headers:new HttpHeaders(headers)})
  }
  //display the products on home page when we routed to home page (all products)
  // allProducts():Observable<any>{
  //   return this.http.get<Movie>('http://localhost:3000/api/v1.0/moviebooking/')
  // }
}
