import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Config } from 'src/app/utilitaire/config.model';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  uri = Config.getBaseUrlOracle()+"/";
  constructor(private http:HttpClient,private router:Router) { }

  getEquipe():Observable<any> {
    return this.http.get(this.uri+"Equipes");
  }
}
