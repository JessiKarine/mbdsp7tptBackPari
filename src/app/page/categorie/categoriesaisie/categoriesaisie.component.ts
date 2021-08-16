import { Component, OnInit, Inject, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { CategorieService } from '../../../services/Categorie/Categorie.service';
import { Categorie } from '../../../models/categorie';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface DialogData {
  description: string;
  titre: string ;
  categorieData : Object;
  typeOperation: Number;
  idUser: string;
}

@Component({
  selector: 'app-categoriesaisie',
  templateUrl: './categoriesaisie.component.html',
  styleUrls: ['./categoriesaisie.component.css']
})
export class CategoriesaisieComponent implements OnInit {
  nom : string;
  description : string ;
  
  idCat : String;
  categorieToCreate : Categorie;
  titre:String;
  desc:String;

  

  constructor(private route: ActivatedRoute,
              public dialog: MatDialog,
              private categorieService: CategorieService,
              private spinner: NgxSpinnerService
              , private router: Router) { }
 
  ngOnInit(): void {
    this.idCat = this.route.snapshot.paramMap.get('id');
    this.categorieToCreate=new Categorie();
    
    //this.getMatchById(this.idMatch);
  }
  createCategorie(){
    this.spinner.show();

    this.categorieToCreate.nom=this.nom;
    this.categorieToCreate.description=this.description;
    this.categorieService.createCategorie(this.categorieToCreate,null)  
      .subscribe(categorieToCreate => {
        this.router.navigate(["/Categorie/" ]);
        this.spinner.hide();
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
