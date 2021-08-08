import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../../../services/utilisateur/utilisateur.service';
import { Utilisateur } from '../../../models/utilisateur';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {

  utilisateurList = null;
  constructor(private utilisateurService:UtilisateurService) { }

  ngOnInit(): void {
    this.getAllUtilisateur();
  }

  //récupération la liste des utilisateur
  getAllUtilisateur(){
    this.utilisateurService.getAllUtilisateur()
        .subscribe(data => {
            console.log("dans utilisateur component, liste des utilisateurs = " + data);
            this.utilisateurList = data as Utilisateur[];

        });
  }

}
