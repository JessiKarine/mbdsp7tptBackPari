import { Component, OnInit } from '@angular/core';
import { MatchService } from '../../../services/match/match.service';
import { Match } from '../../../models/match';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  matchList = null;
  constructor(private matchService:MatchService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getAllMatch();
  }

  //récupération la liste des match
  getAllMatch(){
    this.spinner.show();
    this.matchService.getMatch()
        .subscribe(data => {
            console.log("dans match component, liste des match = " + data);
            this.matchList = data as Match[];
            this.spinner.hide();

        });
  }

}
