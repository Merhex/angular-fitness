export class Oefening{
    naam: string;
    titel: string;
    beschrijving: string;
    tijdsduur: number;
    constructor(naam: string, titel: string, beschrijving: string, tijdsduur: number){
        console.log(naam);
        this.naam = naam;
        this.titel = titel;
        this.beschrijving = beschrijving;
        this.tijdsduur = tijdsduur;
    }
}
