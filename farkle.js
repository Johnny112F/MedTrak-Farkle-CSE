var diceArr = [];
var numPlayers = 0;
var score = 0;
var round = 1;
var turn = 1;
let player = 0;
let players = [];
let numRounds = 10;
let numPointsToWin = 10000
let roundDiv = document.querySelector(".round");
let rowScore = document.querySelector(".score");
let turnDiv = document.querySelector(".turn");
let playersHTML = document.querySelector(".numPlayers");
let numRoundsHTML = document.querySelector(".numRounds");
let numPointsHTML = document.querySelector(".numPoints")
let rules = document.querySelector(".display-rules")
let playerDiv = document.querySelector(".player");

function checkAndHidePlayers() {
  if (playersHTML.value !== "") {
    numPlayers = parseInt(playersHTML.value);
    let dropDownPlayers = document.querySelector(".dropdown-numPlayers");
    dropDownPlayers.remove();
    players = Array(numPlayers).fill(0);
  }
}

function checkAndHideRounds() {
  if (numRoundsHTML.value !== "") {
    numRounds = parseInt(numRoundsHTML.value);
    numRoundsHTML.remove();
  }
}

function checkAndHidePoints() {
  if (numPointsHTML.value !== "") {
    numPointsToWin = parseInt(numPointsHTML.value);
    numPointsHTML.remove();
  }
}

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
  playerDiv.innerHTML = `player ${player + 1}`;
  roundDiv.innerHTML = `Round ${round}`;
  turnDiv.innerHTML = `Turn ${turn}`;
  rowScore.innerHTML = score;

}

/*Rolling dice values*/
function rollDice() {
  for (var i = 0; i < 6; i++) {
    if (diceArr[i].clicked === 0) {
      diceArr[i].value = Math.floor((Math.random() * 6) + 1);

    }

  }
  updateDiceImg();
  checkTurn();
}

function currHighPlayerScore() {
  let highScore = 0;
  for (let val of players) {
    if (val > highScore) {
      highScore = val;
    }
  }
  return highScore;
}

function bankScore() {
  score += calculateScore(diceArr);
  players[player] += score;
  let currHigh = currHighPlayerScore();
  if (currHigh >= numPointsToWin) {
    alert(`${players.indexOf(currHigh + 1)} wins`)
    startOver();
  }
  players[player] += score;
  rowScore.innerHTML = score;
  initializeDice();
  updateDiceImg();
  removeDiceTransparencies()
  turn = 1;
  player++;
  if (player > numPlayers - 1) {
    player = 0;
    round++;
    if (round > numRounds) {
      currHigh = currHighPlayerScore();
      alert(`${players.indexOf(currHigh) + 1} wins`)
        startOver();
    }
      if (currHigh >= numPointsToWin) {
        alert(`${players.indexOf(currHigh) + 1} wins`)
        startOver();
      }
    }

  roundDiv.innerHTML = `Round ${round}`;
  turnDiv.innerHTML = `Turn ${turn}`;
  playerDiv.innerHTML = `player ${player + 1} goes next`
  score = 0;
}

function checkTurn() {
  clickedDiceArr = diceArr.filter(dice => dice.clicked === 0);
  if (calculateScore(clickedDiceArr) == 0) {
    updateDiceImg();
    alert("Farkle!");
    player++;
    round++;
    turn = 1;
    initializeDice();
    updateDiceImg();
    removeDiceTransparencies()
    roundDiv.innerHTML = `Round ${round}`;
    turnDiv.innerHTML = `Turn ${turn}`;
    playerDiv.innerHTML = `player ${player + 1} goes next`
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

function removeDiceTransparencies() {
  var diceImage;
  for (var i = 0; i < 6; i++) {
    diceImage = "images/" + (diceArr[i].value) + ".png";
    document.getElementById(diceArr[i].id).classList.remove("transparent");
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
  players = [];
  initializeDice();
  updateDiceImg();
}

function showRules() {
  console.log("in show rules")
  let rules = document.querySelector(".display-rules");
  if (rules.style.display === "" || rules.style.display === "none") {
    rules.style.display = "block";
  } else {
    rules.style.display = "none"
  }
}

function hideRules() {
  let rules = document.querySelector(".display-rules");
  if (rules.style.display === "block") {
    rules.style.display = "none";
  }
}