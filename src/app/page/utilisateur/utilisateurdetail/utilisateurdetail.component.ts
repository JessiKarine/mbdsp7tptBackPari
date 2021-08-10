import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { UtilisateurService } from '../../../services/utilisateur/utilisateur.service';
import { Utilisateur } from '../../../models/utilisateur';
import { Router } from '@angular/router';

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

  constructor(private route: ActivatedRoute, private router: Router, private utilisateurService: UtilisateurService) { }

  ngOnInit(): void {
    this.idUser = this.route.snapshot.paramMap.get('id');
    console.log("idUser eset " + this.idUser);
    this.getUtilisateurByIdUser(this.idUser);
  }

  getUtilisateurByIdUser(idUser:String){
    this.utilisateurService.getUtilisateurByIdUser(idUser)
        .subscribe(utilisateur => {
            this.utilisateurSelected = utilisateur as Utilisateur;
            this.login = this.utilisateurSelected.login;
            this.nom = this.utilisateurSelected.nom;
            this.prenom = this.utilisateurSelected.prenom;
            this.email = this.utilisateurSelected.email;
            this.numeroTelephone = this.utilisateurSelected.numeroTelephone;
        })
  }

  onUpdate(){
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
            this.router.navigate(["/Utilisateur"]);
        })
  }

  onDelete(){
    this.utilisateurService.deleteUtilisateurByIdUser(this.idUser)
        .subscribe(() => {
            console.log("utilisateur deleted");
            this.router.navigate(["/Utilisateur"]);
        })
  }

}
