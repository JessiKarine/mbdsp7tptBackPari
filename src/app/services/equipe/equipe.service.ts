import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Equipe } from 'src/app/models/equipe';
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
  getEquipeById(id : String):Observable<any> {
    return this.http.get(this.uri+"Equipes/"+id);
  }

  updateEquipeById(equipeToUpdated: Equipe,file):Observable<Equipe>{
    const formData = new FormData();
    console.log("file--- : "+file);
    formData.append('file', file);
    formData.append('equipe' , JSON.stringify(equipeToUpdated));
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    if(file === undefined || file === null){
      return this.http.put<Equipe>(this.uri + "Equipes",equipeToUpdated);
    }else{
      return this.http.post<Equipe>(this.uri + "Equipes/Update/",formData,{headers});
    }
    
  }
  deleteEquipeById(id:String):Observable<any>{
    return this.http.delete<any>(this.uri + "Equipes/Delete/" + id);
  }

  createEquipe(equipeToSelected: Equipe,file){
    const formData = new FormData();
    formData.append('file', file);
    formData.append('equipe' , JSON.stringify(equipeToSelected));
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    if(file === undefined || file === null){
      return this.http.post<Equipe>(this.uri + "Equipes",equipeToSelected);
    }else{
      return this.http.post<Equipe>(this.uri + "Equipes/Insert/",formData,{headers});
    }
   
  }
}
