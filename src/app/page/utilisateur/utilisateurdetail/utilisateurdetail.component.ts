import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-utilisateurdetail',
  templateUrl: './utilisateurdetail.component.html',
  styleUrls: ['./utilisateurdetail.component.css']
})
export class UtilisateurdetailComponent implements OnInit {
  idUser : String;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idUser = this.route.snapshot.paramMap.get('id');
    console.log("idUser eset " + this.idUser);
  }

}
