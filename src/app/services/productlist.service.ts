import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mobile } from '../models/mobile';
@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  constructor(private http:HttpClient) { }
  //display the products on home page when we routed to home page (TOP SELLERS)
  displayProducts():Observable<any>{
    return this.http.get<Mobile>('http://fonekart-env.eba-3sdurepp.ap-south-1.elasticbeanstalk.com/prod-api/products')
  }
  //display the products on home page when we routed to home page (all products)
  allProducts():Observable<any>{
    return this.http.get<Mobile>('http://fonekart-env.eba-3sdurepp.ap-south-1.elasticbeanstalk.com/prod-api/allproducts')
  }
 
  //display the products on home page when we routed to home page (brand based product)

  getProductById(id):Observable<any>{
    return this.http.get(`http://fonekart-env.eba-3sdurepp.ap-south-1.elasticbeanstalk.com/prod-api/products/${id}`)
  }
 


}

