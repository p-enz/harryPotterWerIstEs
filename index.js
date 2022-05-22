let pickCharacters = [];
let allCharacters = [];
const numberChosen = randomNum(4);
const hintIndices = shuffleArray([1, 2, 3, 4, 5]);
hintIndices.push(0); // we add index 0 that the name comes always last
let hintCounter = 0; // @Ulrike war bei dir nextHintIndex

let isGameOver = false;

const loseSound = new Audio("https://www.soundjay.com/buttons/beep-01a.mp3");
const winSound = new Audio("applause.mp3");
fetchHarryPotter("http://hp-api.herokuapp.com/api/characters");

async function fetchHarryPotter(url) {
  const response = await fetch(url);
  const data = await response.json();

  const finalDataSet = createAllCharactersArr(data);
  renderCharacters(finalDataSet);
  renderHints(finalDataSet);
}

// create Array of Characters we have
function createAllCharactersArr(characters) {
  allCharacters = characters
    .filter((character) => character.image.length > 0)
    .map(
      ({
        name,
        gender,
        hairColour = "unknown",
        house = "unkown",
        ancestry = "unknown",
        patronus = "unknown",
        image = "",
      }) => {
        return {
          Name: name,
          Gender: gender,
          "Hair Color": hairColour,
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
  const charsContainer = document.querySelector(".charContainer");

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
  const hintContainer = document.querySelector(".hintContainer");

  document.body.append(hintContainer);
  nextHint(pickCharacters);

  const nextBtn = document.querySelector("[data-js='nextHint_Person']");
  nextBtn.addEventListener("click", () => {
    if (isGameOver) {
      location.reload();
    } else {
      nextHint(pickCharacters);
    }
  });

  // button sound and check if i am right function
  pickCharacters.forEach((character, index) => {
    const checkBtn = document.querySelector(`#id${index}`);
    const checkImg = document.querySelector(`#img${index}`);
    checkBtn.addEventListener("click", () => {
      if (index === numberChosen) {
        checkImg.classList.toggle("blur");
        winSound.play();
        isGameOver = true;
        const nextBtn = document.querySelector("[data-js='nextHint_Person']");
        nextBtn.textContent = "Play Again";
      } else {
        loseSound.play();
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

function nextHint(data) {
  const hintContainer = document.querySelector(".hintContainer");
  const nextBtn = document.querySelector("[data-js='nextHint_Person']");
  const hint = document.createElement("p");
  const key = Object.keys(data[numberChosen])[hintIndices[hintCounter]];
  if (data[numberChosen][key] === "") {
    hint.textContent = `${key}: unkown`;
  } else {
    hint.textContent = `${key}: ${data[numberChosen][key]}`;
  }
  hintContainer.insertBefore(hint, hintContainer.firstChild);
  hintCounter++;
  console.log(hintCounter);
  if (hintCounter > 5) {
    nextBtn.textContent = "Play Again";
    isGameOver = true;
  }
}
