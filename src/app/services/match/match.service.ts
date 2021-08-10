import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Config } from 'src/app/utilitaire/config.model';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  uri = Config.getBaseUrl()+"/api/match/";
  constructor(private http:HttpClient,private router:Router) { }

  getMatch():Observable<any> {
    return this.http.get(this.uri);
  }
}
