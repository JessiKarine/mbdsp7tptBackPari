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
  selector: 'app-matchdetail',
  templateUrl: './matchdetail.component.html',
  styleUrls: ['./matchdetail.component.css']
})
export class MatchdetailComponent implements OnInit {
  idMatch : String;
  matchSelected : Match;
  titre:String;
  description:String;
  
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
    this.getMatchById(this.idMatch);
  }

  getMatchById(idMatch:String){
    this.matchService.getMatchById(idMatch)
        .subscribe(match => {
            this.matchSelected = match as Match;
        })
  }

  openDialog(type:Number): void {
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
    this.matchSelected.idequipe1 = JSON.parse(this.form_eq1);
    $('#modalUser').modal('hide');
  }
  savePopupEquipe2(){
    this.matchSelected.idequipe2 = JSON.parse(this.form_eq2);
    $('#modalEquipe2').modal('hide');
  }
  savePopupCategorie(){
    this.matchSelected.idcategorie = JSON.parse(this.form_categ);
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

@Component({
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
    

}
