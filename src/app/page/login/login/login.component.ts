import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Utilisateur } from 'src/app/models/utilisateur';
import { LoggingService } from 'src/app/services/utilisateur/logging.service';
import { Config } from 'src/app/utilitaire/config.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public username = null;
  public password = null;
  public error = null;
  constructor(private router:Router, private loggingService:LoggingService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  onSubmit(event) {
    if((!this.username) || (!this.password)) return;
   let user = new Utilisateur();
   user.login = this.username;
   user.password = this.password;
   this.error=null;
   this.spinner.show();
   this.loggingService.login(user)
   .subscribe(reponse => {
    localStorage.setItem(Config.getLocalStorageKey("user"),JSON.stringify(reponse));
    this.spinner.hide();
    this.router.navigate(["/Pari"]);
  },err => {
    this.error = err.error.error;
    this.spinner.hide();
  });
}
}
