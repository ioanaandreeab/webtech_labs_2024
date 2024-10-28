const getDinosaurs = (callback) => {
  // simulate the async retrieval of dinosaurs
  setTimeout(() => {
    const dinosaurs = ["Apatosaurus", "Tyrannosaurus", "Giganotosaurus", "Allosaurus"];
    callback(dinosaurs);
  }, 2000);
};

const getDinosaursAge = (dinosaurs, callback) => {
  // simulate the async retrieval of dinosaurs age
  setTimeout(() => {
    const dinosaursWithAge = dinosaurs.map((dinosaur) => ({
      name: dinosaur,
      age: Math.trunc(Math.random() * 20) + 1,
    }));
    callback(dinosaursWithAge);
  }, 2000);
};

const getDinosaursColor = (dinosaursWithAge, callback) => {
  // simulate the async retrieval of dinosaurs color
  setTimeout(() => {
    const dinosaursWithColor = dinosaursWithAge.map((dinosaur) => ({
      ...dinosaur,
      color: dinosaur.age % 2 ? "brown" : "blue",
    }));
    callback(dinosaursWithColor);
  }, 2000);
};

const displayDinosaurs = (dinosaursWithColor) => {
  console.log(`Dinosaurs with age and color: `);
  for (dinosaur of dinosaursWithColor) {
    console.log(dinosaur);
  }
};

getDinosaurs((dinosaurs) => {
  getDinosaursAge(dinosaurs, (dinosaursWithAge) => {
    getDinosaursColor(dinosaursWithAge, (dinosaursWithColor) => {
      displayDinosaurs(dinosaursWithColor);
    })
  })
});
