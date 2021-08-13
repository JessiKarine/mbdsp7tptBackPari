import { Component, Input, OnInit } from '@angular/core';
import { Match } from '../../../models/match';

@Component({
  selector: 'app-matchtableaubody',
  templateUrl: './matchtableaubody.component.html',
  styleUrls: ['./matchtableaubody.component.css']
})
export class MatchtableaubodyComponent implements OnInit {
  @Input() matchList : Match[];
  constructor() { }

  ngOnInit(): void {
  }

}
