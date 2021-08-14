import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../../../services/categorie/categorie.service';
import { Categorie } from '../../../models/categorie';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

  categorieList = null;
  constructor(private categorieService:CategorieService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getAllCategorie();
  }

  //récupération la liste des utilisateur
  getAllCategorie(){
    this.spinner.show();
    this.categorieService.getCategorie()
        .subscribe(data => {
            console.log("dans utilisateur component, liste des utilisateurs = " + data);
            this.categorieList = data as Categorie[];
            this.spinner.hide();

        });
  }

}
