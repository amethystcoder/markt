import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Buyer{
  username:string, 
  email:string, 
  profile_image:string, 
  phone_number:string, 
  house_number:number, 
  street:string, 
  city:string, 
  state:string, 
  country:string, 
  postal_code:number,
  payment:Payment[]
}

export interface Seller{
  shopname:string, 
  email:string, 
  profile_image:string, 
  phone_number:string, 
  description:string, 
  category:string[], 
  rating:number, 
  directions:string,
  house_number:number, 
  street:string, 
  city:string, 
  state:string, 
  country:string, 
  postal_code:number,
  payment:Payment[]
}

export interface Delivery{
  deliveryname:string, 
  email:string, 
  profile_image:string, 
  phone_number:string, 
  vehicle_type:string, 
  working_for_org:boolean,
  org_name:string,
  house_number:number, 
  street:string, 
  city:string, 
  state:string, 
  country:string, 
  postal_code:number,
  payment:Payment[]
}

export interface Payment{
  payment_account_first_name:string, 
  payment_account_last_name:string, 
  payment_account_number:number, 
  card_number:string, 
  card_expiry_date:string, 
  cvc:number
}

export interface Favorite{
  favorite_type:string,
  name:string,
  profile_image:string, 
  favorite_id:string
}

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(private http:HttpClient) { }

  getbuyerfavorites(buyerid:string,usertype:string){
    return this.http.get<Favorite[]>(
      `http://localhost/markt_php/get_favorites.php?user_type=${usertype}&user_id=${buyerid}`)
      .pipe(
        retry(2)
      )
  }

  addasfavorite(buyerid:string,favoritetype:string,favoriteid:string){
    let favoriteformdata = new FormData()
    favoriteformdata.append("user_id",buyerid)
    favoriteformdata.append("favorite_type",favoritetype)
    favoriteformdata.append("favorite_id",favoriteid)
    favoriteformdata.append("control_type","add")
    return this.http.post("http://localhost/markt_php/control_favorites.php",favoriteformdata)
    .pipe(
      retry(2)
    )
  }

  removefavorite(buyerid:string,favoritetype:string,favoriteid:string){
    let favoriteformdata = new FormData()
    favoriteformdata.append("user_id",buyerid)
    favoriteformdata.append("favorite_type",favoritetype)
    favoriteformdata.append("favorite_id",favoriteid)
    favoriteformdata.append("control_type","remove")
    return this.http.post("http://localhost/markt_php/control_favorites.php",favoriteformdata)
    .pipe(
      retry(2)
    )
  }

  getbuyerdata(buyerid:string){
    return this.http.get<Buyer>(
      `http://localhost/markt_php/get_user_data.php?user_id=${buyerid}&user_type=buyer`)
      .pipe(
        retry(2)
      )
  }

  getsellerdata(sellerid:string){
    return this.http.get<Seller>(
      `http://localhost/markt_php/get_user_data.php?user_id=${sellerid}&user_type=seller`)
      .pipe(
        retry(2)
      )
  }

  getdeliverydata(deliveryid:string){
    return this.http.get<Delivery>(
      `http://localhost/markt_php/get_user_data.php?user_id=${deliveryid}&user_type=delivery`)
    .pipe(
      retry(2)
    )
  }

  updatebuyerdata(buyerid:string,buyer:Buyer|undefined){
    let buyerdata = new FormData()
    buyerdata.append("user_id",buyerid)
    buyerdata.append("user_type","buyer")
    buyerdata.append("buyer_data",JSON.stringify(buyer))
    return this.http.post("http://localhost/markt_php/update_user_data.php",buyerdata)
    .pipe(
      retry(2)
    )
  }

  updatesellerdata(sellerid:string,seller:Seller|undefined){
    let sellerdata = new FormData()
    sellerdata.append("user_id",sellerid)
    sellerdata.append("user_type","seller")
    sellerdata.append("seller_data",JSON.stringify(seller))
    return this.http.post("http://localhost/markt_php/update_user_data.php",sellerdata)
    .pipe(
      retry(2)
    )
  }

  updatedeliverydata(deliveryid:string,delivery:Delivery|undefined){
    let deliverydata = new FormData()
    deliverydata.append("user_id",deliveryid)
    deliverydata.append("user_type","delivery")
    deliverydata.append("delivery_data",JSON.stringify(delivery))
    return this.http.post("http://localhost/markt_php/update_user_data.php",deliverydata)
    .pipe(
      retry(2)
    )
  }
  

}
