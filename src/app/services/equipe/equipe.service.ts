import { HttpClient } from '@angular/common/http';
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

  updateEquipeById(equipeToUpdated:Equipe):Observable<Equipe>{
    return this.http.put<Equipe>(this.uri + "Equipes/" + equipeToUpdated.id, equipeToUpdated);
  }
  deleteEquipeById(id:String):Observable<any>{
    return this.http.delete<any>(this.uri + "Equipes/" + id);
  }
}
