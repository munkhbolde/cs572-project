import { Injectable } from "@angular/core";
import * as auth0 from "auth0-js";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;

  auth0 = new auth0.WebAuth({
    clientID: "9aRXUTz3poQbcjLqOn1fthKXxbueETIo",
    domain: "mbs-cs572.auth0.com",
    responseType: "token id_token",
    redirectUri: "http://localhost:4200/student",
    scope: "openid"
  });

  constructor(public router: Router) {
    this._idToken = "";
    this._accessToken = "";
    this._expiresAt = 0;
  }

  get AccessToken(): string {
    return this._accessToken;
  }

  get IdToken(): string {
    return this._idToken;
  }

  public login(): void {
    this.auth0.authorize();
  }
}
