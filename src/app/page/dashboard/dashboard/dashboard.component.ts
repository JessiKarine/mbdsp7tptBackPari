import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { GoogleChartComponent } from 'angular-google-charts'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title = 'googlechart';  
  type = 'AreaChart';  
  data = [  
     ['Name1', 5.0],  
     ['Name2', 36.8],  
     ['Name3', 42.8],  
     ['Name4', 18.5],  
     ['Name5', 16.2]  
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
