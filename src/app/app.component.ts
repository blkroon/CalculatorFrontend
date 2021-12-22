import { Component } from '@angular/core';
import {AppService} from "./app.service";

@Component({
  selector: 'app-root',
  providers: [AppService],
  template: `<div class="container" >
    With Google: <a href="http://localhost:8089/api/oauth2/authorization/google">click here</a>
    With GitHub: <a href="http://localhost:8089/api/oauth2/authorization/github">click here</a>
    With ADFS: <a href="http://localhost:8089/api/oauth2/authorization/adfs">click here</a>
    Logout: <a href="http://localhost:8089/api/logout">click here</a>
<!--    <button class="btn btn-primary" (click)="logout()" type="submit">Logout</button>-->
<!--    <button *ngIf="!isLoggedIn" class="btn btn-primary" (click)="login()" type="submit">Login</button>-->
<!--    <div *ngIf="isLoggedIn" class="content">-->
<!--        <span>Welcome !!</span>-->
<!--      <button class="btn btn-primary" (click)="logout()" type="submit">Logout</button>-->
<!--      <br/>-->
<!--    </div>-->
    <app-calculator></app-calculator>
    <router-outlet></router-outlet>
</div>`
})
export class AppComponent {
  title = 'Calculator';
  public isLoggedIn = false;

  constructor(
    private _service:AppService){}

  ngOnInit(){
    this.isLoggedIn = this._service.checkCredentials();
    let i = window.location.href.indexOf('code');
    if(!this.isLoggedIn && i != -1){
      this._service.retrieveToken(window.location.href.substring(i + 5));
    }
  }

  login() {
    window.location.href = 'http://localhost:8083/auth/realms/baeldung/protocol/openid-connect/auth?response_type=code&&scope=openid%20write%20read&client_id=' +
      this._service.clientId + '&redirect_uri='+ this._service.redirectUri;
    // window.location.href = 'http://localhost:8083/auth/realms/baeldung/protocol/openid-connect/auth?response_type=code&&scope=openid%20write%20read&client_id=' +
    //   this._service.clientId + '&redirect_uri='+ this._service.redirectUri;
  }

  logout() {
    this._service.logout();
  }
}
