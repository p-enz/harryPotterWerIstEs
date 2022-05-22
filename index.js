let pickCharacters = [];
let allCharacters = [];
const numberChosen = randomNum(4);

const audio = new Audio("https://www.soundjay.com/buttons/beep-01a.mp3");
const magic = new Audio("applause.mp3");

const test = fetchHarryPotter("http://hp-api.herokuapp.com/api/characters");

async function fetchHarryPotter(url) {
  const response = await fetch(url);
  const data = await response.json();

  renderCharacters(createAllCharactersArr(data));
  renderHints(createAllCharactersArr(data));
}

// create Array of Characters we have
function createAllCharactersArr(characters) {
  allCharacters = characters
    .filter((character) => character.image.length > 0)
    .map(
      ({
        name,
        gender,
        hairColor = "unknown",
        house = "unkown",
        ancestry = "unknown",
        patronus = "unknown",
        image = "",
      }) => {
        return {
          Name: name,
          Gender: gender,
          "Hair Color": hairColor,
          House: house,
          Ancestry: ancestry,
          Patronus: patronus,
          image: image,
        };
      }
    );
  return shuffleArray(allCharacters);
}
function renderCharacters(pickCharacters) {
  const charsContainer = document.createElement("section");
  charsContainer.classList.add("charContainer");

  for (let index = 0; index < 4; index++) {
    const personContainer = document.createElement("div");
    personContainer.innerHTML = `
    <img id="img${index}" class="blur"  src=${pickCharacters[index].image} alt="">
    <div class="btn-container">
        <button id="id${index}" type="button"class="btn" >&#9989</button>
    </div>
    `;
    charsContainer.append(personContainer);
  }
  document.body.append(charsContainer);
}

function renderHints(pickCharacters) {
  const hintContainer = document.createElement("section");
  hintContainer.classList.add("hintContainer");
  // const {
  //   gender = "Unknown",
  //   hairColor = "Unknown",
  //   house = "Unknown",
  //   ancestry = "Unknown",
  //   patronus = "Unknown",
  // } = pickCharacters[numberChosen];
  let hintChosen = [gender, hairColor, house, ancestry, patronus]; // wie kommen wir an die keys von object
  hintContainer.innerHTML = `
    <p>Gender: ${hintChosen[0]}</p>
    <p id="hint2">Hair Color: ${hintChosen[1]}</p>
    <p id="hint3">House: ${hintChosen[2]}</p>
    <p id="hint4">Ancestry: ${hintChosen[3]}</p>
    <p id="hint4">Patronus: ${hintChosen[4]}</p>
    <p id="hint5">Name: ${pickCharacters[numberChosen].name}</p>
    <button type="button" data-js="nextPerson">Next Person</button>
    `;

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

//replace pickCharacter()
function shuffleArray(array) {
  for (let i = 0; i < array.length; i++) {
    const temp = array[i];
    const switchIndex = randomNum(array.length);
    array[i] = array[switchIndex];
    array[switchIndex] = temp;
  }
  return array;
}
