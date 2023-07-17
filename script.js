let score = JSON.parse(localStorage.getItem("score")) || {
  ganhou: 0,
  perdeu: 0,
  empate: 0,
};

updateScore();

function resetScore() {
  score = {
    ganhou: 0,
    perdeu: 0,
    empate: 0,
  };

  updateScore();
  document.querySelector(".js-moves").innerHTML = "";

  document.querySelector(".js-result").innerHTML = "";

  localStorage.removeItem("score");
}

function playGame(playerMove) {
  let computerMove = pickComputerMove();
  let result = "";
  const emojis = {
    pedra: "✊",
    papel: "🖐",
    tesoura: "✌",
  };

  if (playerMove === computerMove) {
    result = "Empate.";
    score.empate++;
  } else if (
    (playerMove === "pedra" && computerMove === "tesoura") ||
    (playerMove === "papel" && computerMove === "pedra") ||
    (playerMove === "tesoura" && computerMove === "papel")
  ) {
    result = "Você ganhou!";
    score.ganhou++;
  } else {
    result = "Você perdeu :(";
    score.perdeu++;
  }

  document.querySelector(
    ".js-moves"
  ).innerHTML = `você <span class="move-emoji">${emojis[playerMove]}</span> <span class="move-emoji">${emojis[computerMove]}</span> computador`;

  document.querySelector(".js-result").innerHTML = result;

  updateScore();

  localStorage.setItem("score", JSON.stringify(score));
}

function pickComputerMove() {
  let computerMove = Math.random();

  if (computerMove >= 0 && computerMove < 1 / 3) {
    computerMove = "pedra";
  } else if (computerMove >= 1 / 3 && computerMove < 2 / 3) {
    computerMove = "papel";
  } else {
    computerMove = "tesoura";
  }

  return computerMove;
}

function updateScore() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Ganhou: ${score.ganhou} | Perdeu: ${score.perdeu} | Empate: ${score.empate}`;
}
