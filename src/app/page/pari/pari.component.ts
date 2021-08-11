import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private pariService : PariService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getParis();
  }

  getParis() {
    this.spinner.show();
    this.pariService.getParis()
    .subscribe(data => {
        this.pariList = data.docs as Pari[];
        this.spinner.hide();
    });
  }

}
