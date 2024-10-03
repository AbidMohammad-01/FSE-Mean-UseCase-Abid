import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Mobile } from '../models/mobile'; 
import { UserregisterService } from '../services/userregister.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
 
  cartItem:Mobile|any
 id:string
  
constructor(private cart:CartService,private http:HttpClient,private user:UserregisterService){
 
}
ngOnInit(): void {
  this.cart.showCart().subscribe(
    (res)=>{
      this.cartItem=res.payload.cartItem
      this.cart.cartNum.set(this.cartItem.length)
    },
    (err)=>{
      console.log("Error Occured",err)
    }
  )
  this.user.getCurrentUser().subscribe(
    (res)=>{
      this.id=res.id
    }
  )
}

calculateSubtotal(): number {
  // Calculate subtotal based on the quantity and price of each item
 let subTotal= this.cartItem.reduce((subtotal, item) => subtotal + (parseFloat(item.price.replace(/[₹,]/g,''))*item.quantity),0);
 console.log(subTotal)
  return subTotal
}
removeItem(index:number):void{
  let obj = {index:index}


  this.cart.deleteCart(obj).subscribe(
    (res)=>{
      this.cartItem.splice(index,1)
      this.cart.updateCart(this.cartItem)
      this.cart.cartNum.set(this.cartItem.length)
    },
    (err)=>{
      console.log("Error in Deleting...",err)
    }
  
  )

}
incrementQuantity(index: number): void {
  this.cart.incrementCartItemQuantity(this.id, index).subscribe(
      (res) => {
        this.cartItem[index].quantity++
        this.cart.updateCart(this.cartItem)
      },
      error => {
        console.error('Error incrementing item quantity:', error);
        // Handle error
      }
    );
}
decrementQuantity(index: number): void {
  this.cart.decrementCartItemQuantity(this.id, index).subscribe(
      () => {
       
        if(this.cartItem[index].quantity>1){
        this.cartItem[index].quantity--
        this.cart.updateCart(this.cartItem)
        }
        if(this.cartItem[index].quantity==0){
          this.removeItem(index)
        }
      },
      error => {
        console.error('Error decrementing item quantity:', error);
       
      }
    );
}
}

