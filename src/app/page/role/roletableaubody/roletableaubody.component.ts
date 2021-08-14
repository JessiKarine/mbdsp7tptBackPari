import { Component, Input, OnInit } from '@angular/core';
import { Role } from '../../../models/role';

@Component({
  selector: 'app-roletableaubody',
  templateUrl: './roletableaubody.component.html',
  styleUrls: ['./roletableaubody.component.css']
})
export class RoletableaubodyComponent implements OnInit {
  @Input() roleList : Role[];
  constructor() { }

  ngOnInit(): void {
  }

}
