// În fiecare lună în București se deschid restaurante și cafenele noi
// Scrie un program care folosește callbacks si simulează un comportament asincron
// pentru a prelua informații despre acestea

// funcția getPlacesNames va returna array-ul places cu numele acestea

// vom considera ulterior, că în cadrul funcției getPlacesTypes se determină
// dacă locul este o cafenea ori un restaurant
// programatic, dacă lungimea numelui locului este pară, atunci este cafenea
// se va adăuga în acest sens un câmp pentru fiecare loc denumit isCoffeeShop (valoare booleană)

// funcția printPlacesInfo va afișa la consolă numele localului și dacă este cafenea sau nu

const places = ['FROG', 'Camera din Față', 'Sloane', 'FruFru'];

const getPlacesNames = (callback) => {
    setTimeout(() => {
        callback(places);
    }, 2000);
};

const getPlacesTypes = (initialPlaces, callback) => {
    setTimeout(() => {
        const placesWithTypes = initialPlaces.map((place) => ({
            name: place,
            isCoffeeShop: place.length % 2 ? true : false
        }));
        callback(placesWithTypes);
    }, 2000);
}

const printPlacesInfo = (placesWithTypes) => {
    console.log(`Places with types: `);
    placesWithTypes.forEach((place) => {
        console.log(place);
    })
};

getPlacesNames((initialPlaces) => {
    getPlacesTypes(initialPlaces, (placesWithTypes) => {
        printPlacesInfo(placesWithTypes);
    });
});
