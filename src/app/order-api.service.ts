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

  acceptorder(orderid:string,user_id:string,user_type:string){
    let formdata = new FormData()
    formdata.append('orderid',orderid)
    formdata.append('user_id',user_id)
    formdata.append('user_type',user_type)
    return this.http.post(
      "http://localhost/markt_php/accept_order.php",
      formdata
    ).pipe(
      retry(2)
    )
  }

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

}