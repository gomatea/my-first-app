import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import * as moment from 'moment'
import { Router } from "@angular/router";

// import { products } from "../products";

const helper = new JwtHelperService();

class DecodedToken {
  userId: string = ''
  username: string = ''
  exp: number = 0
  iat: number = 0
}

@Injectable()
export class AuthService{

  private decodedToken;

  constructor(
    private http: HttpClient,
    private router: Router
    ) {
    this.decodedToken = JSON.parse(localStorage.getItem('app-meta') as string) || new DecodedToken()
  }

  // getProducts(): Observable<any>{
  //   // return products
  //   return this.http.get('/api/v1/products/')
  //   // return this.http.get('http://localhost:3001/api/v1/products/')
  // }

  getToken(){
    return localStorage.getItem('app-auth')
  }

  isAuthenticated(){
    return moment().isBefore(moment.unix(this.decodedToken.exp))
  }

  login(userData: any): Observable<any>{
    return this.http.post('/api/v1/users/login', userData).pipe(map(
      // tokenをローカルストレージに保存
      (token) => {
        // console.log(token.toString())
        this.decodedToken = helper.decodeToken(token.toString())
        localStorage.setItem('app-auth', token.toString())
        localStorage.setItem('app-meta', JSON.stringify(this.decodedToken))
        return token
      }
    ))
  }

  register(userData: any): Observable<any>{
    return this.http.post('/api/v1/users/register', userData)
  }

  logout(){
    localStorage.removeItem('app-auth')
    localStorage.removeItem('app-meta')
    this.decodedToken = new DecodedToken()
    this.router.navigate(['/login'])
  }
}