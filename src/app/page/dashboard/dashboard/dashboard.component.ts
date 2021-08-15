import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { GoogleChartComponent } from 'angular-google-charts'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title = 'Flux parieurs';  
  type = 'AreaChart';  
  data = [  
     ['10/08/2021', 5.0],  
     ['11/08/2021', 15],  
     ['12/08/2021', 48],  
     ['13/08/2021', 90],  
     ['14/08/2021', 63]  
  ];  
  //columnNames = ['Name', 'Percentage'];  
  options = {      
  };  
  width = 500;  
  height = 300;
  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

}
