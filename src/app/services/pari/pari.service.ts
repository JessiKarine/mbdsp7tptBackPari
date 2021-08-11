import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pari } from '../../models/Pari';
import { Config } from '../../utilitaire/config.model';

@Injectable({
  providedIn: 'root'
})
export class PariService {
  uri = Config.getBaseUrl()+"/api/pari/";
  constructor(private http:HttpClient,private router:Router) { }

  getParis():Observable<any> {
    return this.http.get(this.uri+"getParis");
  }
  getPariById(idPari : String):Observable<any> {
    return this.http.get(this.uri+"getPariById/"+idPari);
  }

  updatePariById(pariToUpdated:Pari):Observable<Pari>{
    return this.http.put<Pari>(this.uri + "update/" + pariToUpdated._id, pariToUpdated);
  }

}
