import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pari } from '../../models/pari';
import { Config } from '../../utilitaire/config.model';

@Injectable({
  providedIn: 'root'
})
export class PariService {
  uri = Config.getBaseUrl()+"/api/pari/";
  constructor(private http:HttpClient,private router:Router) { }

  getParis(page:number, limit:number):Observable<any> {
    return this.http.get(this.uri+"getParis?page="+page + "&limit="+limit);
  }
  getPariById(idPari : String):Observable<any> {
    return this.http.get(this.uri+"getPariById/"+idPari);
  }

  updatePariById(pariToUpdated:Pari):Observable<Pari>{
    return this.http.put<Pari>(this.uri + "update/" + pariToUpdated._id, pariToUpdated);
  }
  deletePariById(id:String):Observable<any>{
    console.log("urlll : ",this.uri + "/"+ id);
    return this.http.delete<any>(this.uri + "/" + id);
  }
  createPari(pariToInsert:Pari):Observable<any>{
    console.log("ao am creer pari : ",pariToInsert );
    return this.http.post<Pari>(this.uri + "insert" , pariToInsert);
  }

  countpariParMatch():Observable<any>{
    return this.http.get(this.uri+"countPariParMatch/");
  }

}
