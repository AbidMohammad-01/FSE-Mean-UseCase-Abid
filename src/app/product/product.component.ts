import { Component ,OnInit} from '@angular/core';
import { ProductListService } from '../services/productlist.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Mobile } from '../models/mobile';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
selectedProduct:Mobile;  
  //injections of required services etc
constructor(private product:ProductListService,private activate:ActivatedRoute,private router:Router,private cart:CartService){

}
//rendering the content of to the page when component is loaded
ngOnInit(): void {
  let id=this.activate.snapshot.paramMap.get('id'); //id of selected mobile
  //displaying the selected product using method in service
  this.product.getProductById(id).subscribe(
    (s)=>{
      this.selectedProduct=s.payload;

    },
  (error)=>{console.log("Error in displaying",error)
  }    
  )
}
//Add to Cart 
addToCart(product:Mobile):void{
  //assigning selected product to cart using method in service
  this.cart.addToCart(product).subscribe(
    (res)=>{
      console.log(res)

    },
    (err)=>{
      console.log("Error Occured",err)
    }
  )
}
}
