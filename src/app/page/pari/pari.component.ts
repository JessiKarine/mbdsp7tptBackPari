import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pari } from 'src/app/models/pari';
import { PariService } from 'src/app/services/pari/pari.service';
declare var $ : any ; 
@Component({
  selector: 'app-pari',
  templateUrl: './pari.component.html',
  styleUrls: ['./pari.component.css']
})
export class PariComponent implements OnInit {
  pariList;
  page: number=1;
  limit: number=10;
  totalDocs: number;
  totalPages: number;
  hasPrevPage: boolean;
  prevPage: number;
  hasNextPage: boolean;
  nextPage: number;
  searchedTerm : String;
  constructor( private router:Router,private pariService : PariService,
     private spinner: NgxSpinnerService, private route:ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.page = +queryParams.page || 1;
      this.limit = +queryParams.limit || 10;
      this.getParis();
      
    });
  }

  updateSearchFilter(newFilter : string) { 
    this.searchedTerm = newFilter
  }
  getParis() {
    this.spinner.show();
    this.pariService.getParis(this.page, this.limit)
    .subscribe(data => {
        this.pariList = data.docs as Pari[];
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
    this.router.navigate(['/Pari'], {
      queryParams: {
        page:1,
        limit:this.limit,
      }
    });
  }

  pageSuivante() {
    this.router.navigate(['/Pari'], {
      queryParams: {
        page:this.nextPage,
        limit:this.limit,
      }
    });
  }


  pagePrecedente() {
    this.router.navigate(['/Pari'], {
      queryParams: {
        page:this.prevPage,
        limit:this.limit,
      }
    });
  }

  dernierePage() {
    this.router.navigate(['/Pari'], {
      queryParams: {
        page:this.totalPages,
        limit:this.limit,
      }
    });
  }

}
