import { Component, Input, OnInit } from '@angular/core';
import { Categorie } from '../../../models/categorie';

@Component({
  selector: 'app-categorietableaubody',
  templateUrl: './categorietableaubody.component.html',
  styleUrls: ['./categorietableaubody.component.css']
})
export class CategorietableaubodyComponent implements OnInit {
  @Input() categorieList : Categorie[];
  constructor() { }

  ngOnInit(): void {
  }

}
