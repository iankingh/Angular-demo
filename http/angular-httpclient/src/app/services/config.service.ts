import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private httpClient: HttpClient) {

   }

   getConfig(){
    return this.httpClient.get('http://localhost:3000/config');
   }
   
}
