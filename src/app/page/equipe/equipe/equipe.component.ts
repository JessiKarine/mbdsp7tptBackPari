import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Equipe } from 'src/app/models/equipe';
import { EquipeService } from 'src/app/services/equipe/equipe.service';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})
export class EquipeComponent implements OnInit {
  equipeList;
  searchedTerm : String;
  constructor(private equipeService : EquipeService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getEquipe();
  }

  getEquipe(){
    this.spinner.show();
    this.equipeService.getEquipe()
    .subscribe(data => {
      console.log("dans utilisateur component, liste des utilisateurs = " + data);
      this.equipeList = data as Equipe[];
      this.spinner.hide();

  });
  }
  updateSearchFilter(newFilter : string) { 
    this.searchedTerm = newFilter
  }

}
