/*
 * Create a list that holds all of your cards
 */
// "Font Awesome" Free icons
const singleIcon = [
    "fa fa-motorcycle",
    "fa fa-train",
    "fa fa-car",
    "fa fa-ship",
    "fa fa-truck",
    "fa fa-bus",
    "fa fa-bicycle",
    "fa fa-plane"
];

const icons = singleIcon.concat(singleIcon);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

let openCards = [];
let openMatchedCards = [];

// Displays a list of cards with eight pairs of random icons
const cardsContainer = document.querySelector(".deck");

const startGame = () => {
    const array = shuffle(icons);
    for (let icon of icons) {
        const card = document.createElement("li");
        cardsContainer.appendChild(card);
        card.classList.add("card");
        card.innerHTML = `<i class="${icon}"></i>`;

        clickCard(card);
    }

    starScores();
};

// Shuffle function from http://stackoverflow.com/a/2450976
const shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

const clickCard = (card) => {
    card.addEventListener("click", function() {
        displayCards(card);
    });
};

const displayCards = (card) => {
    if (openCards.length < 2) {
        openCards.push(card);
        card.classList.add("disable", "open", "show");

        // Compare the two open cards
        if (openCards.length === 2) {
            // If they are the same use the matchedCards() method and if they are different use the noMatchedCards() method
            openCards[0].innerHTML === openCards[1].innerHTML ?
                matchedCards(card)
            :
                noMatchedCards();

            // When two cards are open, count as one movement
            movementCounter();
        }

        // When one card is open, count as one movement
        movementCounterOneCard();

        // When a card is open, time starts running
        if (movesOneCard === 1) {
            startTime();
        }

        restartGame();

        finalMessage();
    }
};

// When the cards match
// Include a class name "match" and remove the "open" and "show" classes so that the cards remain open
// Add a "fade-out" class to animate the cards
// The cards are included in an array called openMatchedCards and the cards in the array openCards are deleted
const matchedCards = (card) => {
    openCards[0].classList.add("match", "fade-out");
    openCards[1].classList.add("match", "fade-out");
    openCards[0].classList.remove("open", "show");
    openCards[1].classList.remove("open", "show");

    openMatchedCards.push(card);
    openCards.length = 0;
};

// When the cards don't match,
// Add a "shake" class to animate the cards
// Remove the "open" and "show" classes so that the cards are closed
// The cards in the array openCards are deleted
const noMatchedCards = () => {
    openCards[0].classList.add("shake");
    openCards[1].classList.add("shake");

    setTimeout(() => {
        openCards[0].classList.remove("disable", "open", "show", "shake");
        openCards[1].classList.remove("disable", "open", "show", "shake");

        openCards.length = 0;
    }, 800);
};

/* STARS SCORE */
// Displays a list with the maximum score (five stars) from the start of the game
// The rating of stars will be according to the number of movements made
const starsContainer = document.querySelector(".stars");

const fullStar = `<li class="score"><i class="fa fa-star"></i></li>`;
const halfStar = `<li class="score"><i class="fa fa-star-half-o"></i></li>`;
const emptyStar = `<li class="score"><i class="fa fa-star-o"></i></li>`;

const starScores = () => {
        (moves < 12) ? html = fullStar + fullStar + fullStar + fullStar + fullStar
    :
        (moves < 14) ? html = fullStar + fullStar + fullStar + fullStar + halfStar
    :
        (moves < 16) ? html = fullStar + fullStar + fullStar + fullStar + emptyStar
    :
        (moves < 18) ? html = fullStar + fullStar + fullStar + halfStar + emptyStar
    :
        (moves < 20) ? html = fullStar + fullStar + fullStar + emptyStar + emptyStar
    :
        (moves < 22) ? html = fullStar + fullStar + halfStar + emptyStar + emptyStar
    :
        (moves < 24) ? html = fullStar + fullStar + emptyStar + emptyStar + emptyStar
    :
        (moves < 26) ? html = fullStar + halfStar + emptyStar + emptyStar + emptyStar
    :
        (moves < 28) ? html = fullStar + emptyStar + emptyStar + emptyStar + emptyStar
    :
        (moves < 30) ? html = halfStar + emptyStar + emptyStar + emptyStar + emptyStar
    :
        html = emptyStar + emptyStar + emptyStar + emptyStar + emptyStar

    starsContainer.innerHTML = html;
};

