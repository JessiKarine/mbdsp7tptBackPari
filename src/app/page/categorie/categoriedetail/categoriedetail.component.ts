import { Component, OnInit, Inject, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { CategorieService } from '../../../services/categorie/categorie.service';
import { Categorie } from '../../../models/categorie';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  description: string;
  titre: string ;
  categorieData : Object;
  typeOperation: Number;
  idCat: string;
}

@Component({
  selector: 'app-categoriedetail',
  templateUrl: './categoriedetail.component.html',
  styleUrls: ['./categoriedetail.component.css']
})
export class CategoriedetailComponent implements OnInit {
  idCat : String;
  categorieSelected : Categorie;
  titre:String;
  description:String;

  constructor(private route: ActivatedRoute,
              public dialog: MatDialog,
              private categorieService: CategorieService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.idCat = this.route.snapshot.paramMap.get('id');
    this.getCategorieById(this.idCat);
  }

  getCategorieById(idCat:String){
   // this.spinner.show();
    this.categorieService.getCategorieById(idCat)
        .subscribe(categorie => {
            this.categorieSelected = categorie as Categorie;
         //   this.spinner.hide();
        })
  }


    openDialog(type:Number): void {

        switch(type){
            case 0:
                this.titre = "Modification";
                this.description = "Êtes-vous sur de modifier "+ this.categorieSelected.nom + "?";
                break;
            case 1:
                this.titre = "Suppression",
                this.description = "Êtes-vous sur de supprimer "+ this.categorieSelected.nom + "?";
                break;
            default:
                console.log("default opération");
        }

        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
                             width: '250px',
                             data: {titre: this.titre, description: this.description, idCat: this.idCat, categorieData: this.categorieSelected, typeOperation: type}
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
    private categorieService: CategorieService,) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  // parametre number 0 = update et 1 = deleted;
  onAction(type:Number) : void {
    //this.spinner.show();
    switch(type){
        case 0:
            console.log('update');
            this.onUpdate(this.data.idCat, this.data.categorieData as Categorie)
            break;
        case 1:
            console.log('delete');
            this.onDelete(this.data.idCat);
            break;
        default:
            console.log('default modal');
    }
    //console.log("ok pour action => " + (this.data.utilisateurData as Utilisateur).prenom);
  }

  onUpdate(idCat:String,  categorie: Categorie){
      console.log("idcat: " + idCat + " categorie name: " + categorie.nom+" and id=="+categorie.id);
      this.spinner.show();
      this.categorieService.updateCategorieById(categorie,null)
          .subscribe(categorie => {
             this.spinner.hide();
             this.dialogRef.close();
             this.router.navigate(["/Categorie"]);

          })
    }

    onDelete(idUser:String){
      this.spinner.show();
      this.categorieService.deleteCategorieById(idUser)
          .subscribe(() => {
              console.log("Categorie deleted");
              this.dialogRef.close();
              this.spinner.hide();
              this.router.navigate(["/Categorie"]);
          })
    }

}
