import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Match } from 'src/app/models/match';
import { Pari } from 'src/app/models/pari';
import { Utilisateur } from 'src/app/models/utilisateur';
import { MatchService } from 'src/app/services/match/match.service';
import { PariService } from 'src/app/services/pari/pari.service';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';
declare var $:any ; 
@Component({
  selector: 'app-pari-saisie',
  templateUrl: './pari-saisie.component.html',
  styleUrls: ['./pari-saisie.component.css']
})
export class PariSaisieComponent implements OnInit {
  utilisateurList;
  matchList;
  idMatch : string;
  idEquipe; 
  idUser : string;
  mise;
  pari : Pari;
  constructor(private utilisateurService:UtilisateurService,
    private route: ActivatedRoute, private router: Router,
    private pariService : PariService,private matchService : MatchService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.pari = new Pari();
  }
  toggleModalUser(): void { 
    this.getAllUtilisateur();
    $('#modalUser').modal('show');
  }
  toggleModalMatch(): void { 
    this.getAllMatch();
    $('#modalMatch').modal('show');
  }

  savePopupMatch(){
    this.pari.idMatch = JSON.parse(this.idMatch);
   $('#modalMatch').modal('hide');

  }
  savePopupUser(){
    this.pari.idUser = JSON.parse(this.idUser);
    $('#modalUser').modal('hide');
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
  createPariById(){
    this.spinner.show();
    this.pari.mise = this.mise;
    this.pari.idEquipe = JSON.parse(this.idEquipe);
    this.getEquipeChoisi();
    this.pariService.createPari(this.pari)  
      .subscribe(pari => {
        this.pari._id = pari._id;
        this.router.navigate(["/Pari/"+this.pari._id  ]);
        this.spinner.hide();
    })
  }
  getEquipeChoisi(){
    if(this.idEquipe===this.pari.idMatch.idequipe1.id)this.pari.idEquipe =this.pari.idMatch.idequipe1;
    else this.pari.idEquipe =this.pari.idMatch.idequipe2;
  }
}
