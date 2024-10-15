import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated = false;
  private apiUrl = 'http://localhost:8080';

  constructor(private _cookieService: CookieService, private _router: Router) {}

  public async login(email: string, password: string) {

    try {
      const response = await axios.post(`${this.apiUrl}/login`, {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const token = response.data.token;
      const userName = response.data.userName;
      this._cookieService.set('token', token, { expires: 1, path: '/' });
      this._cookieService.set('userName', userName, { expires: 1, path: '/' });
  
      console.log('Success login', response.data);
      this.isAuthenticated = true;
      return response.data;
    } catch (error) {
      console.error('Failed to login');
      this.isAuthenticated = false;
      throw error; 
    }
  }

  public async register(username: string, email: string, password: string ) {
    try {
      const response = await axios.post(`${this.apiUrl}/register`, {
        username,
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });;
      return response
    }catch (error) {
      console.error('Failed to register');
      throw error; 
    }
     
  }

  public getToken() {
    return this._cookieService.get('token');
  }

  public getUserName() {
    return this._cookieService.get('userName');
  }

  public logout() {
    this._cookieService.delete('token', '/');
    this._cookieService.delete('userName', '/');
    this.isAuthenticated = false;
    this._router.navigate(['/']);
  }

  public isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
