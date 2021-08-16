import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { GoogleChartComponent } from 'angular-google-charts'; 
import { PariService } from 'src/app/services/pari/pari.service';
import { Dashboard } from 'src/app/models/Dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title = 'Flux parieurs';  
  type = 'PieChart';  
  data = [  
   
  ];  
  //columnNames = ['Name', 'Percentage'];  
  options = {      
  };  
  width = 1000;  
  height = 500;
  constructor(private spinner: NgxSpinnerService,private pariService : PariService) { }

  ngOnInit(): void {
    this.countpariParMatch();
  }

  countpariParMatch(){
    this.spinner.show();
    this.pariService.countpariParMatch()
    .subscribe((data : Dashboard[]) => {
        console.log("data dashboard : ", data);
        let newData  = [];
        data.forEach((item) => { 
            let tempData = [];
            tempData.push(`(${item._id.idcategorie.nom}) ${item._id.idequipe1.nom} VS ${item._id.idequipe2.nom}`);
            tempData.push(item.count);
            newData.push(tempData);
        });
        this.data = newData;
        this.spinner.hide();
    })
  }

}
