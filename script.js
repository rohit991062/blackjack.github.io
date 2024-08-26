let cards = [];
let sum = 0;
let hasBlackjack = false;
let isAlive = false;
let message = "";
let player = {
    name: "Player",
    chips: 145
};

let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");
let cardsImagesEl = document.getElementById("cards-images");
let rulesModal = document.getElementById("rules-modal");

playerEl.textContent = player.name + ": $" + player.chips;

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    if (randomNumber > 10) {
        return 10;
    } else if (randomNumber === 1) {
        return 11;
    } else {
        return randomNumber;
    }
}

function startGame() {
    isAlive = true;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    renderGame();
}

function renderGame() {
    cardsEl.textContent = "Cards: ";
    sumEl.textContent = "Sum: " + sum;
    cardsImagesEl.innerHTML = ""; // Clear existing cards

    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " ";
        let cardImage = document.createElement("img");
        cardImage.src = "images/cards/" + cards[i] + "_of_hearts.png"; // Update this line based on your image naming convention
        cardsImagesEl.appendChild(cardImage);
    }

    if (sum <= 20) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "You've got Blackjack!";
        hasBlackjack = true;
    } else {
        message = "You're out of the game!";
        isAlive = false;
    }
    messageEl.textContent = message;
}

function newCard() {
    if (isAlive && !hasBlackjack) {
        let card = getRandomCard();
        sum += card;
        cards.push(card);
        renderGame();
    }
}

function toggleRules() {
    if (rulesModal.style.display === "block") {
        rulesModal.style.display = "none";
    } else {
        rulesModal.style.display = "block";
    }
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == rulesModal) {
        rulesModal.style.display = "none";
    }
}
