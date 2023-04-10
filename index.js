const registrationWindow = document.querySelector(".registration-window");
const registrationForm = document.querySelector(".registration-form");
const registrationName = document.querySelector("#user-name");
const registrationEmail = document.querySelector("#user-email");
const warning = document.querySelector(".registration-warning");
const userLogin = document.querySelector(".user-login");
const userLevel = document.querySelector(".user-level");
const userScores = document.querySelector(".user-scores");
const villainBlock = document.querySelector(".villain-container");
const villainButton = document.querySelector(".villain-button");
const enemyHpBlock = document.querySelector(".enemy-statistics");
const enemyHp = document.querySelector(".enemy-hp");
const bodyBlock = document.querySelector(".body-container");

let userName;
let counterScores;
let levelScores;
let enemyHpScores;
let currentEnemy;
let gameLevel;
let hitValue;
let villainOpacity;
let opacityDecrease;

const villains = [
  {
    id: 1,
    name: "Neron",
    hp: 10,
    dates: "Roman Emperor in 54-68 AD",
    country: "Ancient Rome",
    description:
      "Nero was a Roman emperor who ruled from 54 to 68 AD. He is known for his brutality and tyranny. He is often remembered for his alleged role in the Great Fire of Rome in 64 AD, which destroyed much of the city. Nero was rumored to have started the fire himself, in order to clear space for his new palace. Nero was also responsible for the persecution of Christians in Rome. He blamed them for the fire and ordered their torture, imprisonment, and execution. The historian Tacitus describes how Nero had Christians covered in animal skins and torn apart by dogs, while others were crucified or burned alive. Ultimately, Nero's cruelty and mismanagement of the Roman Empire led to his downfall. In 68 AD, he was declared a public enemy by the Senate, and he committed suicide the following year.",
    image: "./src/images/villain_1.jpg",
    background: "./src/images/back_1.webp",
  },
  {
    id: 2,
    name: "Tomás de Torquemada",
    hp: 20,
    dates: "1420 – 1498",
    country: "Spain",
    description:
      "He was a Spanish Dominican friar and the first Grand Inquisitor of the Spanish Inquisition. Under Torquemada's leadership, the Spanish Inquisition became notorious for its brutal tactics and persecution of religious minorities, particularly Jews and Muslims. Torquemada was responsible for the imprisonment, torture, and execution of thousands of people who were accused of heresy, including individuals who had converted to Christianity from Judaism or Islam. He implemented a system of secret trials, where the accused were not allowed to face their accusers and were often subjected to horrific methods of torture to extract confessions. Those who refused to confess were burned at the stake as heretics. Torquemada's legacy is one of terror and oppression, and he is remembered as one of the most notorious figures in the history of the Inquisition. His methods and practices set a precedent for religious persecution that would be emulated in other parts of Europe and the New World.",
    image: "./src/images/villain_2.jpg",
    background: "./src/images/back_2.jpg",
  },
  {
    id: 3,
    name: "Henry VIII",
    hp: 30,
    dates: "1489 - 1546",
    country: "England",
    description:
      "King Henry VIII is perhaps best known for his six marriages and the role he played in the English Reformation. However, he was also notorious for his ruthless and violent behavior, which included numerous crimes.One of the most well-known of Henry VIII's crimes was his treatment of his wives. He divorced two, executed two, and one died in childbirth. He was also known for his paranoia, and had several of his closest advisors and friends executed on charges of treason. Henry VIII was also responsible for the destruction of many Catholic monasteries and abbeys in England during the dissolution of the monasteries. The wealth of these institutions was seized by the crown, and many monks and nuns were left homeless and destitute.",
    image: "./src/images/villain_3.webp",
    background: "./src/images/back_3.jpg",
  },
];

const nextLevelWindow = document.querySelector(".next-level-window");
const nextLevelMessage = document.querySelector(".next-level-message");
const nextLevelButton = document.querySelector(".next-level-button");
const infoCardWindow = document.querySelector(".info-card-window");
const infoCardHeading = document.querySelector(".info-card-window h2");
const infoCardDates = document.querySelector(".info-card-window h3");
const infoCardCountry = document.querySelector(".info-card-window h4");
const infoCardDescription = document.querySelector(".info-card-window p");
const infoCardButton = document.querySelector(".info-card-button");

function showInfoWindow() {
  villainBlock.style.display = "none";
  currentEnemy = localStorage.getItem("enemy")
    ? JSON.parse(localStorage.getItem("enemy"))
    : villains[0];
  infoCardHeading.innerText = currentEnemy.name;
  infoCardDates.innerText = currentEnemy.dates;
  infoCardCountry.innerText = currentEnemy.country;
  infoCardDescription.innerText = currentEnemy.description;
  infoCardWindow.style.display = "block";
  infoCardButton.addEventListener("click", () => {
    infoCardWindow.style.display = "none";
    villainBlock.style.display = "block";
  });
}

