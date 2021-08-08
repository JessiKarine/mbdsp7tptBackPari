import { Role } from "./role";

export class Utilisateur{
    _id : String;
    login : String;
    password : String;
    nom : String;
    prenom : String;
    etat : String;
    email : String;
    numeroTelephone : String;
    imageProfil : String;
    idRole : Role;
}