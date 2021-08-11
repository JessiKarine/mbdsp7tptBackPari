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
  utilisateurData : Utilisateur;
}

@Component({
  selector: 'app-utilisateurdetail',
  templateUrl: './utilisateurdetail.component.html',
  styleUrls: ['./utilisateurdetail.component.css']
})
export class UtilisateurdetailComponent implements OnInit {
  idUser : String;
  utilisateurSelected : Utilisateur;
  login : String;
  nom : String;
  prenom : String;
  email : String;
  numeroTelephone : String;

  animal: string;
  name: string;
  titre: String = "test titre";

  constructor(private route: ActivatedRoute,
                private router: Router,
                    private utilisateurService: UtilisateurService,
                    private spinner: NgxSpinnerService,
                      public dialog: MatDialog  ) { }

  ngOnInit(): void {
    this.idUser = this.route.snapshot.paramMap.get('id');
    console.log("idUser eset " + this.idUser);
    this.getUtilisateurByIdUser(this.idUser);
  }

  getUtilisateurByIdUser(idUser:String){
    this.spinner.show();
    this.utilisateurService.getUtilisateurByIdUser(idUser)
        .subscribe(utilisateur => {
            this.utilisateurSelected = utilisateur as Utilisateur;
            this.login = this.utilisateurSelected.login;
            this.nom = this.utilisateurSelected.nom;
            this.prenom = this.utilisateurSelected.prenom;
            this.email = this.utilisateurSelected.email;
            this.numeroTelephone = this.utilisateurSelected.numeroTelephone;
            this.spinner.hide();
        })
  }

  onUpdate(){
    this.spinner.show();
    console.log("login => " + this.login);
    this.utilisateurSelected.login = this.login;
    this.utilisateurSelected.nom = this.nom;
    this.utilisateurSelected.prenom = this.prenom;
    this.utilisateurSelected.email = this.email;
    this.utilisateurSelected.numeroTelephone = this.numeroTelephone;
    this.utilisateurService.updateUtilisateurByIdUser(this.idUser, this.utilisateurSelected)
        .subscribe(utilisateur => {
            this.utilisateurSelected = utilisateur as Utilisateur
            console.log("utilisateur => " + this.utilisateurSelected);
            this.spinner.hide();
            this.router.navigate(["/Utilisateur"]);

        })
  }

  onDelete(){
    this.spinner.show();
    this.utilisateurService.deleteUtilisateurByIdUser(this.idUser)
        .subscribe(() => {
            console.log("utilisateur deleted");
            this.spinner.hide();
            this.router.navigate(["/Utilisateur"]);
        })
  }
    openDialog(): void {
        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
          width: '250px',
          data: {titre: "Delete", description: "Êtes-vous sur de modifier?", utilisateurData: this.utilisateurSelected}
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.animal = result;
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
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onAction() : void {
          console.log("ok pour action => " + this.data.utilisateurData.prenom);
  }

}
