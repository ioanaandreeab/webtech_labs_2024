const places = ['FROG', 'Camera din Față', 'Sloane', 'FruFru'];

const getPlacesNames = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(places);
    }, 2000);
  });
};

const getPlacesTypes = (initialPlaces) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const placesWithTypes = initialPlaces.map((place) => ({
        name: place,
        isCoffeeShop: place.length % 2 ? true : false,
      }));
      resolve(placesWithTypes);
    }, 2000);
  });
};

const printPlacesInfo = (placesWithTypes) => {
  console.log(`Places with types: `);
  placesWithTypes.forEach((place) => {
    console.log(place);
  });
};

getPlacesNames()
  .then((initialPlaces) => {
    return getPlacesTypes(initialPlaces);
  })
  .then((placesWithTypes) => {
    printPlacesInfo(placesWithTypes);
  })
  .catch((error) => {
    console.error(error);
  });