function setStartSettings() {
  enemyHp.style.backgroundColor = "#119a31";
  userName = localStorage.getItem("name")
    ? localStorage.getItem("name")
    : "USER";
  counterScores = localStorage.getItem("scores")
    ? localStorage.getItem("scores")
    : 0;
  currentEnemy = localStorage.getItem("enemy")
    ? JSON.parse(localStorage.getItem("enemy"))
    : villains[0];

  gameLevel = localStorage.getItem("level") ? localStorage.getItem("level") : 1;

  bodyBlock.style.backgroundImage = `url("${
    villains[gameLevel - 1].background
  }")`;
  villainButton.style.backgroundImage = `url("${
    villains[gameLevel - 1].image
  }")`;

  levelScores = 0;
  villainOpacity = 1;
  hitValue = 100 / currentEnemy.hp;
  opacityDecrease = 0.5 / currentEnemy.hp;
  enemyHpScores = currentEnemy.hp;
  villainButton.style.opacity = 1;
  enemyHp.style.width = "100%";

  userLogin.innerText = userName;
  userLevel.innerText = gameLevel;
  userScores.innerText = counterScores;
  enemyHp.innerText = enemyHpScores;
}

function validateName(name) {
  // Regex to validate name format
  const nameRegex = /^.{5,}$/;
  return nameRegex.test(name);
}

function validateEmail(email) {
  // Regex to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function submitForm() {
  // if form valid with name and email then submit form, close modal window and put values in localStorage
  if (
    validateName(registrationName.value) &&
    validateEmail(registrationEmail.value)
  ) {
    registrationWindow.style.display = "none";
    infoCardWindow.style.display = "none";
    userLogin.innerText = registrationName.value;
    localStorage.setItem("name", registrationName.value);
    localStorage.setItem("email", registrationEmail.value);
    registrationName.value = "";
    registrationEmail.value = "";
    nextLevelWindow.style.display = "block";
    nextLevelButton.addEventListener("click", () => {
      nextLevelWindow.style.display = "none";
      startGame();
    });
  } else {
    warning.innerText =
      "Please enter a valid email or name (more than 5 chars)";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  bodyBlock.style.backgroundImage = `url("${villains[0].background}")`;
  if (localStorage.getItem("name") && localStorage.getItem("email")) {
    //if localStorage stores name and email from previous session on this device then user don't have to fill in registration window again
    registrationWindow.style.display = "none";
    nextLevelWindow.style.display = "block";
    nextLevelButton.addEventListener("click", () => {
      nextLevelWindow.style.display = "none";
      startGame();
    });
  } else if (registrationForm) {
    registrationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      submitForm();
    });
  }
});

function changeScores() {
  counterScores++;
  enemyHpScores--;
  levelScores++;
  if (levelScores > enemyHpScores) {
    enemyHp.style.backgroundColor = "#4f1515";
  }
  enemyHp.style.width = `${100 - levelScores * hitValue}%`;
  villainOpacity -= opacityDecrease;
  villainButton.style.opacity = villainOpacity;
  userScores.innerText = counterScores;
  enemyHp.innerText = enemyHpScores;
  if (enemyHpScores === 0) {
    setFinalSettings();
  }
}

function endGame() {
  nextLevelWindow.style.display = "block";
  nextLevelMessage.innerHTML = `<p>You have won and saved the world! <br/> Do you want to play again?</p>`;
  localStorage.removeItem("scores");
  localStorage.removeItem("level");
  localStorage.removeItem("enemy");
  villainOpacity = 1;
  nextLevelButton.addEventListener("click", () => {
    startGame();
  });
}

function setFinalSettings() {
  villainBlock.style.display = "none";
  gameLevel++;
  if (gameLevel <= villains.length) {
    localStorage.setItem("scores", counterScores);
    localStorage.setItem("level", gameLevel);
    localStorage.setItem("enemy", JSON.stringify(villains[gameLevel - 1]));
    nextLevelMessage.innerHTML = `<p>Congrats! <br/> He is not dangerous for us anymore. <br/> Let's go to the next villain!</p>`;
    nextLevelMessage.style.textAlign = "center";
    nextLevelWindow.style.display = "block";
    nextLevelButton.addEventListener("click", startGame);
  } else {
    endGame();
  }
}

function startGame() {
  //   nextLevelButton.addEventListener(
  //     "click",
  //     () => (nextLevelWindow.style.display = "none")
  //   );
  showInfoWindow();
  setStartSettings();
  villainButton.addEventListener("click", changeScores);
}
