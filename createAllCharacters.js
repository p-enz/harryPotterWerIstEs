let pickCharacters = [];
let allCharacters = [];

function createAllCharactersArr(characters) {
  allCharacters = characters
    .filter((character) => character.image.length > 0)
    .map(
      ({
        name,
        gender,
        hairColor = "",
        house = "",
        ancestry = "",
        patronus = "",
        image = "",
      }) => {
        return {
          name: name,
          gender: gender,
          hairColor: hairColor,
          house: house,
          ancestry: ancestry,
          patronus: patronus,
          image: image,
          theChosenOne: false,
        };
      }
    );
  pickCharacter(allCharacters);
}

function pickCharacter(allCharacters) {
  for (let i = 0; i < 5; i++) {
    const random = Math.floor(Math.random() * allCharacters.length);
    pickCharacters.push(
      allCharacters.find((character, index) => {
        if (index === random) {
          return character;
        }
      })
    );
  }
  console.log(pickCharacters);
  return pickCharacters;
}

export { createAllCharactersArr };
