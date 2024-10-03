import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Mobile } from '../models/mobile';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  //Cart item BSub
  private cartItemsSubject: BehaviorSubject<Mobile[]> = new BehaviorSubject<Mobile[]>([]);
  cartItems$: Observable<Mobile[]> = this.cartItemsSubject.asObservable();

  private compareSubject: BehaviorSubject<Mobile[]> = new BehaviorSubject<Mobile[]>([]);
  compare$: Observable<Mobile[]> = this.compareSubject.asObservable();

  usernameSignal = signal('')
  cartNum = signal(0)
  
  constructor(private http: HttpClient) { }
  addToCart(product: Mobile): Observable<any> {
    
    return this.http.put(`http://fonekart-env.eba-3sdurepp.ap-south-1.elasticbeanstalk.com/user-api/user/${this.usernameSignal()}`, product)
  }
  compareMobile(product: Mobile): Observable<any> {
    return this.http.put(`http://fonekart-env.eba-3sdurepp.ap-south-1.elasticbeanstalk.com/user-api/users/${this.usernameSignal()}`, product)
  }
  
  showCart(): Observable<any> {
    return this.http.get<Mobile>(`http://fonekart-env.eba-3sdurepp.ap-south-1.elasticbeanstalk.com/user-api/user/${this.usernameSignal()}`)
  }
  showCompare(): Observable<any> {
    return this.http.get<Mobile>(`http://fonekart-env.eba-3sdurepp.ap-south-1.elasticbeanstalk.com/user-api/users/${this.usernameSignal()}`)
  }
  updateCart(updateCartItems: Mobile[]): void {
    this.compareSubject.next(updateCartItems)
  }
  updateCompare(updateCompare: Mobile[]): void {
    this.cartItemsSubject.next(updateCompare)
  }


  deleteCart(index): Observable<any> {
    console.log(index)
    return this.http.put(`http://fonekart-env.eba-3sdurepp.ap-south-1.elasticbeanstalk.com/user-api/delete/${this.usernameSignal()}`, index)
  }
  deleteCompare(index): Observable<any> {
    console.log(index)
    return this.http.put(`http://fonekart-env.eba-3sdurepp.ap-south-1.elasticbeanstalk.com/user-api/deleted/${this.usernameSignal()}`, index)
  }
  incrementCartItemQuantity(username: string, index: number): Observable<any> {
    return this.http.put(`http://fonekart-env.eba-3sdurepp.ap-south-1.elasticbeanstalk.com/user-api/${username}/${index}/increment`,{});
  }
 
  decrementCartItemQuantity(username: string, index: number): Observable<any> {
    return this.http.put(`http://fonekart-env.eba-3sdurepp.ap-south-1.elasticbeanstalk.com/user-api/${username}/${index}/decrement`,{});
  }
}