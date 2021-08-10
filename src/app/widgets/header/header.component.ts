import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/models/utilisateur';
import { LoggingService } from 'src/app/services/utilisateur/logging.service';
import { Config } from 'src/app/utilitaire/config.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuOpen = false ; 
  usersession;
  constructor( private router:Router,private loggingService:LoggingService) { }

  ngOnInit(): void {
    this.usersession = JSON.parse(localStorage.getItem(Config.getLocalStorageKey("user")));
  }
  toggleMenu(): void { 
    this.menuOpen = !this.menuOpen;
  }
  deconnecter() : void {
    this.loggingService.logout();
    this.router.navigate(["/Deconnexion"]);
  }
}
