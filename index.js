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
    personContainer.classList.add("positioning");
    personContainer.innerHTML = `
    <img id="img${index}" class="blur"  src=${pickCharacters[index].image} alt="">
        <button id="id${index}" type="button" class="btn" >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path fill="#ff9e80" d="M16.544,11c0,0-12.561,0-10.561,11c2-3,4-1,5,0c1.581,1.581,3.561,2,5.561,1S16.544,11,16.544,11z"></path>
              <path fill="#ffccbc" d="M16.544,11c0,0,0.243,1.219,0.475,2.846C13.388,13.741,5.984,14.452,5.984,22 C2.984,10,16.544,11,16.544,11z"></path>
              <path fill="#37474f" d="M24,45l-0.001-0.002"></path>
              <path fill="#ff9e80" d="M24,30L24,30c-6.627,0-12,7.373-12,14v0h24v0C36,37.373,30.627,30,24,30z"></path>
              <path fill="#ff9e80" d="M31.439,11C31.439,11,44,11,42,22c-2-3-4-1-5,0c-1.581,1.581-3.561,2-5.561,1S31.439,11,31.439,11z"></path>
              <path fill="#ffccbc" d="M34,15.725c0-3.536-2.727-6.402-6.175-7.344c-2.592-0.499-5.143-0.517-7.65,0 C16.727,9.323,14,12.19,14,15.725l0.728,6.196c0.119,1.009,0.49,1.967,1.078,2.78L20.364,31L24,25.96L27.636,31l4.557-6.299 c0.588-0.813,0.96-1.771,1.078-2.78L34,15.725z"></path>
              <ellipse cx="19" cy="17.5" fill="#f5f5f5" rx="4" ry="2.5"></ellipse>
              <ellipse cx="29" cy="17.5" fill="#f5f5f5" rx="4" ry="2.5"></ellipse>
              <circle cx="19" cy="17" r="2" fill="#aed581"></circle>
              <circle cx="29" cy="17" r="2" fill="#aed581"></circle>
              <path fill="#784719" d="M18,17c0,0.551,0.448,1,1,1s1-0.449,1-1s-0.448-1-1-1S18,16.449,18,17"></path>
              <path fill="#784719" d="M28,17c0,0.551,0.448,1,1,1s1-0.449,1-1s-0.448-1-1-1S28,16.449,28,17"></path>
              <circle cx="24" cy="28" r="5" fill="#ffccbc"></circle>
              <path fill="#ff9e80" d="M24,19c0,0-2,2.222-2,6.667s4,4.444,4,0C26,22.333,24,19,24,19z"></path>
              <path fill="#ff9e80" d="M26.5,27h-5c-0.828,0-1.5-0.672-1.5-1.5v0c0-0.828,0.672-1.5,1.5-1.5h5c0.828,0,1.5,0.672,1.5,1.5v0 C28,26.328,27.328,27,26.5,27z"></path>
              <path fill="#ff9e80" d="M24.085,30.948c-0.686,0-1.399-0.056-2.15-0.168l0.131-0.885c1.411,0.211,2.673,0.211,3.857,0.002 l0.154,0.881C25.436,30.892,24.774,30.948,24.085,30.948z"></path>
              <path fill="#bdbdbd" d="M20,31c-0.009-0.02-0.015-0.037-0.024-0.057c-1.068,0.506-2.07,1.188-2.976,2.013V44h19 c0-2.427-0.726-4.95-1.964-7.178C30.643,37.977,23.69,39.118,20,31z"></path>
              <path fill="#ffccbc" d="M31.439,11c0,0-0.243,1.219-0.475,2.846C34.596,13.741,42,14.452,42,22C45,10,31.439,11,31.439,11z"></path>
        </svg>
        </button>
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
        nextBtn.innerHTML = `Play 
    <svg class="flashlight"
viewBox="0 0 24 24"
style=" fill:#000000;"><path d="M7.696,23c-0.161,0-0.323-0.039-0.472-0.119c-0.419-0.225-0.622-0.713-0.485-1.169l2.853-9.501l-3.477,0.497 c-0.752,0.107-1.492-0.214-1.926-0.84s-0.478-1.43-0.113-2.098L8.102,1.56C8.27,1.217,8.619,1,9,1h6c0.36,0,0.693,0.193,0.87,0.507 c0.178,0.314,0.173,0.699-0.013,1.008l-1.961,3.269l4.507-0.501C19.218,5.195,20,5.602,20.388,6.327s0.296,1.601-0.233,2.23 L8.466,22.639C8.271,22.874,7.986,23,7.696,23z M11,10c0.289,0,0.566,0.125,0.758,0.348c0.222,0.259,0.297,0.613,0.199,0.94 l-1.888,6.288L18.62,7.275l-6.51,0.719c-0.382,0.038-0.747-0.134-0.952-0.454c-0.205-0.32-0.211-0.729-0.016-1.055L13.234,3h-3.61 l-3.771,7.689l5.005-0.68C10.906,10.003,10.953,10,11,10z"></path><path d="M15,2H9l-4.045,8.249c-0.394,0.723,0.205,1.585,1.019,1.469L11,11L7.697,22L19.39,7.914 c0.581-0.691,0.022-1.737-0.876-1.638L12,7L15,2z" opacity=".35"></path></svg>
    Again`;
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
  document.querySelector(".hintContainer").scrollIntoView();
  const nextBtn = document.querySelector("[data-js='nextHint_Person']");
  const hint = document.createElement("p");
  const key = Object.keys(data[numberChosen])[hintIndices[hintCounter]];
  if (data[numberChosen][key] === "") {
    hint.textContent = `${key}: unkown`;
  } else {
    hint.textContent = `${key}: ${data[numberChosen][key]}
    `;
  }
  hintContainer.insertBefore(hint, hintContainer.firstChild);
  hintCounter++;
  console.log(hintCounter);
  if (hintCounter > 5) {
    nextBtn.innerHTML = `Play 
    <svg class="flashlight"
viewBox="0 0 24 24"
style=" fill:#000000;"><path d="M7.696,23c-0.161,0-0.323-0.039-0.472-0.119c-0.419-0.225-0.622-0.713-0.485-1.169l2.853-9.501l-3.477,0.497 c-0.752,0.107-1.492-0.214-1.926-0.84s-0.478-1.43-0.113-2.098L8.102,1.56C8.27,1.217,8.619,1,9,1h6c0.36,0,0.693,0.193,0.87,0.507 c0.178,0.314,0.173,0.699-0.013,1.008l-1.961,3.269l4.507-0.501C19.218,5.195,20,5.602,20.388,6.327s0.296,1.601-0.233,2.23 L8.466,22.639C8.271,22.874,7.986,23,7.696,23z M11,10c0.289,0,0.566,0.125,0.758,0.348c0.222,0.259,0.297,0.613,0.199,0.94 l-1.888,6.288L18.62,7.275l-6.51,0.719c-0.382,0.038-0.747-0.134-0.952-0.454c-0.205-0.32-0.211-0.729-0.016-1.055L13.234,3h-3.61 l-3.771,7.689l5.005-0.68C10.906,10.003,10.953,10,11,10z"></path><path d="M15,2H9l-4.045,8.249c-0.394,0.723,0.205,1.585,1.019,1.469L11,11L7.697,22L19.39,7.914 c0.581-0.691,0.022-1.737-0.876-1.638L12,7L15,2z" opacity=".35"></path></svg>
    Again`;
    isGameOver = true;
  }
}
