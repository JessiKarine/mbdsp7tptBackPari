import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Match } from 'src/app/models/match';
import { Pari } from 'src/app/models/pari';
import { Utilisateur } from 'src/app/models/utilisateur';
import { MatchService } from 'src/app/services/match/match.service';
import { PariService } from 'src/app/services/pari/pari.service';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';
declare var $:any ; 
@Component({
  selector: 'app-pari-fiche',
  templateUrl: './pari-fiche.component.html',
  styleUrls: ['./pari-fiche.component.css']
})
export class PariFicheComponent implements OnInit {
  pari;
  utilisateurList;
  matchList;

  constructor(private utilisateurService:UtilisateurService,
    private route: ActivatedRoute,private pariService : PariService,private matchService : MatchService) { }

  ngOnInit(): void {
    this.getPariById(this.route.snapshot.paramMap.get('id'));
  }
  toggleModalUser(): void { 
    this.getAllUtilisateur();
    $('#modalUser').modal('show');
  }
  toggleModalMatch(): void { 
    this.getAllMatch();
    $('#modalMatch').modal('show');
  }

  getPariById(idPari : String){
    this.pariService.getPariById(idPari)
    .subscribe(data => {
        this.pari = data as Pari;
    });
  }

  getAllUtilisateur(){
    this.utilisateurService.getAllUtilisateur()
        .subscribe(data => {
            this.utilisateurList = data as Utilisateur[];

        });
  }

  getAllMatch(){
    this.matchService.getMatch()
        .subscribe(data => {
            console.log("dans match component, liste des matchs = " + data);
            this.matchList = data as Match[];
        });
  }
}
