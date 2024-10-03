import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Mobile } from '../models/mobile';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrl: './comparison.component.css'
})
export class ComparisonComponent {
  compareMob:any|Mobile
 
  constructor(private cart:CartService,private http:HttpClient){
   
  }
  ngOnInit(): void {
    this.cart.showCompare().subscribe(
      (res)=>{
        this.compareMob=res.payload.compareMobiles
        
      },
      (err)=>{
        console.log("Error Occured",err)
      }
    )
  }
  removeItem(index:number):void{
    let obj = {index:index}
  
    this.cart.deleteCompare(obj).subscribe(
      (res)=>{
        this.compareMob.splice(index,1)
        this.cart.updateCart(this.compareMob)
        
      },
      (err)=>{
        console.log("Error in Deleting...",err)
      }
    
    )
}
}
