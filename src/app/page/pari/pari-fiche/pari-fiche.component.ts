import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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
  mise : Number;
  constructor(private utilisateurService:UtilisateurService,
    private route: ActivatedRoute, private router: Router,private pariService : PariService,private matchService : MatchService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getPariById(this.route.snapshot.paramMap.get('id'));
  }
  toggleModalUser(): void { 
    this.getAllUtilisateur();
    $('#modalUser').modal('show');
  }
  toggleModalMatch(): void { 
    this.getAllMatch();
    $('#modalMatch').modal('show');
  }

  getPariById(idPari : String){
    this.spinner.show();
    this.pariService.getPariById(idPari)
    .subscribe(data => {
        this.pari = data as Pari;
        this.idEquipe=this.pari.idEquipe.id;
        this.mise= this.pari.mise;
        this.spinner.hide();
    });
  }
 
  getAllUtilisateur(){
    this.spinner.show();
    this.utilisateurService.getAllUtilisateur()
        .subscribe(data => {
            this.utilisateurList = data as Utilisateur[];
            this.spinner.hide();
        });
  }

  getAllMatch(){
    this.spinner.show();
    this.matchService.getMatch()
        .subscribe(data => {
            console.log("dans match component, liste des matchs = " + data);
            this.matchList = data as Match[];
            this.spinner.hide();
        });
  }

  updatePariById() {
    this.spinner.show();
    this.pari.mise = this.mise;
    this.pari.idEquipe = JSON.parse(this.idEquipe);
    this.getEquipeChoisi();
    this.pariService.updatePariById(this.pari)  
      .subscribe(pari => {
        this.router.navigate(["/Pari/"+this.pari._id]);
        this.spinner.hide();
    })
  }

  savePopupMatch(){
    this.pari.idMatch = JSON.parse(this.idMatch);
   $('#modalMatch').modal('hide');

  }
  savePopupUser(){
    this.pari.idUser = JSON.parse(this.idUser);
    $('#modalUser').modal('hide');
  }
  getEquipeChoisi(){
    if(this.idEquipe===this.pari.idMatch.idequipe1.id)this.pari.idEquipe =this.pari.idMatch.idequipe1;
    else this.pari.idEquipe =this.pari.idMatch.idequipe2;
  }

  deletePariById(){
    this.spinner.show();
    this.pariService.deletePariById(this.pari._id)
        .subscribe(() => {
            console.log("equipe deleted");
            this.spinner.hide();
            this.router.navigate(["/Pari"]);
        })
  }
}
