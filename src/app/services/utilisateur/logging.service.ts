import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Utilisateur } from 'src/app/models/utilisateur';
import { Config } from 'src/app/utilitaire/config.model';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  uri = Config.getBaseUrl()+"/api/utilisateur/";
  constructor(private http:HttpClient,private router:Router) { }

  login(user:Utilisateur):Observable<any> {
    console.log("ato amin'ny login")
    return this.http.post(this.uri+"login", user);
  }
  logout() { 
    localStorage.removeItem(Config.getLocalStorageKey("user"));
    this.router.navigate(["/login"]);
}
}
