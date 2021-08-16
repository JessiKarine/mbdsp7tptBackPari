import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Config } from 'src/app/utilitaire/config.model';
import { Match } from '../../models/match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  uri = Config.getBaseUrl()+"/api/match/";
  constructor(private http:HttpClient,private router:Router) { }

  /*mbola get matches à venir fa soloiko avy eo*/
  getMatch():Observable<Match[]>{
    console.log("Récupération de la liste des matches");
    return this.http.get<Match[]>(this.uri);
  }
  // récuperation d'un match paramatre id
  getMatchById(id):Observable<Match>{
    return this.http.get<Match>(this.uri + "/" + id);
  }

// update un match by id
  updateMatchById(id:String, matchToUpdated:Match):Observable<Match>{
    /*const body = { match : matchToUpdated};
    //const params = new HttpParams().append('test', 'estst');
    return this.http.put<Match>(this.uri + "/" + id, body);*/
    return this.http.put<Match>(this.uri + id, matchToUpdated);
  }

  getMatchPaginer(page:number, limit:number):Observable<any>{
    console.log("Récupération de la liste des matches paginer");
    return this.http.get<Match[]>(this.uri+"getMatchPaginer?page="+page + "&limit="+limit);
  }


 // delete match by id
  deleteMatchById(id:String):Observable<any>{
    return this.http.delete<any>(this.uri + "/" + id);
  }
  createMatch(matchToCreate:Match):Observable<Match>{
    console.log("uri==="+this.uri);
    console.log("heure dans angular==="+matchToCreate.heure);
    return this.http.post<Match>(this.uri, matchToCreate);
  }
}
