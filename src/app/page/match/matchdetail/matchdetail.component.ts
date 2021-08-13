import { Component, OnInit, Inject, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { MatchService } from '../../../services/Match/Match.service';
import { Match } from '../../../models/Match';
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
  selector: 'app-matchdetail',
  templateUrl: './matchdetail.component.html',
  styleUrls: ['./matchdetail.component.css']
})
export class MatchdetailComponent implements OnInit {
  idUser : String;
  matchSelected : Match;
  titre:String;
  description:String;

  constructor(private route: ActivatedRoute,
              public dialog: MatDialog,
              private matchService: MatchService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.idUser = this.route.snapshot.paramMap.get('id');
    this.getMatchById(this.idUser);
  }

  getMatchById(idUser:String){
   // this.spinner.show();
    this.matchService.getMatchById(idUser)
        .subscribe(match => {
            this.matchSelected = match as Match;
         //   this.spinner.hide();
        })
  }


    openDialog(type:Number): void {

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
                             data: {matchData: this.matchSelected, typeOperation: type}
                         });
      }
}

/*@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html', app-matchtableaubody
})*/
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
            console.log('update');
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

  onUpdate(idUser:String,  match: Match){
      this.spinner.show();
      this.matchService.updateMatchById(idUser, match)
          .subscribe(match => {
             this.spinner.hide();
             this.dialogRef.close();
             this.router.navigate(["/Match"]);

          })
    }

    onDelete(idUser:String){
      this.spinner.show();
      this.matchService.deleteMatchById(idUser)
          .subscribe(() => {
              console.log("match deleted");
              this.dialogRef.close();
              this.spinner.hide();
              this.router.navigate(["/Match"]);
          })
    }

}
