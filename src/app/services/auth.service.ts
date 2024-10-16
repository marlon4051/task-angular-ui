import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated = false;
  private apiUrl = 'http://localhost:8080';

  constructor(
    private _cookieService: CookieService,
    private _router: Router,
    private http: HttpClient
  ) {}

  public async login(email: string, password: string) {
    try {
      const response = await firstValueFrom(
        this.http.request<any>('post', `${this.apiUrl}/login`, {
          body: {
            email,
            password,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        })
      );

      const token = response.token;
      const userName = response.userName;
      this._cookieService.set('token', token, {
        expires: 1,
        path: '/',
        secure: true,
      });
      this._cookieService.set('userName', userName, {
        expires: 1,
        path: '/',
        secure: true,
      });

      console.log('Success login', response.data);
      this.isAuthenticated = true;
      return response.data;
    } catch (error) {
      console.error('Failed to login');
      this.isAuthenticated = false;
      return error;
    }
  }

  public async register(username: string, email: string, password: string) {
    try {
      const response = await firstValueFrom(
        this.http.request<any>('post', `${this.apiUrl}/register`, {
          body: {
            username,
            email,
            password,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        })
      );
      return response;
    } catch (error) {
      console.error('Failed to register');
      return error;
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
