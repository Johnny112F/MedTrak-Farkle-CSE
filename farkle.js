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
  if(playersHTML.value !== "") {
    numPlayers = parseInt(playersHTML.value);
    let dropDownPlayers = document.querySelector(".dropdown-numPlayers");
    dropDownPlayers.remove();
    players = Array(numPlayers).fill(0);
  }
}

function checkAndHideRounds() {
  if(numRoundsHTML.value !== "") {
    numRounds = parseInt(numRoundsHTML.value);
    numRoundsHTML.remove();
  }
}

function checkAndHidePoints() {
  if(numPointsHTML.value !== "") {
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
  console.log(diceArr);
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
  for(let val of players) {
    if(val > highScore) {
      highScore = val;
    }
  }
  return highScore;
}

function bankScore() {
  score += calculateScore(diceArr);
  let currHigh = currHighPlayerScore();

  if (currHigh >= numPointsToWin) {
    console.log(`${players.indexOf(currHigh)} wins`)
    startOver();
  }
  players[player] += score;
  rowScore.innerHTML = score;
  initializeDice();
  updateDiceImg();
  turn = 1;
  player++;
  if(player > numPlayers) {
    player = 0;
    round++;
    if(round > numRounds){
        let currHigh = currHighPlayerScore();

        if (currHigh >= numPointsToWin) {
        alert(`${players.indexOf(currHigh)} wins`)
        startOver();
        }
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
  players = [];
  initializeDice();
  updateDiceImg();
  roundDiv.innerHTML = `Round ${round}`;
  turnDiv.innerHTML = `Turn ${turn}`;
}

function showRules() {
  let div_element = document.createElement("p")
  div_element.innerText = "Farkle is a multiplayer dice game where a user can select the number of players, rounds, and points to play the game. After selecting each of these fields they will be hidden, and rolling will commence. When a player rolls if they hit a 1,3, or 5 they can choose to either bank or risk these dice. If they do not hit a 1,3, or 5 on the next turn they will lose all score for that round a 'farkle' will be announced and stored for their turn's value. If they do hit any of the dice mentioned or combinations of three of a kind they will be given the option to add these to their last score in the turn without accumulating combo value. When a player chooses to bank the score for that turn will be added to their overall score. The first player to hit the decided upon score or the top scoring player at the end of all turns will be awarded as being the winner.";
  rules.append(div_element);
}