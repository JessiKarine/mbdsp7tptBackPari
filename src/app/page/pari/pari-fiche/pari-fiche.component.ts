import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pari } from 'src/app/models/pari';
import { PariService } from 'src/app/services/pari/pari.service';
declare var $:any ; 
@Component({
  selector: 'app-pari-fiche',
  templateUrl: './pari-fiche.component.html',
  styleUrls: ['./pari-fiche.component.css']
})
export class PariFicheComponent implements OnInit {
  pari;
  constructor(private route: ActivatedRoute,private pariService : PariService) { }

  ngOnInit(): void {
    this.getPariById(this.route.snapshot.paramMap.get('id'));
  }
  toggleModalUser(): void { 
    $('#modalUser').modal('show');
  }

  getPariById(idPari : String){
    this.pariService.getPariById(idPari)
    .subscribe(data => {
        this.pari = data as Pari;
    });
  }
}
