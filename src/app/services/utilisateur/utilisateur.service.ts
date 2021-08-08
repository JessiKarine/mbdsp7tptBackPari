import { Injectable } from '@angular/core';
import { Config } from '../../utilitaire/config.model';
import { HttpClient } from '@angular/common/http';
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
}
