//variables for manipulating DOM-elements
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
const nextLevelWindow = document.querySelector(".next-level-window");
const nextLevelMessage = document.querySelector(".next-level-message");
const nextLevelButton = document.querySelector(".next-level-button");
const infoCardWindow = document.querySelector(".info-card-window");
const infoCardHeading = document.querySelector(".info-card-window h2");
const infoCardDates = document.querySelector(".info-card-window h3");
const infoCardCountry = document.querySelector(".info-card-window h4");
const infoCardDescription = document.querySelector(".info-card-window p");
const infoCardButton = document.querySelector(".info-card-button");

//variables for storing user's results and other data
let userName;
let counterScores;
let levelScores;
let enemyHpScores;
let currentEnemy;
let gameLevel;
let hitValue;
let villainOpacity;
let opacityDecrease;

//information about different level's enemies
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
    hp: 15,
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
    hp: 20,
    dates: "1489 - 1546",
    country: "England",
    description:
      "King Henry VIII is perhaps best known for his six marriages and the role he played in the English Reformation. However, he was also notorious for his ruthless and violent behavior, which included numerous crimes.One of the most well-known of Henry VIII's crimes was his treatment of his wives. He divorced two, executed two, and one died in childbirth. He was also known for his paranoia, and had several of his closest advisors and friends executed on charges of treason. Henry VIII was also responsible for the destruction of many Catholic monasteries and abbeys in England during the dissolution of the monasteries. The wealth of these institutions was seized by the crown, and many monks and nuns were left homeless and destitute.",
    image: "./src/images/villain_3.webp",
    background: "./src/images/back_3.jpg",
  },
  {
    id: 4,
    name: "Ivan IV The Terrible",
    hp: 25,
    dates: "1547 - 1584",
    country: "Russia",
    description:
      "He is infamous for his cruel and violent behavior towards his subjects, earning him the epithet \"The Terrible\".One of Ivan's most infamous crimes was the massacre of Novgorod in 1570, where thousands of civilians were brutally killed. Ivan ordered the execution of anyone suspected of disloyalty, including women and children. He also introduced the oprichnina, a period of political terror, where he created a secret police force to eliminate his opponents. Ivan was known for his violent outbursts, and he reportedly killed his own son and heir, Ivan Ivanovich, during one of them. He also blinded the architect of St. Basil's Cathedral, Postnik Yakovlev, so that he could never create anything as beautiful again. Overall, Ivan IV's reign was marked by violence, oppression, and fear. His cruelty and paranoia left a dark mark on Russian history, and he remains one of the most notorious and reviled leaders in the world.",
    image: "./src/images/villain_4.jpg",
    background: "./src/images/back_4.jpg",
  },
  {
    id: 5,
    name: "Napoleon Bonaparte",
    hp: 30,
    dates: "1769 – 1821",
    country: "France",
    description:
      "One of the most infamous of Napoleon's crimes was the execution of thousands of prisoners of war during his campaign in Egypt, where he ordered the execution of around 1,000 Ottoman prisoners of war, and even more notably, the execution of 3,000 Mamaluks after his victory at the Battle of the Pyramids. Another example of his cruelty was the execution of the Duke of Enghien, a member of the Bourbon royal family, on trumped-up charges of plotting against him. This act drew condemnation from across Europe and is seen as one of the darkest stains on Napoleon's legacy. Napoleon's invasion of Russia in 1812 is also remembered for the atrocities committed by his troops, including looting, burning villages, and murdering civilians. The retreat from Moscow was particularly brutal, with thousands of soldiers dying from cold, starvation, and disease. Overall, Napoleon's crimes are numerous and significant, reflecting the brutality of war and the cost of his conquests.",
    image: "./src/images/villain_5.jpg",
    background: "./src/images/back_5.jpg",
  },
  {
    id: 6,
    name: "Mao Zedong",
    hp: 35,
    dates: "1893 – 1976",
    country: "China",
    description:
      "Mao Zedong, the Chinese communist revolutionary, is responsible for some of the most devastating crimes in history. As the leader of the People's Republic of China, Mao initiated several campaigns that resulted in the deaths of millions of people. One of his most infamous campaigns was the Great Leap Forward, an attempt to modernize the Chinese economy that led to widespread famine and starvation. The campaign's disastrous policies resulted in the deaths of an estimated 45 million people between 1958 and 1962. Mao's Cultural Revolution, another brutal campaign, aimed to remove all traces of capitalism and traditional Chinese culture from society. During this time, violence and terror were widespread, as Mao encouraged young people to attack anyone deemed a threat to the Communist Party. Countless people were tortured, executed, or driven to suicide. Mao also established labor camps, where political prisoners were subjected to harsh conditions and forced labor. It's estimated that millions of people were sent to these camps, and many died as a result of the brutal conditions.",
    image: "./src/images/villain_6.jpg",
    background: "./src/images/back_6.jpg",
  },
  {
    id: 7,
    name: "Pol Pot",
    hp: 40,
    dates: "1925 – 1998",
    country: "Cambodia",
    description:
      "Pol Pot was a Cambodian politician and leader of the Khmer Rouge regime, which was responsible for one of the most brutal genocides in modern history. Between 1975 and 1979, Pol Pot's regime oversaw the deaths of an estimated 1.7 to 2.2 million Cambodians, roughly a quarter of the country's population at the time. Pol Pot's ideology sought to create a communist utopia by forcibly removing urban dwellers to work in agricultural collectives. The regime also targeted intellectuals, professionals, and those who were considered to be potential threats to the revolution. These individuals were often executed in a brutal and inhumane manner, and the regime showed no mercy to anyone who was perceived as a threat. Pol Pot's regime also implemented policies that led to widespread famine and disease, and many Cambodians died from starvation and preventable illnesses. The regime was eventually overthrown by Vietnamese forces in 1979, and Pol Pot fled into the jungle, where he continued to lead a guerrilla movement until his death in 1998.",
    image: "./src/images/villain_7.webp",
    background: "./src/images/back_7.webp",
  },
  {
    id: 8,
    name: "Idi Amin",
    hp: 45,
    dates: "1925 – 2003",
    country: "Uganda",
    description:
      "Idi Amin, the former president of Uganda, is infamous for the brutal crimes he committed during his reign from 1971 to 1979. Amin came to power through a military coup, and his regime was characterized by widespread human rights abuses, political repression, and the use of violence to maintain control. Under Amin's regime, tens of thousands of Ugandans were executed, tortured, or disappeared. Political opponents were routinely arrested and subjected to brutal interrogation and torture, and the media was heavily censored. Amin's regime also targeted ethnic and religious minorities, particularly the Acholi and Lango people, leading to the deaths of an estimated 500,000 people. Amin's brutal reign was marked by a number of high-profile incidents, including the hijacking of an Air France plane to Entebbe in 1976, which ended with a dramatic rescue operation by Israeli commandos. Amin was eventually forced out of power in 1979, and he fled to Saudi Arabia, where he remained until his death in 2003. The crimes of Idi Amin continue to haunt Uganda and the world, serving as a stark reminder of the dangers of authoritarianism and unchecked power.",
    image: "./src/images/villain_8.jpg",
    background: "./src/images/back_8.jpg",
  },
  {
    id: 9,
    name: "Joseph Stalin",
    hp: 50,
    dates: "1878 – 1953",
    country: "Soviet Union",
    description:
      "Stalin's reign of terror in the Soviet Union is considered one of the darkest periods in modern history. During his rule, he was responsible for the deaths of millions of people through a variety of methods, including forced labor camps, purges, and executions. One of the most infamous examples of Stalin's brutality was the Holodomor, a man-made famine that killed millions of Ukrainians in the early 1930s. Stalin's policies of collectivization and forced grain requisitions led to widespread starvation, and his regime actively suppressed aid efforts from foreign countries. Stalin was also responsible for the Great Purge, a campaign of political repression that saw hundreds of thousands of people executed or sent to labor camps. This included not only political dissidents, but also many innocent people who were falsely accused of crimes. Overall, Stalin's crimes against humanity have had a lasting impact on the Soviet Union and the world, with estimates of the total number of deaths during his reign ranging from 10 to 60 million people.",
    image: "./src/images/villain_9.jpg",
    background: "./src/images/back_9.jpg",
  },
  {
    id: 10,
    name: "Adolf Hitler",
    hp: 55,
    dates: "1889 – 1945",
    country: "Germany",
    description:
      "He committed numerous crimes that resulted in the deaths of millions of people. Hitler's crimes began with the persecution and extermination of the Jewish population during the Holocaust. Under his orders, over 6 million Jews were systematically murdered in concentration camps. Additionally, Hitler's regime targeted other groups for persecution, including homosexuals, disabled individuals, Romani people, and political dissidents. Hitler's crimes also extended to his military conquests during World War II. He launched invasions of numerous European countries, resulting in the deaths of millions of civilians and military personnel. Hitler's armies committed atrocities, including massacres of civilians, rapes, and forced labor of prisoners of war. Furthermore, Hitler was responsible for the implementation of the euthanasia program, which aimed to eliminate people with physical and mental disabilities. Under this program, an estimated 200,000 people were killed.",
    image: "./src/images/villain_10.jpg",
    background: "./src/images/back_10.jpg",
  },
];

