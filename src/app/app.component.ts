import { Component,DoCheck } from '@angular/core';
import { UserstateService } from './userstate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserstateService]
})
export class AppComponent implements DoCheck{
  title = 'markt';
  user_type = ''
  username = ''
  userid = ''

  constructor(private userstate:UserstateService){
    userstate.user_id_sub.subscribe((data)=>{
      this.userid = data
    })
    userstate.user_name_sub.subscribe((data)=>{
      this.username = data
    })
    userstate.user_type_sub.subscribe((data)=>{
      this.user_type = data
    })
  }

  ngDoCheck(): void {
    
  }


}
