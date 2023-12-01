const playerOneNameInput = document.getElementById("playerOneNameInput");
const playerTwoNameInput = document.getElementById("playerTwoNameInput");

const startGameButton = document.getElementById("startGameButton");
const endGameButton = document.querySelector(".endGame");
const resetButton = document.querySelector(".reset");

const highscore = document.querySelector(".records");
const highScorePlayerOneName = document.querySelector(".p1");
const highScorePlayerTwoName = document.querySelector(".p2");
const highScorePlayerOneScore = document.querySelector(".p1Score");
const highScorePlayerTwoScore = document.querySelector(".p2Score");

const playerHistoryContainer = document.querySelector(".history");

const gameContainer = document.querySelector(".game");
const gameBoardContainer = document.getElementById("memory-game");
const startMenuContainer = document.getElementById("startMenu");

const playerDisplay = document.querySelector(".playerDisplay");

const emojis = [
    "😂",
    "❤",
    "👌",
    "😎",
    "🌹",
    "🎁",
    "⚽",
    "🏓",
	"🎨",
	"🎃",
	"💋",
	"🐒",
];

const cards = [...emojis, ...emojis];


startGameButton.addEventListener("click", () => {
	generateCards();
	gameBoardContainer.classList.remove("hidden")
	startMenuContainer.classList.add("hidden")
	playerTurnDisplay()
	renderScore(); 
});

resetButton.addEventListener("click", () => {
	gameContainer.innerHTML = "";
	generateCards();
	resetScore()
	playerHistoryContainer.innerHTML = "";
	
});

endGameButton.addEventListener("click", () => {
	playerOneNameInput.value = "";
    playerTwoNameInput.value = "";
	location.reload();
})

let playerOneName = "Player 1";
let playerTwoName = "Player 2";

let currentPlayer = 1;

const playerOne = {
    name: playerOneName,
    score: 0,
};

const playerTwo = {
    name: playerTwoName,
    score: 0,
};

playerOneNameInput.addEventListener("input", (event) => {
    playerOne.name = event.target.value;
});

playerTwoNameInput.addEventListener("input", (event) => {
    playerTwo.name = event.target.value;
});

const playerHistory = [];

let flippedCards = [];

gameContainer.addEventListener("click", (event) => {
    const clickedCard = event.target;
    if (
        clickedCard.classList.contains("item") &&
        !clickedCard.classList.contains("flipped")
    ) {
        flipCard(clickedCard);
        flippedCards.push(clickedCard);

        if (flippedCards.length === 2) {
            const isMatch = isCardMatch(flippedCards[0], flippedCards[1]);

            if (isMatch) {
                currentPlayer === 1 && playerOne.score++;
                currentPlayer === 2 && playerTwo.score++;
                playerHistory.push(
                    currentPlayer === 1
                        ? `${playerOne.name} found a pair!`
                        : `${playerTwo.name} found a pair!`
						
                );
	
                renderScore(); 
            }

            if (!isMatch) {
                currentPlayer = currentPlayer === 1 ? 2 : 1;
                playerTurnDisplay()
            }
            flippedCards = [];
				
        }
    }

    if (playerOne.score + playerTwo.score === 12) {
        if (playerOne.score > playerTwo.score) {
            alert(`${playerOne.name} wins!`);
        } else if (playerOne.score === playerTwo.score) {
            alert("TIE!");
        } else {
            alert(`${playerTwo.name} wins!`);
        }
    }
});

function isCardMatch(card1, card2) {
    const itemOne = card1.textContent;
    const itemTwo = card2.textContent;

    if (itemOne === itemTwo) {
		setTimeout( () => {
			card1.classList.add("isMatch");
			card2.classList.add("isMatch");
		}, 1000)
        return true;

    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
        }, 1000);
        return false;
    }
}

function flipCard(card) {
    card.classList.add("flipped");
}

function generateCards() {
    shuffleCards(cards);
    cards.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.className = "item";
        cardElement.innerHTML = card;
        document.querySelector(".game").append(cardElement);
    });
}

//Fisher-Yates
function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

function renderScore() {
    highScorePlayerOneName.innerHTML = playerOne.name;
    highScorePlayerOneScore.innerHTML = playerOne.score;

    highScorePlayerTwoName.innerHTML = playerTwo.name;
    highScorePlayerTwoScore.innerHTML = playerTwo.score;

    const item = document.createElement("p");

    playerHistory.forEach((hist) => {
        item.innerHTML = hist;
        playerHistoryContainer.appendChild(item);
    });
}

function resetScore() {
	playerOne.score = 0;
	playerTwo.score = 0;
	highScorePlayerOneScore.innerHTML = 0;
	highScorePlayerTwoScore.innerHTML = 0;
}

function playerTurnDisplay(){
	playerDisplay.textContent = `${currentPlayer === 1 ? playerOne.name : playerTwo.name}'s turn`;
}