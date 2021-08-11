import { Component, OnInit, Inject, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { UtilisateurService } from '../../../services/utilisateur/utilisateur.service';
import { Utilisateur } from '../../../models/utilisateur';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  description: string;
  titre: string ;
  utilisateurData : Object;
  typeOperation: Number;
  idUser: string;
}

@Component({
  selector: 'app-utilisateurdetail',
  templateUrl: './utilisateurdetail.component.html',
  styleUrls: ['./utilisateurdetail.component.css']
})
export class UtilisateurdetailComponent implements OnInit {
  idUser : String;
  utilisateurSelected : Utilisateur;
  titre:String;
  description:String;

  constructor(private route: ActivatedRoute,
              public dialog: MatDialog,
              private utilisateurService: UtilisateurService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.idUser = this.route.snapshot.paramMap.get('id');
    console.log("idUser eset " + this.idUser);
    this.getUtilisateurByIdUser(this.idUser);
  }

  getUtilisateurByIdUser(idUser:String){
   // this.spinner.show();
    this.utilisateurService.getUtilisateurByIdUser(idUser)
        .subscribe(utilisateur => {
            this.utilisateurSelected = utilisateur as Utilisateur;
         //   this.spinner.hide();
        })
  }


    openDialog(type:Number): void {

        switch(type){
            case 0:
                this.titre = "Modification";
                this.description = "Êtes-vous sur de modifier "+ this.utilisateurSelected.nom +" " + this.utilisateurSelected.prenom + "?";
                break;
            case 1:
                this.titre = "Suppression",
                this.description = "Êtes-vous sur de supprimer "+ this.utilisateurSelected.nom +" " + this.utilisateurSelected.prenom + "?";
                break;
            default:
                console.log("default opération");
        }

        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
                             width: '250px',
                             data: {titre: this.titre, description: this.description, idUser: this.idUser, utilisateurData: this.utilisateurSelected, typeOperation: type}
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
    private utilisateurService: UtilisateurService,) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  // parametre number 0 = update et 1 = deleted;
  onAction(type:Number) : void {
    //this.spinner.show();
    switch(type){
        case 0:
            console.log('update');
            this.onUpdate(this.data.idUser, this.data.utilisateurData as Utilisateur)
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

  onUpdate(idUser:String,  utilisateur: Utilisateur){
      console.log("iduser: " + idUser + " utilisateur name: " + utilisateur.nom);
      this.spinner.show();
      this.utilisateurService.updateUtilisateurByIdUser(idUser, utilisateur)
          .subscribe(utilisateur => {
              //this.utilisateurSelected = utilisateur as Utilisateur
             // console.log("utilisateur => " + this.utilisateurSelected);
             this.spinner.hide();
             this.dialogRef.close();
             this.router.navigate(["/Utilisateur"]);

          })
    }

    onDelete(idUser:String){
      this.spinner.show();
      this.utilisateurService.deleteUtilisateurByIdUser(idUser)
          .subscribe(() => {
              console.log("utilisateur deleted");
              this.dialogRef.close();
              this.spinner.hide();
              this.router.navigate(["/Utilisateur"]);
          })
    }

}
