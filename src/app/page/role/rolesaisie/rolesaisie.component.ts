import { Component, OnInit, Inject, Input} from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router'
import { RoleService } from '../../../services/role/role.service';
import { Role } from '../../../models/Role';
import { NgxSpinnerService } from "ngx-spinner";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface DialogData {
  description: string;
  titre: string ;
  roleData : Object;
  typeOperation: Number;
  idUser: string;
}

@Component({
  selector: 'app-rolesaisie',
  templateUrl: './rolesaisie.component.html',
  styleUrls: ['./rolesaisie.component.css']
})
export class RolesaisieComponent implements OnInit {
  nom : string;
  rang : string ;
  
  idRole : String;
  roleToCreate : Role;
  titre:String;
  desc:String;

  

  constructor(private route: ActivatedRoute,
              public dialog: MatDialog,
              private roleService: RoleService,
              private spinner: NgxSpinnerService
              , private router: Router) { }
 
  ngOnInit(): void {
    this.idRole = this.route.snapshot.paramMap.get('id');
    this.roleToCreate=new Role();
    
    //this.getMatchById(this.idMatch);
  }
  createRole(){
    this.spinner.show();

    this.roleToCreate.nom=this.nom;
    this.roleToCreate.rang=this.rang;
    this.roleService.createRole(this.roleToCreate)  
      .subscribe(categorieToCreate => {
        this.router.navigate(["/Role/" ]);
        this.spinner.hide();
    })  
  }
}
  
