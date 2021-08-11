import { Equipe } from "./equipe";
import { Match } from "./match";
import { Role } from "./role";
import { Utilisateur } from "./utilisateur";

export class Pari{
    _id : String;
    idMatch : Match;
    idEquipe : Equipe;
    idUser : Utilisateur;
    prenom : String;
    mise : Number;
    public constructor() {
        this.idEquipe = new Equipe();
        this.idUser = new Utilisateur();
        this.idMatch = new Match();
    }
}