"use strict";

// Current Player Index
let curPlaInd = 1;
let nMovesOfPlayers = [0, 0];
let winningScore = 100;

// DOM elements
const btnRoll = document.getElementById("roll--dice");
const btnHold = document.getElementById("hold--score");
const btnReset = document.getElementById("reset--game");
const diceImage = document.getElementById("dice--image--element");
const curPlayBg = document.querySelector(".current-player");
const winnerHeading = document.getElementById("headline--winner");
const nMoves = document.getElementById("moves--count");
const finalScore = document.getElementById("final--score");
const okayBtn = document.getElementById("okay--btn");

btnRoll.addEventListener("click", function () {
  const curScore = document.querySelector(`#player--${curPlaInd} .current`);
  // Change the Dice Image
  const randNum = Math.trunc(Math.random() * 6) + 1;
  const srcUrl = `./media/dice-${randNum}.png`;
  diceImage.setAttribute("src", srcUrl);
  if (randNum > 1) {
    btnHold.textContent = "HOLD SCORE";
    // Add the Value of Dice to the Current Score
    let val = curScore.textContent * 1;
    val += randNum;
    curScore.textContent = val < 10 ? "0" + val : val;
  } else {
    curScore.textContent = "00";
    curPlayBg.style.left = curPlaInd == 1 ? "0vw" : "50vw";
    curPlaInd = curPlaInd == 1 ? 2 : 1;
  }
});

btnHold.addEventListener("click", function () {
  btnHold.textContent = "SWITCH PLAY";
  nMovesOfPlayers[curPlaInd - 1] += 1;
  const totScore = document.querySelector(`#player--${curPlaInd} .total`);
  const curScore = document.querySelector(`#player--${curPlaInd} .current`);
  // Add the Value of Dice to the Current Score
  let val = totScore.textContent * 1;
  val += curScore.textContent * 1;
  if (val >= winningScore) {
    document.body.classList.add("game-over");
    winnerHeading.textContent = `Player ${curPlaInd} win!`;
    finalScore.textContent = val + "";
    nMoves.textContent = nMovesOfPlayers[curPlaInd - 1] + "";
  }
  totScore.textContent = val < 10 ? "0" + val : val;
  curScore.textContent = "00";
  curPlayBg.style.left = curPlaInd == 1 ? "0vw" : "50vw";
  curPlaInd = curPlaInd == 1 ? 2 : 1;
});

btnReset.addEventListener("click", function () {
  btnHold.textContent = "SWITCH PLAY";
  for (let i = 1; i < 3; i++) {
    const totScore = document.querySelector(`#player--${i} .total`);
    const curScore = document.querySelector(`#player--${i} .current`);
    totScore.textContent = "00";
    curScore.textContent = "00";
  }
  curPlayBg.style.left = "50vw";
  curPlaInd = 1;
  const srcUrl = `./media/dice-6.png`;
  diceImage.setAttribute("src", srcUrl);
  btnHold.removeAttribute("disabled");
  btnRoll.removeAttribute("disabled");
});

okayBtn.addEventListener("click", function () {
  document.body.classList.remove("game-over");
  btnHold.setAttribute("disabled", true);
  btnRoll.setAttribute("disabled", true);
});