window.addEventListener("DOMContentLoaded", () => {
  //show initial background
  bodyBlock.style.backgroundImage = `url("${villains[0].background}")`;
  //check if user has been already registered in game
  if (localStorage.getItem("name") && localStorage.getItem("email")) {
    //if localStorage stores name and email from previous session on this device then user don't have to fill in registration window again
    registrationWindow.style.display = "none";
    //if user is registered, the intro window will appear
    nextLevelWindow.style.display = "block";
    //the game begins after clicking "OK"-button in Intro window.
    nextLevelButton.addEventListener("click", () => {
      nextLevelWindow.style.display = "none";
      startGame();
    });
  } else {
    //if user didn't register previously
    registrationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      submitForm();
    });
  }
});

function submitForm() {
  if (
    validateName(registrationName.value) &&
    validateEmail(registrationEmail.value)
  ) {
    // if form is valid with name and email then user can submit form and registration window will be closed
    registrationWindow.style.display = "none";
    //player Name will appear on the page
    userLogin.innerText = registrationName.value;
    //user's data are put in localStorage and reset form inputs
    localStorage.setItem("name", registrationName.value);
    localStorage.setItem("email", registrationEmail.value);
    registrationName.value = "";
    registrationEmail.value = "";
    infoCardWindow.style.display = "none";
    //Intro window appears, the game begins after clicking on "OK"-button and closing this window
    nextLevelWindow.style.display = "block";
    nextLevelButton.addEventListener("click", () => {
      nextLevelWindow.style.display = "none";
      startGame();
    });
  } else {
    // if form is not valid with name or email, the warning appears
    warning.innerText =
      "Please enter a valid email or name (more than 5 chars)";
  }
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

function startGame() {
  //show window with information about next level enemy
  showInfoWindow();
  //set essential settings before new round
  setStartSettings();
  //change user and enemy scores
  villainButton.addEventListener("click", changeScores);
}

function showInfoWindow() {
  villainBlock.style.display = "none";
  //check if any data about enemy in localStorage, otherwise it shows info with enemy #1
  currentEnemy = localStorage.getItem("enemy")
    ? JSON.parse(localStorage.getItem("enemy"))
    : villains[0];
  infoCardHeading.innerText = currentEnemy.name;
  infoCardDates.innerText = currentEnemy.dates;
  infoCardCountry.innerText = currentEnemy.country;
  infoCardDescription.innerText = currentEnemy.description;
  infoCardWindow.style.display = "block";
  //info window is closed if "OK"-button is clicked and Enemy's image appears
  infoCardButton.addEventListener("click", () => {
    infoCardWindow.style.display = "none";
    villainBlock.style.display = "block";
  });
}

function setStartSettings() {
  //enemy's hp-meter becomes full and green again every new round
  enemyHp.style.backgroundColor = "#119a31";
  //loading enemy data and user's result from localStorage
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
  //enemy image and background theme change every round
  bodyBlock.style.backgroundImage = `url("${
    villains[gameLevel - 1].background
  }")`;
  villainButton.style.backgroundImage = `url("${
    villains[gameLevel - 1].image
  }")`;
  //calculate and initialize transitional variables
  levelScores = 0;
  villainOpacity = 1;
  hitValue = 100 / currentEnemy.hp;
  opacityDecrease = 0.5 / currentEnemy.hp;
  enemyHpScores = currentEnemy.hp;
  villainButton.style.opacity = 1;
  enemyHp.style.width = "100%";
  //show user/enemy data on the page
  userLogin.innerText = userName;
  userLevel.innerText = gameLevel;
  userScores.innerText = counterScores;
  enemyHp.innerText = enemyHpScores;
}

function changeScores() {
  //1 clicking = 1 point to player and -1 point to enemy HP
  counterScores++;
  enemyHpScores--;
  //transitional user score during the round
  levelScores++;
  //show decreasing HP and changing red/green for HP-meter
  if (levelScores > enemyHpScores) {
    enemyHp.style.backgroundColor = "#4f1515";
  }
  enemyHp.style.width = `${100 - levelScores * hitValue}%`;
  enemyHp.innerText = enemyHpScores;
  userScores.innerText = counterScores;
  //after clicking the opacity of the enemy image will decrease.
  villainOpacity -= opacityDecrease;
  villainButton.style.opacity = villainOpacity;
  //after the enemy was defeated data will be prepared for the next round
  if (enemyHpScores === 0) {
    setFinalSettings();
  }
}

function setFinalSettings() {
  villainBlock.style.display = "none";
  gameLevel++;
  //gameLevel value is compared with amount of elements in villains array
  if (gameLevel <= villains.length) {
    //results are put in localStorage if it's not a last round yet
    localStorage.setItem("scores", counterScores);
    localStorage.setItem("level", gameLevel);
    localStorage.setItem("enemy", JSON.stringify(villains[gameLevel - 1]));
    //Congrat's window appears. After clicking "OK"-button it will disappear and new round will begin.
    nextLevelMessage.innerHTML = `<p>Congrats! <br/> He is not dangerous for us anymore. <br/> Let's go to the next villain!</p>`;
    nextLevelMessage.style.textAlign = "center";
    nextLevelWindow.style.display = "block";
    nextLevelButton.addEventListener("click", startGame);
  } else {
    //if no more enemies the game is over
    endGame();
  }
}

function endGame() {
  //Window with final message appears.
  nextLevelWindow.style.display = "block";
  nextLevelMessage.innerHTML = `<p>You have won and saved the world! <br/> Do you want to play again?</p>`;
  nextLevelMessage.style.textAlign = "center";
  // level, scores and enemy data are reset.
  localStorage.removeItem("scores");
  localStorage.removeItem("level");
  localStorage.removeItem("enemy");
  //if user wants to repeat then the game will begin after clicking "OK"-button
  nextLevelButton.addEventListener("click", () => {
    startGame();
  });
}
