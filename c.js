let UserScore = 0;
let ComputerScore = 0;
let currentRound = 0;
const maxRounds = 3;
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const UserScorePara = document.querySelector("#User-Score");
const ComputerScorePara = document.querySelector("#Computer-Score");
const roundNumberPara = document.querySelector("#round-number");
const newGameBtn = document.querySelector("#new-game");

const gencomputerchoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randomIdx = Math.floor(Math.random() * 3);
    return options[randomIdx];
};

const updateRoundDisplay = () => {
    roundNumberPara.innerText = `Round ${currentRound}`;
};

const disableChoices = () => {
    choices.forEach((choice) => {
        choice.style.pointerEvents = "none";
        choice.style.opacity = "0.5";
    });
};

const enableChoices = () => {
    choices.forEach((choice) => {
        choice.style.pointerEvents = "auto";
        choice.style.opacity = "1";
    });
};

const resetGame = () => {
    UserScore = 0;
    ComputerScore = 0;
    currentRound = 0;
    UserScorePara.innerText = UserScore;
    ComputerScorePara.innerText = ComputerScore;
    msg.innerText = "Play your Move";
    msg.style.backgroundColor = "#081b31";
    updateRoundDisplay();
    enableChoices();
};

const showFinalResult = () => {
    if (UserScore > ComputerScore) {
        msg.innerText = "You Win!";
        msg.style.backgroundColor = "#008000";
    } else if (ComputerScore > UserScore) {
        msg.innerText = "Computer Wins!";
        msg.style.backgroundColor = "#1E3A8A";
    } else {
        msg.innerText = "Match Draw!";
        msg.style.backgroundColor = "#081b31";
    }
};

const drawGame = () => {
    msg.innerText = "Game was drawn -- Play Again";
    msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        UserScore++;
        UserScorePara.innerText = UserScore;
        msg.innerText = `Hurrah! You win. Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "#008000";
    } else {
        ComputerScore++;
        ComputerScorePara.innerText = ComputerScore;
        msg.innerText = `Oops You Lose. ${compChoice} beats Your ${userChoice}`;
        msg.style.backgroundColor = "#1E3A8A";
    }
};

const playGame = (userChoice) => {
    if (currentRound >= maxRounds) {
        return;
    }

    currentRound += 1;
    updateRoundDisplay();

    const compChoice = gencomputerchoice();
    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compChoice === "scissors" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }

    if (currentRound === maxRounds) {
        showFinalResult();
        disableChoices();
    }
};

choices.forEach((choice) => {
    const userChoice = choice.getAttribute("id");
    choice.addEventListener("click", () => {
        playGame(userChoice);
    });
});

newGameBtn.addEventListener("click", resetGame);

resetGame();
