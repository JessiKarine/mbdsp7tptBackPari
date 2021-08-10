import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggingService } from 'src/app/services/utilisateur/logging.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuOpen = false ; 
  constructor( private router:Router,private loggingService:LoggingService) { }

  ngOnInit(): void {
  }
  toggleMenu(): void { 
    this.menuOpen = !this.menuOpen;
  }
  deconnecter() : void {
    console.log("atooo am deconnexion");
    this.loggingService.logout();
    this.router.navigate(["/Deconnexion"]);
  }
}
