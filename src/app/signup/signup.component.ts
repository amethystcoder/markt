import { Component } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { SignupandloginService } from '../signupandlogin.service';
import { ProductApiService } from '../product-api.service';
import { trigger,state,style,transition,animate } from '@angular/animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  public constructor(private signupservice:SignupandloginService,private productservice:ProductApiService){}

  signuplevel = 0;

  states = {
    user:"Seller",
    userplaceholder:"Shopname",
    category_add_cont:true,
    working_for_org_and_vehicle_type_add:false,
    shop_desc_and_dir:true,
    catgshow:false
  }

  file:string|File|Blob = ""

  category_list:Array<string> = []

  temp_cat_list:Array<string> = []

  users = { buyer:false,seller:true,delivery:false}

  profile_img_file = ""

  /* allcategories = [
  "fashion","food and drink","beauty and cosmetics","electrical","machinery","utensils","medical","automobiles",
  "gadgets","home appliances","agriculture","academics","office","furniture","plumbing","packaging","groceries",
  "drycleaning","repair","fitness and health","cinematography and photography","construction and building",
  "printing and press","IT and consultation","law and consultation","clothing and wear","toys and kids",
  "music and sound","creativity and art","sports and entertainment","d-i-y","metalwork and welding"] */

  allcategories:Array<string> = []

  signupform = new FormGroup({
    user_type: new FormControl(''),
    username : new FormControl(''),
    password : new FormControl(''),
    re_entered_password : new FormControl(''),
    email: new FormControl(''),
    phone_number: new FormControl(''),
    category: new FormControl(''),
    description: new FormControl(''),
    directions: new FormControl(''),
    city: new FormControl(''),
    street: new FormControl(''),
    country: new FormControl(''),
    house_number: new FormControl(''),
    vehicle_type: new FormControl(''),
    working_for_org: new FormControl(''),
    org_name: new FormControl(''),
    latitude: new FormControl(''),
    longtitude: new FormControl(''),
    postal_code: new FormControl(''),
		state: new FormControl(''),
    profile_image: new FormControl(''),
    payment_details:new FormGroup({
      payment_account_first_name: new FormControl(''),
      payment_account_last_name: new FormControl(''), 
      payment_account_number: new FormControl(''), 
      card_number: new FormControl(''), 
      card_expiry_date: new FormControl(''),
      cvc: new FormControl('')
    })
  })

  addcat(category:string){
    this.temp_cat_list.push(category)
  }

  public setuser(user:string){
    switch(user){
      case "Buyer":
        this.signupform.controls.user_type.setValue("buyer")
        this.states.category_add_cont = false
        this.states.shop_desc_and_dir = false
        this.states.user = "Buyer"
        this.states.userplaceholder = "Username"
        this.states.working_for_org_and_vehicle_type_add = false
        break
      case "Seller":
        this.signupform.controls.user_type.setValue("seller")
        this.states.category_add_cont = true
        this.states.shop_desc_and_dir = true
        this.states.user = "Seller"
        this.states.userplaceholder = "Shopname"
        this.states.working_for_org_and_vehicle_type_add = false 
        break
      case "Delivery":
        this.signupform.controls.user_type.setValue("delivery")
        this.states.category_add_cont = false
        this.states.shop_desc_and_dir = false
        this.states.user = "Delivery"
        this.states.userplaceholder = "Deliveryname"
        this.states.working_for_org_and_vehicle_type_add = true
        break
      default:
        break
    }
  }

  upload_profile_image(event:any){
    this.file = event.target.files[0]
    //this.signupform.controls.profile_image.setValue(file)
    //this.profile_img_file = URL.createObjectURL(this.file)
  }

  get buttonstate(){
    return "button-active"
  }

  public incsignuplevel(){
    this.signuplevel++
  }

  public redsignuplevel(){
    this.signuplevel--
  }

  isslidablelarge(num:number){
    return num === this.signuplevel
  }

  passwordsame(){
    let eqpasswords = this.signupform.controls.password.value == this.signupform.controls.re_entered_password.value
    let nonepmtypasswords = this.signupform.controls.password.value != "" && this.signupform.controls.re_entered_password.value != ""
    return eqpasswords && nonepmtypasswords
  }

  basicinfofilled(){
    return this.signupform.controls.email.value != "" || this.signupform.controls.phone_number.value != ""
  }

  adddatestroke(){
    let paymentdetails = this.signupform.controls.payment_details.controls
    if(paymentdetails.card_expiry_date.value?.length == 2){
      paymentdetails.card_expiry_date.setValue(paymentdetails.card_expiry_date.value+"/")
    }
  }

  setorgworker(value:string){
    switch(value){
      case "org":
        this.signupform.controls.working_for_org.setValue("org")
        break
      case "solo":
        this.signupform.controls.working_for_org.setValue("")
        break
      default:
        this.signupform.controls.working_for_org.setValue("")
        break
    }
  }

  /* addimage(){
    this.signupform.controls.profile_image.
  } */

  mergecatgs(){
    this.temp_cat_list.forEach((cat)=>{
      this.category_list.push(cat)
    })
    this.temp_cat_list = []
    this.states.catgshow = false
  }

  removecatgadd(){
    this.states.catgshow = false
    this.temp_cat_list = []
  }

  setcatgadd(){
    if(this.allcategories.length == 0){
      this.productservice.getcategorynames().subscribe((data)=>{
        this.allcategories = data
      })
    }
    this.states.catgshow = true
  }

  uselocation(){
    navigator.geolocation.getCurrentPosition((position)=>{
      this.signupform.controls.longtitude.setValue(position.coords.longitude.toString())
      this.signupform.controls.latitude.setValue(position.coords.latitude.toString())
      console.log(position.coords)
    })
  }

  removefromcategories(items:string){
    this.category_list.splice(this.category_list.indexOf(items),1)
  }

  displayvalues(){
    this.signupform.controls.category.setValue(this.category_list.toString())
    this.signupservice.createnewuser(this.signupform.value,this.file)
    .subscribe((data)=>{
      console.log(data)
    })
    //console.log(this.signupform.value)
  }

}
