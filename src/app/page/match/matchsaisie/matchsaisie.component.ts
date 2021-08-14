import { Component, OnInit, Inject, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { MatchService } from '../../../services/Match/Match.service';
import { EquipeService } from '../../../services/Equipe/Equipe.service';
import { CategorieService } from '../../../services/Categorie/Categorie.service';
import { Match } from '../../../models/Match';
import { Equipe } from '../../../models/Equipe';
import { Categorie } from '../../../models/Categorie';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


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
  coteMatchNull : string ;
  coteequipe2 : Number ;
  coteequipe1 : Number ;
  heure : string ;
  date : string ;
  idequipe1 : string ;
  idequipe2 : string ;
  etat : string ;
  
  idMatch : String;
  matchToCreate : Match;
  titre:String;
  description:String;

  eq1: Equipe;
  eq2: Equipe;
  categorie : Categorie;
  

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
    
    //this.getMatchById(this.idMatch);
  }
  createMatch(){
    this.spinner.show();
    
    this.findEquipe1ById(this.idequipe1);
    this.findEquipe2ById(this.idequipe2);
    this.findCategorie(this.idcategorie);

    this.matchToCreate.heure=this.heure;
    this.matchToCreate.date=this.date;
    this.matchToCreate.etat=this.etat;
    this.matchToCreate.coteequipe1=this.coteequipe1;
    this.matchToCreate.coteequipe2=this.coteequipe2;
    this.matchToCreate.idequipe1=this.eq1;
    this.matchToCreate.idequipe2=this.eq2;
    this.matchToCreate.idcategorie=this.categorie;
    console.log("categorie dans matchsaisiecomponent=="+this.matchToCreate.idcategorie)
    this.matchService.createMatch(this.matchToCreate)  
      .subscribe(match => {
        this.router.navigate(["/Match/" ]);
        this.spinner.hide();
    })
  }
  findCategorie(idCategorie:String){
    this.categorieService.getCategorieById(idCategorie)
        .subscribe(categorie => {
          this.categorie = categorie as Categorie;
        })
  }
  findEquipe1ById(idEquipe:String){
    this.equipeService.getEquipeById(idEquipe)
        .subscribe(equipe => {
          this.eq1 = equipe as Equipe;
        })
  }
  findEquipe2ById(idEquipe:String){
    this.equipeService.getEquipeById(idEquipe)
        .subscribe(equipe => {
          this.eq2 = equipe as Equipe;
        })
  }
  /*getMatchById(idMatch:String){
    this.matchService.getMatchById(idMatch)
        .subscribe(match => {
            this.matchSelected = match as Match;
        })
  }*/

  /*openDialog(type:Number): void {
    console.log('Entree dans dialog avec type==='+type);
    switch(type){
        case 0:
            this.titre = "Modification";
            this.description = "Êtes-vous sur de modifier ?";
            break;
        case 1:
            this.titre = "Suppression",
            this.description = "Êtes-vous sur de supprimer ?";
            break;
        default:
            console.log("default opération");
    }

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
                         width: '250px',
                         data: {titre: this.titre, description: this.description,typeOperation: type,idUser:this.idMatch, matchData: this.matchSelected}
                     });
  }*/
}

/*@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private spinner: NgxSpinnerService,
    private router: Router,
    private matchService: MatchService,) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  // parametre number 0 = update et 1 = deleted;
  onAction(type:Number) : void {
    //this.spinner.show();
    switch(type){
        case 0:
            console.log('update-idMatch='+this.data.idUser);
            this.onUpdate(this.data.idUser, this.data.matchData as Match)
            break;
        case 1:
            console.log('delete');
            this.onDelete(this.data.idUser);
            break;
        default:
            console.log('default modal');
    }
    //console.log("ok pour action => " + (this.data.utilisateurData as Utilisateur).prenom);
  }

  onUpdate(idMatch:String,  match: Match){
      this.spinner.show();
      console.log('heure==='+match.heure);
      this.matchService.updateMatchById(idMatch, match)
          .subscribe(match => {
             this.spinner.hide();
             this.dialogRef.close();
             this.router.navigate(["/Match"]);

          })
    }

    onDelete(idMatch:String){
      this.spinner.show();
      this.matchService.deleteMatchById(idMatch)
          .subscribe(() => {
              console.log("match deleted");
              this.dialogRef.close();
              this.spinner.hide();
              this.router.navigate(["/Match"]);
          })
    }

}*/
