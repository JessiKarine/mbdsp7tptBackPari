import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../../../services/utilisateur/utilisateur.service';
import { Utilisateur } from '../../../models/utilisateur';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {

  utilisateurList = null;
  constructor(private utilisateurService:UtilisateurService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getAllUtilisateur();
  }

  //récupération la liste des utilisateur
  getAllUtilisateur(){
    this.spinner.show();
    this.utilisateurService.getAllUtilisateur()
        .subscribe(data => {
            console.log("dans utilisateur component, liste des utilisateurs = " + data);
            this.utilisateurList = data as Utilisateur[];
            this.spinner.hide();

        });
  }

}
