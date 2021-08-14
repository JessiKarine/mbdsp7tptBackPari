import { Component, OnInit, Inject, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { RoleService } from '../../../services/role/role.service';
import { Role } from '../../../models/role';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  description: string;
  titre: string ;
  roleData : Object;
  typeOperation: Number;
  idRole: string;
}

@Component({
  selector: 'app-roledetail',
  templateUrl: './roledetail.component.html',
  styleUrls: ['./roledetail.component.css']
})
export class RoledetailComponent implements OnInit {
  idRole : String;
  roleSelected : Role;
  titre:String;
  description:String;

  constructor(private route: ActivatedRoute,
              public dialog: MatDialog,
              private roleService: RoleService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.idRole = this.route.snapshot.paramMap.get('id');
    this.getRoleById(this.idRole);
  }

  getRoleById(idRole:String){
   // this.spinner.show();
    this.roleService.getRoleById(idRole)
        .subscribe(role => {
            this.roleSelected = role as Role;
         //   this.spinner.hide();
        })
  }


    openDialog(type:Number): void {

        switch(type){
            case 0:
                this.titre = "Modification";
                this.description = "Êtes-vous sur de modifier "+ this.roleSelected.nom + "?";
                break;
            case 1:
                this.titre = "Suppression",
                this.description = "Êtes-vous sur de supprimer "+ this.roleSelected.nom + "?";
                break;
            default:
                console.log("default opération");
        }

        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
                             width: '250px',
                             data: {titre: this.titre, description: this.description, idRole: this.idRole, roleData: this.roleSelected, typeOperation: type}
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
    private roleService: RoleService,) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  // parametre number 0 = update et 1 = deleted;
  onAction(type:Number) : void {
    //this.spinner.show();
    switch(type){
        case 0:
            console.log('update');
            this.onUpdate(this.data.idRole, this.data.roleData as Role)
            break;
        case 1:
            console.log('delete');
            this.onDelete(this.data.idRole);
            break;
        default:
            console.log('default modal');
    }
    //console.log("ok pour action => " + (this.data.utilisateurData as Utilisateur).prenom);
  }

  onUpdate(idRole:String,  role: Role){
      this.spinner.show();
      this.roleService.updateRoleById(role)
          .subscribe(role => {
             this.spinner.hide();
             this.dialogRef.close();
             this.router.navigate(["/Role"]);

          })
    }

    onDelete(idUser:String){
      this.spinner.show();
      this.roleService.deleteRoleById(idUser)
          .subscribe(() => {
              this.dialogRef.close();
              this.spinner.hide();
              this.router.navigate(["/Role"]);
          })
    }

}
