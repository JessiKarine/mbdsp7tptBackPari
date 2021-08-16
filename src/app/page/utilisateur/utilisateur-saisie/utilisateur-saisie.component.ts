import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Role } from 'src/app/models/role';
import { Utilisateur } from 'src/app/models/utilisateur';
import { RoleService } from 'src/app/services/role/role.service';

@Component({
  selector: 'app-utilisateur-saisie',
  templateUrl: './utilisateur-saisie.component.html',
  styleUrls: ['./utilisateur-saisie.component.css']
})
export class UtilisateurSaisieComponent implements OnInit {
  utilisateurSelected : Utilisateur;
  login : String;
  password : String;
  nom : String;
  prenom : String;
  etat : String;
  email : String;
  numeroTelephone : String;
  imageProfil : String;
  idRole : Role;
  roleList : Role[];
  constructor(private roleService:RoleService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getAllRole();
  }

  getAllRole(){
    this.spinner.show();
    this.roleService.getRole()
        .subscribe(data => {
            this.roleList = data as Role[];
            this.spinner.hide();
        });
  }

}