/* MOVEMENT SCORE */
// Counts the movement of two cards open
// Increase one movement each time
const movesContainer = document.querySelector(".moves");
let moves = 0;

const movementCounter = () => {
    moves++;
    movesContainer.innerHTML = moves + " Moves";

    starScores();
};

// Counts the movement of one card open
// Increase one movement each time
let movesOneCard = 0;

const movementCounterOneCard = () => {
    movesOneCard++;
};

/* TIME SCORE */
// The game time begins to elapse
const timeGame = document.querySelector('.times');
let cronometer;

const startTime = () => {
    let secondsTime = 0;

    cronometer = setInterval(() => {
        secondsTime++;
        let minutes = 0;
        let seconds = secondsTime;

        while (seconds >= 60) {
            minutes++;
            seconds -= 60;
        }

        displayTimeInGame(minutes, seconds);

    }, 1000);
};

// It shows the time in the game
const displayTimeInGame = (minutes, seconds) => {
    minutes = (minutes < 10) ? timeGame.innerHTML = `0${minutes}` : timeGame.innerHTML = `${minutes}`;

    seconds = (seconds < 10) ? timeGame.innerHTML = `0${seconds}` : timeGame.innerHTML = `${seconds}`;

    timeGame.innerHTML = `${minutes}:${seconds}`;
};

// The game time stops
const stopTime = () => {
    clearInterval(cronometer);
    minutes = 0;
    seconds = 0;
    displayTimeInGame(minutes, seconds);
};

/* FINAL MESSAGE */
// When the final message appears, the game is hidden and when the final message disappears, the game is displayed again
const container = document.querySelector(".container");
const header = document.querySelector("header");
const scorePanel = document.querySelector(".score-panel");
const footer = document.querySelector("footer");

const hideBackgroundMessage = () => {
    header.classList.add("background-message");
    cardsContainer.classList.add("background-message");
    scorePanel.classList.add("background-message");
    footer.classList.add("background-message");
};

const showBackgroundMessage = () => {
    header.classList.remove("background-message");
    cardsContainer.classList.remove("background-message");
    scorePanel.classList.remove("background-message");
    footer.classList.remove("background-message");
};

// When all the cards have been paired, a congratulatory message is displayed with the time used to complete the game, the score obtained and the number of movements made
// If all the cards have not been paired but the maximum number of possible moves has been reached, the message "Sorry, you have lost the game" is displayed.
const message = document.createElement("div");
container.appendChild(message);
message.classList.add("message");

const finalMessage = () => {
    const gameOver = (openMatchedCards.length === 8) || (openMatchedCards.length !== 8 && moves === 30);
    if (gameOver) {
        container.classList.add("final-message");

        const btnMessage = `<button onClick="playAgain()">Play Again</button>`;

        const goodMessage = `<h2>Congratulations!!!<br />You have won the game</h2>
                             <p class="results">Time: ${timeGame.innerHTML}</p>
                             <p class="results">Score: ${starsContainer.innerHTML}</p>
                             <p class="results">Moves: ${movesContainer.innerHTML}</p>
                             ${btnMessage}`;

        const badMessage = `<h2>Sorry<br />You have lose the game</h2>
                            ${btnMessage}`;

        setTimeout(() => {
            if (openMatchedCards.length === 8) {
                hideBackgroundMessage();
                message.innerHTML = goodMessage;
            } else if (openMatchedCards.length !== 8 && moves === 30) {
                hideBackgroundMessage();
                message.innerHTML = badMessage;
            }
        }, 800);
    }
};

/* RESTART THE GAME */
// When the "Play Again" button is pressed, the game is restarted
const playAgain = () => {
    resetGame();
    showBackgroundMessage();
    message.innerHTML = "";
    container.classList.remove("final-message");
};

// When the "refresh" icon es pressed, the game is restarted
const restartContainer = document.querySelector('.restart');
restartContainer.innerHTML = `<i class="fa fa-refresh"></i>`;

const restartGame = () => {
    restartContainer.addEventListener("click", function() {
        resetGame();
    });
};

// When the game is restarted, the matched cards, movements, times and scores are restarted
const resetGame = () => {
    stopTime();

    movesOneCard = 0;

    cardsContainer.innerHTML = "";
    startGame();

    openCards.length = 0;
    openMatchedCards.length = 0;

    moves = 0;
    movesContainer.innerHTML = moves + " Moves";

    starsContainer.innerHTML = fullStar + fullStar + fullStar + fullStar + fullStar;
};

startGame();
