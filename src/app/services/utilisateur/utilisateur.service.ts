import { Injectable } from '@angular/core';
import { Config } from '../../utilitaire/config.model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateur } from '../../models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  uri = Config.getBaseUrl() + "/api/utilisateur";

  constructor(private http:HttpClient) { }

  getAllUtilisateur():Observable<Utilisateur[]>{
    console.log("Récupération de la liste des utilisateur");
    return this.http.get<Utilisateur[]>(this.uri);
  }

// récuperation d'un utilisateur paramatre idUser
  getUtilisateurByIdUser(idUser):Observable<Utilisateur>{
    return this.http.get<Utilisateur>(this.uri + "/" + idUser);
  }

// update un utilisateur by idUser
  updateUtilisateurByIdUser(idUser:String, utilisateurToUpdated:Utilisateur):Observable<Utilisateur>{
    const body = { utilisateur : utilisateurToUpdated};
    const params = new HttpParams().append('test', 'estst');
    return this.http.put<Utilisateur>(this.uri + "/" + idUser, body);
  }

 // delete utilisateur by idUser
  deleteUtilisateurByIdUser(idUser:String):Observable<any>{
    return this.http.delete<any>(this.uri + "/" + idUser);
  }


}
