import { Component } from '@angular/core';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'musify';
  public user: User;
  public identity;
  public token;

  constructor(){
    this.user = new User('','','','','','ROLE_USER','');
  }


}
