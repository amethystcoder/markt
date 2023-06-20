import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface UnacceptedOrders{
  order_id:string,
  seller_id:string,
  product_quantity:number,
  order_date:string,
  product_name:string,
  product_price:number,
  product_id:string,
  product_image:string,
  buyer_id:string,
  buyer_name:string
}

export interface Orders{
  order_id:string,
  seller_id:string,
  product_quantity:number,
  order_date:string,
  product_name:string,
  product_price:number,
  product_id:string,
  product_image:string,
  buyer_id:string,
  buyer_name:string
}

export interface DeliveryOrders{
  order_id:string,
  seller_id:string,
  product_quantity:number,
  accepted:boolean,
  received_by_delivery:boolean,
  delivered:boolean,
  order_date:string,
  product_name:string,
  product_price:number,
  product_id:string,
  product_image:string,
  product_size:number,
  buyer_id:string,
  buyer_name:string,
  seller_name:string
}

export interface BuyerOrders{
  order_id:string,
  seller_id:string,
  seller_shopname:string,
  product_quantity:number,
  order_date:string,
  accepted:boolean,
  declined:boolean,
  delivery_name:string,
  delivery_id:string,
  product_name:string,
  product_price:number,
  product_id:string,
  product_image:string,
  buyer_id:string,
  buyer_name:string
}

@Injectable({
  providedIn: 'root'
})
export class OrderApiService {

  constructor(private http:HttpClient) { }

  getpendingorders(sellerid:string){
    return this.http.get<Array<UnacceptedOrders>>(
      `http://localhost/markt_php/get_non_accepted_orders.php?user_type=seller&user_id=${sellerid}`
      )
    .pipe(
      retry(2)
    )
  }

  getacceptedorders(sellerid:string){
    return this.http.get<Array<Orders>>(
      `http://localhost/markt_php/get_accepted_orders.php?user_type=seller&user_id=${sellerid}`
      )
    .pipe(
      retry(2)
    )
  }

  acceptorder(orderid:string,user_id:string,user_type:string){
    let formdata = new FormData()
    formdata.append('order_id',orderid)
    formdata.append('user_id',user_id)
    formdata.append('user_type',user_type)
    return this.http.post(
      "http://localhost/markt_php/accept_order.php",
      formdata
    ).pipe(
      retry(2)
    )
  }

  //WORK ON THIS
  //WORK ON THIS
  //WORK ON THIS
  //WORK ON THIS
  //WORK ON THIS
  declineorder(orderid:string,user_id:string,user_type:string){
    let formdata = new FormData()
    formdata.append('order_id',orderid)
    formdata.append('user_id',user_id)
    formdata.append('user_type',user_type)
    return this.http.post(
      "http://localhost/markt_php/",
      formdata
    ).pipe(
      retry(2)
    )
  }

  getbuyerorders(buyer_id:string){
    return this.http.get<BuyerOrders[]>(
      `http://localhost/markt_php/get_buyer_orders.php?user_type=buyer&user_id=${buyer_id}`
      )
    .pipe(
      retry(2)
    )
  }

  getclosedeliveryorders(deliveryid:string,longtitude:number|undefined = undefined,latitude:number|undefined = undefined){
    if(longtitude && latitude)
    return this.http.get<DeliveryOrders[]>(
      `http://localhost/markt_php/get_delivery_orders.php?
        user_type=delivery&user_id=${deliveryid}
        &longtitude=${longtitude}&latitude=${latitude}`
      )
    .pipe(
      retry(2)
    )

    return this.http.get<DeliveryOrders[]>(
      `http://localhost/markt_php/get_delivery_orders.php?user_type=delivery&user_id=${deliveryid}`
      )
    .pipe(
      retry(2)
    )
  }

  handleorder(deliveryid:string,orderid:string){
    let handlerdata = new FormData()
    handlerdata.append("user_id",deliveryid)
    handlerdata.append("user_type","delivery")
    handlerdata.append("order_id",orderid)
    return this.http.post<boolean>(
      "http://localhost/markt_php/handle_order.php",
      handlerdata
    ).pipe(
      retry(2)
    )
  }

  getdeliverypendingdeliveries(deliveryid:string){
    return this.http.get<DeliveryOrders[]>(
      `http://localhost/markt_php/get_pending_deliveries.php?user_type=delivery&user_id=${deliveryid}`
      )
    .pipe(
      retry(2)
    )
  }
}