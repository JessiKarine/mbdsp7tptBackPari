import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Categorie } from 'src/app/models/categorie';
import { Config } from 'src/app/utilitaire/config.model';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  uri = Config.getBaseUrlOracle()+"/";
  constructor(private http:HttpClient,private router:Router) { }

  getCategorie():Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.uri+"Categories");
  }
  getCategorieById(id : String):Observable<Categorie> {
    return this.http.get<Categorie>(this.uri+"Categories/"+id);
  }
 

  updateCategorieById(equipeToUpdated: Categorie,file):Observable<Categorie>{
    const formData = new FormData();
    console.log("file--- : "+file);
    formData.append('file', file);
    formData.append('equipe' , JSON.stringify(equipeToUpdated));
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    if(file === undefined || file === null){
      return this.http.put<Categorie>(this.uri + "Categories",equipeToUpdated);
    }else{
      return this.http.post<Categorie>(this.uri + "Categorie/Update/",formData,{headers});
    }
    
  }
  deleteCategorieById(id:String):Observable<any>{
    return this.http.delete<any>(this.uri + "Categorie/Delete/" + id);
  }

  createCategorie(equipeToSelected: Categorie,file){
    const formData = new FormData();
    formData.append('file', file);
    formData.append('equipe' , JSON.stringify(equipeToSelected));
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    if(file === undefined || file === null){
      return this.http.post<Categorie>(this.uri + "Categorie",equipeToSelected);
    }else{
      return this.http.post<Categorie>(this.uri + "Categorie/Insert/",formData,{headers});
    }
   
  }
}
