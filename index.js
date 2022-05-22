let pickCharacters = [];
let allCharacters = [];
let numberChosen = 0;

const audio = new Audio("https://www.soundjay.com/buttons/beep-01a.mp3");
const magic = new Audio("applause.mp3");

const test = fetchHarryPotter("http://hp-api.herokuapp.com/api/characters");

async function fetchHarryPotter(url) {
  const response = await fetch(url);
  const data = await response.json();

  renderCards(createAllCharactersArr(data));
}
// test.then((test2) => console.log(test2));

// create Array of Charakters we have
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
  return pickCharacter(allCharacters);
}

// pick four characters to show
function pickCharacter(allCharacters) {
  for (let i = 0; i < 4; i++) {
    const rando = randomNum(allCharacters.length);
    pickCharacters.push(
      allCharacters.find((character, index) => {
        if (index === rando) {
          return character;
        }
      })
    );
  }
  return pickCharacters;
}

// render images and hint list
function renderCards(pickCharacters) {
  const charsContainer = document.createElement("section");
  const hintContainer = document.createElement("section");

  charsContainer.classList.add("charContainer");
  hintContainer.classList.add("hintContainer");

  pickCharacters.forEach((character, index) => {
    const charContainer = document.createElement("div");
    charContainer.innerHTML = `
    <img id="img${index}" class="blur"  src=${character.image} alt="">
    <div class="btn-container">
        <button id="id${index}" type="button"class="btn" >&#9989</button>
    </div>
    `;
    charsContainer.append(charContainer);
  });

  numberChosen = randomNum(4);
  pickCharacters[numberChosen].theChosenOne = true;

  const {
    gender = "Unknown",
    hairColor = "Unknown",
    house = "Unknown",
    ancestry = "Unknown",
    patronus = "Unknown",
  } = pickCharacters[numberChosen];
  let hintChosen = [gender, hairColor, house, ancestry, patronus]; // wie kommen wir an die keys von object
  console.log(Object.keys(pickCharacters[numberChosen]));

  hintContainer.innerHTML = `
    <p>Gender: ${hintChosen[0]}</p>
    <p id="hint2">Hair Color: ${hintChosen[1]}</p>
    <p id="hint3">House: ${hintChosen[2]}</p>
    <p id="hint4">Ancestry: ${hintChosen[3]}</p>
    <p id="hint4">Patronus: ${hintChosen[4]}</p>
    <p id="hint5">Name: ${pickCharacters[numberChosen].name}</p>
    <button type="button" data-js="nextPerson">Next Person</button>
    `;

  document.body.append(charsContainer);
  document.body.append(hintContainer);

  const nextPersonBtn = document.querySelector("[data-js='nextPerson']");
  nextPersonBtn.addEventListener("click", () => {
    location.reload();
  });

  // button sound and check if i am right function
  pickCharacters.forEach((character, index) => {
    const checkBtn = document.querySelector(`#id${index}`);
    const checkImg = document.querySelector(`#img${index}`);
    checkBtn.addEventListener("click", () => {
      if (index === numberChosen) {
        checkImg.classList.toggle("blur");
        magic.play();
      } else {
        audio.play();
      }
    });
  });
}

function randomNum(num) {
  return Math.floor(Math.random() * num);
}
