import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipe } from 'src/app/models/equipe';
import { Match } from 'src/app/models/match';
import { Pari } from 'src/app/models/pari';
import { Utilisateur } from 'src/app/models/utilisateur';
import { MatchService } from 'src/app/services/match/match.service';
import { PariService } from 'src/app/services/pari/pari.service';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';
declare var $:any ; 
@Component({
  selector: 'app-pari-fiche',
  templateUrl: './pari-fiche.component.html',
  styleUrls: ['./pari-fiche.component.css']
})
export class PariFicheComponent implements OnInit {
  pari : Pari;
  utilisateurList;
  matchList;
  idMatch : string;
  idEquipe; 
  idUser : string;
  constructor(private utilisateurService:UtilisateurService,
    private route: ActivatedRoute, private router: Router,private pariService : PariService,private matchService : MatchService) { }

  ngOnInit(): void {
    this.getPariById(this.route.snapshot.paramMap.get('id'));
  }
  toggleModalUser(): void { 
    this.getAllUtilisateur();
    console.log(this.idUser);
    $('#modalUser').modal('show');
  }
  toggleModalMatch(): void { 
    this.getAllMatch();
    $('#modalMatch').modal('show');
  }

  getPariById(idPari : String){
    this.pariService.getPariById(idPari)
    .subscribe(data => {
        this.pari = data as Pari;
        this.idEquipe=this.pari.idEquipe.id;
        
        console.log("idequipe : ",this.idEquipe);
    });
  }
 
  getAllUtilisateur(){
    this.utilisateurService.getAllUtilisateur()
        .subscribe(data => {
            this.utilisateurList = data as Utilisateur[];

        });
  }

  getAllMatch(){
    this.matchService.getMatch()
        .subscribe(data => {
            console.log("dans match component, liste des matchs = " + data);
            this.matchList = data as Match[];
        });
  }

  updatePariById() {
    console.log("ato am updatepari : ",this.idEquipe, "mise : ",this.pari.mise);
    this.pari.idEquipe = JSON.parse(this.idEquipe);
    
   /* this.pariService.updatePariById(id,pariToUpdated)  
    .subscribe(pari => {
      this.pari = pari as Pari;
      console.log("pari => " + this.pari);
      this.router.navigate(["/Pari/"+id]);
  })*/
  }

  savePopupMatch(){
    this.pari.idMatch = JSON.parse(this.idMatch);
   $('#modalMatch').modal('hide');

  }
  savePopupUser(){
    this.pari.idUser = JSON.parse(this.idUser);
    $('#modalUser').modal('hide');
  }
}
