const places = ['FROG', 'Camera din Față', 'Sloane', 'FruFru'];
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getPlacesNames = async () => {
    await delay(2000);
    return places;
  };
  
const getPlacesTypes = async (initialPlaces) => {
    await delay(2000);
    const placesWithTypes = initialPlaces.map((place) => ({
        name: place,
        isCoffeeShop: place.length % 2 ? true : false,
    }));
    return placesWithTypes;
};
  
const getDinosaursColor = async (dinosaursWithAge) => {
    await delay(2000);
    const dinosaursWithColor = dinosaursWithAge.map((dinosaur) => ({
      ...dinosaur,
      color: dinosaur.age % 2 ? "brown" : "blue",
    }));
    return dinosaursWithColor;
};
  
const printPlacesInfo = (placesWithTypes) => {
    console.log(`Places with types: `);
    placesWithTypes.forEach((place) => {
      console.log(place);
    });
};
  
  
async function main() {
    try {
      const initialPlaces = await getPlacesNames();
      const placesWithTypes = await getPlacesTypes(initialPlaces);
      printPlacesInfo(placesWithTypes);
    } catch (error) {
      console.error(error);
    }
}
  
main();