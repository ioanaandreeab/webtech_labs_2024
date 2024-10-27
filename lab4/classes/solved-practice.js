/* Muzeul a fost renovat, așa că trebuie să organizăm lucrările de artă!
Definește o clasă Artwork cu proprietățile author și year
Clasa Artwork trebuie să aibă metodele 
    - getArtworkDetails - printează informațiile despre artwork (year - author)
    - sellArtwork - primește numele unui cumpărător și printează un mesaj de confirmare a vânzării

Definește o clasă Painting care să extindă clasa Artwork
Clasa Painting trebuie să aibă o proprietate în plus: type (landscape, portrait, etc)
Clasa Painting trebuie să aibă metodele
    - getArtworkDetails - printează toate informațiile despre artwork (year - author - type)
    - sellArtwork - primește numele unui cumpărător, dar trebuie să printeze faptul că tablourile nu sunt de vânzare
*/

class Artwork {
    constructor(author, year) {
        this.author = author;
        this.year = year;
    }

    getArtworkDetails() {
        console.log(`This painting was created by ${this.author} in ${this.year}`)
    }

    sellArtwork(name) {
        console.log(`Congrats, ${name}! You've just bought an artwork!`);
    }
}

class Painting extends Artwork {
    constructor(author, year, type) {
        super(author, year);
        this.type = type;
    }

    getArtworkDetails() {
        console.log(`This painting was created by ${this.author} in ${this.year} and its type is ${this.type}`);
    }

    sellArtwork(name) {
        console.log(`Sorry, ${name} :(! You can't buy a painting`);
    }
}


// test
const myArtwork = new Artwork("Picasso", 1892);
myArtwork.getArtworkDetails();
myArtwork.sellArtwork("Ioana");

const myPainting = new Painting("Paul Gauguin", 1870, "acrylic");
myPainting.getArtworkDetails();
myPainting.sellArtwork("Ioana");
