import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

import { Mobile } from '../models/mobile'; 
import { ProductListService } from '../services/productlist.service';
import { UserregisterService } from '../services/userregister.service';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/movie';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',

})
export class HomeComponent implements OnInit{
  movies:Movie|any //top seller mobiles
  // mobiles:Mobile|any //all available mobiles
  brand:string[]=["apple",'samsung',"oppo","redmi","realme"] //array of brands
  cat:Mobile|any //brand wise mobiles
  currentUser:string //current user name
  searchedProduct:string='' //search value in top sellers
  searchedMobile:string='' //search value in all mobiles
  searchData:any // search result in top sellers
  allData:any // search result in all mobiles
  constructor(private movieList:MoviesService,private router:Router,private cart:CartService,private http:HttpClient,private userService:UserregisterService){
   
  }

  //Display Top Sellers and All Mobiles when component is loaded
  ngOnInit(): void {
    //Top Sellers
    this.movieList.displayProducts().subscribe({
      next:(res)=>{
        this.movies=res.payload;
        this.searchData=res.payload;
      
        
      }
      
    })
    //Get username of Current User
this.userService.getCurrentUser().subscribe({
  next:(res)=>{
    this.currentUser=res.id
  }
})
//All Products

}
//View Item by ID
bookTicket(title:string){
  
  this.router.navigate([`movie/${title}`])
}
//Add to Cart
// addToCart(product:Mobile):void{
//   this.cart.addToCart(product).subscribe(
//     (res)=>{
      
//       console.log(res)

//     },
//     (err)=>{
//       console.log("Error Occured",err)
//     }
//   )
// }
//Add to Comparison
// Compare(product:Mobile):void{
//  this.cart.compareMobile(product).subscribe(
//   (res)=>{
//     console.log(res)
//   },
//   (err)=>{
//     console.log("Error Occured",err)
//   }
//  )
// }
  //display the products on home page when we routed to home page (brand based product)

// Category(mobile:string){
//   for(let i=0;i<=this.brand.length;i++){
//     if(mobile===this.brand[i]){
//       let api=`http://localhost:5000/mob-api/mobs/${mobile}` //passing name of the brand as req.params
//       this.http.get(api).subscribe(
//         (res)=>{
//           this.cat=res['payload'][0][`${mobile}`]       
          
//         },
//         (err)=>{
//           console.log('Error in displaying mobiles')
//         }
//       )
//     }
//   }
// }
//Search Function for Top Sellers
searchProduct(){
 this.searchData= this.movies.filter(
    (p)=>{
      console.log('search',p);
      
      return p.title.toLowerCase().includes(this.searchedProduct.toLowerCase())
    }
  )
}
// //Search Function for ALL Mobiles
// searchMobile(){
//   this.allData= this.mobiles.filter(
//      (q)=>{
//        return q.mobile.toLowerCase().includes(this.searchedMobile.toLowerCase())
//      }
//    )
//  }
// }

}