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
}

@Component({
  selector: 'app-utilisateurdetail',
  templateUrl: './utilisateurdetail.component.html',
  styleUrls: ['./utilisateurdetail.component.css']
})
export class UtilisateurdetailComponent implements OnInit {
  idUser : String;
  utilisateurSelected : Utilisateur;

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
            this.spinner.hide();
        })
  }

  onUpdate(){
    this.spinner.show();
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

  // parametre number 0 = update et 1 = deleted;
  onAction() : void {
          console.log("ok pour action => " + (this.data.utilisateurData as Utilisateur).prenom);
  }

}
