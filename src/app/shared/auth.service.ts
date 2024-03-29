import { Injectable } from '@angular/core';
import { Config } from '../utilitaire/config.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = false;
  admin = false;

  constructor() {}

  logIn(login, password) {
    // typiquement, acceptera en paramètres un login et un password
    // vérifier qu'ils sont ok, et si oui, positionner la propriété loggedIn à true
    // si login/password non valides, positionner à false;

    if (login === 'admin') this.admin = true;

    this.loggedIn = true;
  }

  logOut() {
    this.loggedIn = false;
    this.admin = false;
  }

  // exemple d'utilisation :
  // isAdmin.then(admin => { console.log("administrateur : " + admin);})
  isAdmin() {
    return new Promise((resolve, reject) => {
      resolve(this.admin);
    });
  }

  getUser() {
    return new Promise((resolve, reject) => {
      const user=JSON.parse(localStorage.getItem(Config.getLocalStorageKey("user")));
    //  console.log("usera",user);
      resolve(user);
    });
  }
}
