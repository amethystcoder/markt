import { Component, OnInit } from '@angular/core';
import { OrderApiService, Orders, UnacceptedOrders } from '../order-api.service';
import { ProductApiService } from '../product-api.service';
import { UserstateService } from '../userstate.service';

@Component({
  selector: 'app-orders-seller',
  templateUrl: './orders-seller.component.html',
  styleUrls: ['./orders-seller.component.css']
})
export class OrdersSellerComponent implements OnInit{

  constructor(private userstate:UserstateService,private order_api:OrderApiService){ }

  ngOnInit(): void {
    this.userstate.user_type_sub.subscribe((usertype)=>{
      this.usertype = usertype
    })
    this.userstate.user_id_sub.subscribe((userid)=>{
      this.userid = userid
    })
    this.order_api.getacceptedorders(this.userid)
    .subscribe((orders)=>{
      this.acceptedorders = orders
    })
    this.order_api.getpendingorders(this.userid)
    .subscribe((orders)=>{
      this.pendingorders = orders
    })
  }

  userid = ""
  usertype = ""

  orderviewtype = "pending"

  pendingorders:UnacceptedOrders[] = []
  acceptedorders:Orders[] = []

  settype(type:string){
    this.orderviewtype = type
  }

  acceptorder(orderid:string){
    this.order_api.acceptorder(orderid,this.userid,'seller')
    .subscribe((data)=>{
      console.log(data)
    })
  }

  declineorder(orderid:string){
    this.order_api.declineorder(orderid,this.userid,'seller')
    .subscribe((data)=>{
      console.log(data)
    })
  }
}
