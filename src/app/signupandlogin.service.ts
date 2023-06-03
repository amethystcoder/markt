import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface User{
  user_type: string,
    username : string,
    password : string,
    re_entered_password : string,
    email: string,
    phone_number: string,
    category: string,
    description: string,
    directions: string,
    city: string,
    street: string,
    country: string,
    house_number: string,
    vehicle_type: string,
    working_for_org: string,
    org_name: string,
    latitude: string,
    longtitude: string,
    postal_code: string,
		state: string,
    profile_image: File,
    payment_details:{
      payment_account_first_name: string,
      payment_account_last_name: string, 
      payment_account_number: string, 
      card_number: string, 
      card_expiry_date: string,
      cvc: string
    }
}

@Injectable({
  providedIn: 'root'
})
export class SignupandloginService {

  constructor(private http:HttpClient) { }
  
  createnewuser(user:any,file:Blob|string){
    let formdata = new FormData()
    formdata.append("profile_image",file)
    formdata.append("user_type",user.user_type)
    formdata.append("password",user.password)
    formdata.append("city",user.city)
    formdata.append("category",user.category)
    formdata.append("description",user.description)
    formdata.append("directions",user.directions)
    formdata.append("country",user.country)
    formdata.append("email",user.email)
    formdata.append("house_number",user.house_number)
    formdata.append("latitude",user.latitude)
    formdata.append("longtitude",user.longtitude)
    formdata.append("org_name",user.org_name)
    formdata.append("payment_details",user.payment_details)
    formdata.append("phone_number",user.phone_number)
    formdata.append("postal_code",user.postal_code)
    formdata.append("state",user.state)
    formdata.append("street",user.street)
    switch(user.user_type){
      case "buyer":
        formdata.append("username",user.username)
        break
      case "seller":
        formdata.append("shopname",user.username)
        break
      case "delivery":
        formdata.append("deliveryname",user.username)
        break
    }
    formdata.append("vehicle_type",user.vehicle_type)
    formdata.append("working_for_org",user.working_for_org)
    console.log(formdata)
    return this.http.post("http://localhost/markt_php/signup.php",formdata).pipe(
      retry(2)
    )
  }
}
