import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Category{
  name: string,
      tags:[
          {
            name:string,
          descs:Array<string>
        },
          ]
}

export interface Product{
  product_id:string, 
  product_name:string,
  product_type:string,
  product_price:number, 
  product_description:string,
  product_category:string,
  tags:Array<string>,
  product_images: Array<string>,
  product_quantity:number, 
  estimated_size:number,
  seller_id:number,
  desc_under:string
}

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor(private http:HttpClient) { }

  getcategorynames(){
    return this.http.get<Array<string>>("http://localhost/markt_php/categories_add.php?type=main_names")
    .pipe(
      retry(1)
    )
  }

  getcategories(){
    return this.http.get<Category>("http://localhost/markt_php/categories_add.php?type=all")
    .pipe(
      retry(1)
    )
  }

  getsellerproducts(seller:string){
    let produrl = `http://localhost/markt_php/get_products.php?type=seller_products&seller_id=${seller}`
    return this.http.get<Array<Product>>(produrl)
    .pipe(
      retry(1)
      //catchError()
    )
  }
}
