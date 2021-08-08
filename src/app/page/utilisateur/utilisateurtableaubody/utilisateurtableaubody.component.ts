import { Component, Input, OnInit } from '@angular/core';
import { Utilisateur } from '../../../models/utilisateur';

@Component({
  selector: 'app-utilisateurtableaubody',
  templateUrl: './utilisateurtableaubody.component.html',
  styleUrls: ['./utilisateurtableaubody.component.css']
})
export class UtilisateurtableaubodyComponent implements OnInit {
  @Input() utilisateurList : Utilisateur[];
  constructor() { }

  ngOnInit(): void {
  }

}
