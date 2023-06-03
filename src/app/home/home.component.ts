import { Component } from '@angular/core';
import { Product, ProductApiService } from '../product-api.service';
import { OrderApiService, UnacceptedOrders } from '../order-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private productapi:ProductApiService,private orderapi:OrderApiService){
    this.productapi.getsellerproducts(this.seller)
    .subscribe((data)=>{
      this.sellerproductlist = data
    })
    this.orderapi.getpendingorders(this.seller)
    .subscribe((data)=>{
      this.sellerpendingorderlist = data
    })
  }

  //seller = "seller-64428fb75dc101.47953919"
  seller = "seller-6443d71e161ab9.44698531"

  sellerproductlist:Array<Product> = []
  sellerpendingorderlist:Array<UnacceptedOrders> = []

  acceptorder(orderid:string){
    this.orderapi.acceptorder(orderid,this.seller,'seller')
    .subscribe((data)=>{
      console.log(data)
    })
  }

  declineorder(orderid:string){
    this.orderapi.declineorder(orderid,this.seller,'seller')
    .subscribe((data)=>{
      console.log(data)
    })
  }
}
