import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { last } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http: HttpClient;
  baseServerUrl = "https://localhost:44374/api/";

  constructor(http : HttpClient) { 
    this.http = http;
  }



  registerUser(User: Array<string>){
   return  this.http.post(this.baseServerUrl + "User/CreateUsers", {
    FirstName: User[0],
    LastName: User [1],
    Email: User [2],
    Mobile: User [3],
    Gender:User [4],
    Password: User[5]

   }, 
    {responseType:'text'

   });
  }
}
