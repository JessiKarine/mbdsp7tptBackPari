import { Categorie } from "./categorie";
import { Equipe } from "./equipe";


export class Match{
    _id : String;
    date : string;
    heure : string;
    idcategorie : Categorie;
    idequipe1 : Equipe;
    coteequipe1 : Number;
    idequipe2 : Equipe;
    coteequipe2 : Number;
    etat : string;
    coteMatchNull : Number;
    public constructor() {
        this.idcategorie = new Categorie();
        this.idequipe1 = new Equipe();
        this.idequipe2 = new Equipe();
    }
}