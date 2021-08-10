import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { UtilisateurService } from '../../../services/utilisateur/utilisateur.service';
import { Utilisateur } from '../../../models/utilisateur';

@Component({
  selector: 'app-utilisateurdetail',
  templateUrl: './utilisateurdetail.component.html',
  styleUrls: ['./utilisateurdetail.component.css']
})
export class UtilisateurdetailComponent implements OnInit {
  idUser : String;
  utilisateurSelected : Utilisateur;
  login : String;
  constructor(private route: ActivatedRoute, private utilisateurService: UtilisateurService) { }

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
        })
  }

}
