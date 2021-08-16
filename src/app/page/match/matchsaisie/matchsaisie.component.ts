import { Component, OnInit, Inject, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { MatchService } from '../../../services/match/match.service';
import { EquipeService } from '../../../services/equipe/equipe.service';
import { CategorieService } from '../../../services/categorie/categorie.service';
import { Match } from '../../../models/match';
import { Equipe } from '../../../models/equipe';
import { Categorie } from '../../../models/categorie';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

declare var $:any ; 
export interface DialogData {
  description: string;
  titre: string ;
  matchData : Object;
  typeOperation: Number;
  idUser: string;
}

@Component({
  selector: 'app-matchsaisie',
  templateUrl: './matchsaisie.component.html',
  styleUrls: ['./matchsaisie.component.css']
})
export class MatchsaisieComponent implements OnInit {
  idcategorie : string;
  coteMatchNull : Number ;
  coteequipe2 : Number ;
  coteequipe1 : Number ;
  heure : string ;
  date : string ;
  /*idequipe1 : string ;
  idequipe2 : string ;*/
  etat : string ;
  
  idMatch : String;
  matchToCreate : Match;
  titre:String;
  description:String;

  /*eq1: Equipe;
  eq2: Equipe;*/
  categorie : Categorie;

  form_eq1 : string;
  form_eq2 : string;
  form_categ : string;
  
  equipeList: Equipe[];
  categorieList: Categorie[];

  constructor(private route: ActivatedRoute,
              public dialog: MatDialog,
              private matchService: MatchService,
              private equipeService: EquipeService,
              private categorieService: CategorieService,
              private spinner: NgxSpinnerService
              , private router: Router) { }
 
  ngOnInit(): void {
    this.idMatch = this.route.snapshot.paramMap.get('id');
    this.matchToCreate=new Match();
    
  }
  createMatch(){
    this.spinner.show();

    this.matchToCreate.heure=this.heure;
    this.matchToCreate.date=this.date;
    this.matchToCreate.etat=this.etat;
    this.matchToCreate.coteequipe1=this.coteequipe1;
    this.matchToCreate.coteequipe2=this.coteequipe2;
    this.matchToCreate.coteMatchNull=this.coteMatchNull;
    console.log("categorie dans matchsaisiecomponent=="+this.matchToCreate.idcategorie.nom)
    this.matchService.createMatch(this.matchToCreate)  
      .subscribe(match => {
        this.router.navigate(["/Match/" ]);
        this.spinner.hide();
    })
  }
  toggleModalCategorie(): void { 
    this.getAllCategorie();
    $('#modalCategorie').modal('show');
  }
  toggleModalEquipe1(): void { 
    this.getAllEquipe();
    $('#modalUser').modal('show');
  }
  toggleModalEquipe2(): void { 
    this.getAllEquipe();
    $('#modalEquipe2').modal('show');
  }
  savePopupEquipe1(){
    this.matchToCreate.idequipe1 = JSON.parse(this.form_eq1);
    $('#modalUser').modal('hide');
  }
  savePopupEquipe2(){
    this.matchToCreate.idequipe2 = JSON.parse(this.form_eq2);
    $('#modalEquipe2').modal('hide');
  }
  savePopupCategorie(){
    this.matchToCreate.idcategorie = JSON.parse(this.form_categ);
    $('#modalCategorie').modal('hide');
  }
  getAllEquipe(){
    this.spinner.show();
    this.equipeService.getEquipe()
        .subscribe(data => {
          this.spinner.hide();
            this.equipeList = data as Equipe[];
        });
  }
  getAllCategorie(){
    this.spinner.show();
    this.categorieService.getCategorie()
        .subscribe(data => {
          this.spinner.hide();
            this.categorieList = data as Categorie[];
        });
  }
}
