import { Component, OnInit } from '@angular/core';
import { MatchService } from '../../../services/match/match.service';
import { Match } from '../../../models/match';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  matchList = null;
  page: number=1;
  limit: number=10;
  totalDocs: number;
  totalPages: number;
  hasPrevPage: boolean;
  prevPage: number;
  hasNextPage: boolean;
  nextPage: number;
  searchedTerm : String;
  constructor(private router:Router,private matchService:MatchService, private spinner: NgxSpinnerService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.page = +queryParams.page || 1;
      this.limit = +queryParams.limit || 10;
      this.getAllMatch();
    });
   
  }

  //récupération la liste des match
  getAllMatch(){
    this.spinner.show();
    this.matchService.getMatchPaginer(this.page, this.limit)
        .subscribe(data => {
            this.matchList = data.docs as Match[];
            this.page = data.page;
            this.limit = data.limit;
            this.totalDocs = data.totalDocs;
            this.totalPages = data.totalPages;
            this.hasPrevPage = data.hasPrevPage;
            this.prevPage = data.prevPage;
            this.hasNextPage = data.hasNextPage;
            this.nextPage = data.nextPage;
            this.spinner.hide();

        });
  }


  premierePage() {
    this.router.navigate(['/Match'], {
      queryParams: {
        page:1,
        limit:this.limit,
      }
    });
  }

  pageSuivante() {
    this.router.navigate(['/Match'], {
      queryParams: {
        page:this.nextPage,
        limit:this.limit,
      }
    });
  }


  pagePrecedente() {
    this.router.navigate(['/Match'], {
      queryParams: {
        page:this.prevPage,
        limit:this.limit,
      }
    });
  }

  dernierePage() {
    this.router.navigate(['/Match'], {
      queryParams: {
        page:this.totalPages,
        limit:this.limit,
      }
    });
  }



}
