var diceArr = [];

var score = 0;
var round = 1;
var turn = 1;
let roundDiv = document.querySelector(".round");
let rowScore = document.querySelector(".score");
let turnDiv = document.querySelector(".turn");

function initializeDice() {
  for (i = 0; i < 6; i++) {
    diceArr[i] = {};
    diceArr[i].id = "die" + (i + 1);
    diceArr[i].value = i + 1;
    diceArr[i].clicked = 0;
  }

}
function initializeGame() {
  initializeDice();
  roundDiv.innerHTML = `Round ${round}`;
  turnDiv.innerHTML = `Turn ${turn}`;
  rowScore.innerHTML = score;

}

/*Rolling dice values*/
function rollDice() {
  console.log(diceArr);
  for (var i = 0; i < 6; i++) {
    if (diceArr[i].clicked === 0) {
      diceArr[i].value = Math.floor((Math.random() * 6) + 1);

    }

  }
  updateDiceImg();
  checkTurn();
}

function bankScore() {
  score += calculateScore(diceArr);
  if (score >= 10000) {
    startOver();
  }
  rowScore.innerHTML = score;
  initializeDice();
  updateDiceImg();
  turn = 1;
  round++;
  roundDiv.innerHTML = `Round ${round}`;
  turnDiv.innerHTML = `Turn ${turn}`;
}

function checkTurn() {
  clickedDiceArr = diceArr.filter(dice => dice.clicked === 0);
  if (calculateScore(clickedDiceArr) == 0) {
    updateDiceImg();
    alert("Farkle!");
    round++;
    turn = 1;
    initializeDice();
    updateDiceImg();
    roundDiv.innerHTML = `Round ${round}`;
    turnDiv.innerHTML = `Turn ${turn}`;
  }
  else {
    turn++;
    turnDiv.innerHTML = `Turn ${turn}`;
  }

}

function calculateScore(arr) {
  let points = 0;
  let ones = [];
  let twos = [];
  let threes = [];
  let fours = [];
  let fives = [];
  let sixes = [];
  for (let i = 0; i < arr.length; i++) {
    switch (arr[i].value) {
      case 1: ones.push(1);
        break;
      case 2: twos.push(2);
        break;
      case 3: threes.push(3);
        break;
      case 4: fours.push(4);
        break;
      case 5: fives.push(5);
        break;
      case 6: sixes.push(6);
        break;
    }

  }
  switch (ones.length) {
    case 1:
      points += 100;
      break;
    case 2:
      points += 200;
      break;
    case 3:
      points += 1000;
      break;
    case 4:
      points += 1100
      break;
    case 5:
      points += 1200;
      break;
    case 6:
      points += 2000;
      break;
    default:
      points += 0;
  }
  switch (twos.length) {
    case 3:
    case 4:
    case 5:
      points += 200;
      break;
    case 6:
      points += 400;
      break;
    default:
      points += 0;
  }
  switch (threes.length) {
    case 3:
    case 4:
    case 5:
      points += 300;
      break;
    case 6:
      points += 600;
      break;
    default:
      points += 0;
  }
  switch (fours.length) {
    case 3:
    case 4:
    case 5:
      points += 400;
      break;
    case 6:
      points += 800;
      break;
    default:
      points += 0;
  }
  switch (fives.length) {
    case 1:
      points += 50;
      break;
    case 2:
      points += 100;
      break;
    case 3:
      points += 500;
      break;
    case 4:
      points += 550;
      break;
    case 5:
      points += 600;
      break;
    case 6:
      points += 1000;
      break;
    default:
      points += 0;
  }
  switch (sixes.length) {
    case 3:
    case 4:
    case 5:
      points += 600;
      break;
    case 6:
      points += 1200;
      break;
    default:
      points += 0;
  }
  return points;
}

/*Updating images of dice given values of rollDice*/
function updateDiceImg() {
  var diceImage;
  for (var i = 0; i < 6; i++) {
    diceImage = "images/" + (diceArr[i].value) + ".png";
    document.getElementById(diceArr[i].id).setAttribute("src", diceImage);
  }
}

function diceClick(img) {
  var i = img.getAttribute("data-number");

  img.classList.toggle("transparent");
  if (diceArr[i].clicked === 0) {
    diceArr[i].clicked = 1;
  }
  else {
    diceArr[i].clicked = 0;
  }
}
function startOver() {
  round = 1;
  score = 0;
  turn = 1;
  initializeDice();
  updateDiceImg();
  roundDiv.innerHTML = `Round ${round}`;
  turnDiv.innerHTML = `Turn ${turn}`;
}