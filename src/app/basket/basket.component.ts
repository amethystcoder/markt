import { Component, OnInit } from '@angular/core';
import { UserstateService } from '../userstate.service';
import { CartItem, ProductApiService } from '../product-api.service';
import { OrderApiService } from '../order-api.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit{

  constructor(private userstate:UserstateService,private productapi:ProductApiService,
    private order_api:OrderApiService) { } 

  ngOnInit(): void {
    this.userstate.user_type_sub.subscribe((usertype)=>{
      this.usertype = usertype
    })
    this.userstate.user_id_sub.subscribe((userid)=>{
      this.userid = userid
    })
    this.productapi.getbuyerbasketitems(this.userid,this.usertype)
    .subscribe((cartitems)=>{
      this.buyercart = cartitems
    })
  }

  userid = ""
  usertype = ""

  buyercart:CartItem[] = []

  removeproduct(cartitem:CartItem){
    this.productapi.removeitemfromcart(this.userid,cartitem.cart_id)
    .subscribe((result)=>{
      if(result)
        this.buyercart.splice(this.buyercart.indexOf(cartitem),1)
    })
  }

  checkout(){}
}
