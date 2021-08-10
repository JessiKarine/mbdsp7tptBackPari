import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pari } from '../models/Pari';
import { Config } from '../utilitaire/config.model';

@Injectable({
  providedIn: 'root'
})
export class PariService {
  uri = Config.getBaseUrl()+"/api/pari/";
  constructor(private http:HttpClient,private router:Router) { }

  getParis():Observable<any> {
    console.log("ato amin'ny pari")
    return this.http.get(this.uri+"getParis");
  }
}
