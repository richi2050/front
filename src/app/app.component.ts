import { Component, OnInit } from '@angular/core';
import { User } from './models/User';
import { UserService } from './services/User.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [
    UserService
  ]
})
export class AppComponent implements OnInit{
  title = 'musify';
  public user: User;
  public user_register: User;
  public identity;
  public token;
  public errorMessage;
  public alertRegister;

  constructor(
    private userservice: UserService
  ){
    this.user = new User('','','','','','ROLE_USER','');
    this.user_register = new User('','','','','','ROLE_USER','');
  }
  ngOnInit() {
    this.identity = this.userservice.getIdentity();
    this.token = this.userservice.getToken();

  }

  onSubmit() {
    this.userservice.signup(this.user).subscribe(
      (response) => {
        const identity = response;
        this.identity = identity;
        if (!this.identity._id) {
            alert("el usuario no esta correcto identificate");
          } else{
            //Crear Elemento dle LocalStorage para tener usuario en sesión
            localStorage.setItem('identity', JSON.stringify(identity));

            // conseguir el token para enviarselo en cada peticion http
            this.userservice.signup(this.user, true).subscribe((response) => {
              const token = response;
              this.token = token;
              if (this.token.length <= 0) {
                alert("El Token no se a generado correctamente");
              } else {
                localStorage.setItem('token', JSON.stringify(token));
                this.user = new User('','','','','','ROLE_USER','');

              }
            }, (error) => {
              const errorMessage = <any>error;
              if (errorMessage != null) {
                this.errorMessage = error.error.message;
              }
            });
          }
      }, (error) =>{
        const errorMessage = <any>error;
        if (errorMessage != null) {
          this.errorMessage = error.error.message;
        }
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('identity');
    localStorage.clear();
    this.identity = null;
    this.token = null;
  }

  registerUser() {
    this.userservice.register(this.user_register).subscribe(
      (response) => {
        let user = response;

        //this.userRegister = JSON.stringify(user);
        //console.log(user);
        if(!user){
          this.alertRegister = 'Error al Registrar';
        }else{
          this.alertRegister = 'El registro se a realizado Correctamente';
        }
      }, (error) =>{
        const errorMessage = <any>error;
        if (errorMessage != null) {
          this.alertRegister = error.error.message;
        }
      }
    );
  }

}
