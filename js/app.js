// Connection and DEV console check
console.log("HAT TRICK SLOTS");

/*===================================
/ GAME Configuration
===================================*/
const REEL_COUNT = 5;
const ROW_COUNT = 4;
const MIN_BET = 5;
const MAX_BET = 100;
const BET_STEP = 5;

/*===================================================
TEMPORARY SYMBOL set
These emoji are placeholders.
Later we'll replace them with proper hockey artwork.
=====================================================*/
const symbols = [
  {
    name: "puck",
    display: "⚫",
    payouts: {
      3: 1,
      4: 2,
      5: 5,
    },
  },
  {
    name: "stick",
    display: "🏒",
    payouts: {
      3: 1,
      4: 3,
      5: 6,
    },
  },
  {
    name: "skate",
    display: "⛸️",
    payouts: {
      3: 2,
      4: 4,
      5: 8,
    },
  },
  {
    name: "glove",
    display: "🧤",
  },
  {
    name: "goal",
    display: "🥅",
  },
  {
    name: "trophy",
    display: "🏆",
  },
];

/*===========================================
/ GAME State
===========================================*/
const gameState = {
  balance: 1000,
  bet: MIN_BET,
  reels: [],
  win: 0,
  spinning: false,
};

/*===========================================
/ DOM Elements
===========================================*/
const reelGrid = document.querySelector("#reel-grid");
const balanceDisplay = document.querySelector("#balance");
const betDisplay = document.querySelector("#bet");
const winDisplay = document.querySelector("#win");
const gameMessage = document.querySelector("#game-message");
const spinButton = document.querySelector("#spin");
const betIncreaseButton = document.querySelector("#bet-increase");
const betDecreaseButton = document.querySelector("#bet-decrease");

/*===========================================
/ Create Slot grid
===========================================*/
function createGrid() {
  reelGrid.innerHTML = "";

  for (let reelIndex = 0; reelIndex < REEL_COUNT; reelIndex++) {
    const reel = document.createElement("div");
    reel.classList.add("reel");
    reel.dataset.reel = reelIndex;

    for (let rowIndex = 0; rowIndex < ROW_COUNT; rowIndex++) {
      const symbolElement = document.createElement("div");
      symbolElement.classList.add("symbol");
      symbolElement.dataset.reel = reelIndex;
      symbolElement.dataset.row = rowIndex;
      reel.appendChild(symbolElement);
    }
    reelGrid.appendChild(reel);
  }
}

/*===================================================
  RANDOM SYMBOL
===================================================*/

function getRandomSymbol() {
  const randomIndex = Math.floor(Math.random() * symbols.length);

  return symbols[randomIndex];
}

/*===================================================
 RANDOMIZE REELS
===================================================*/

function randomizeReels() {
  const symbolElements = document.querySelectorAll(".symbol");

  symbolElements.forEach((symbolElement) => {
    const symbol = getRandomSymbol();

    symbolElement.textContent = symbol.display;
    symbolElement.dataset.symbol = symbol.name;
  });
}

/*====================================================
  Update HUD
=====================================================*/

function updateDisplay() {
  balanceDisplay.textContent = gameState.balance;
  betDisplay.textContent = gameState.bet;
  winDisplay.textContent = gameState.win;
}

/*====================================================
 BET CONTROLS
=====================================================*/

function increaseBet() {
  if (gameState.spinning) {
    return;
  }

  if (gameState.bet >= MAX_BET) {
    return;
  }

  const newBet = gameState.bet + BET_STEP;

  if (newBet > gameState.balance) {
    return;
  }

  gameState.bet = newBet;

  updateDisplay();
}

function decreaseBet() {
  if (gameState.spinning) {
    return;
  }

  if (gameState.bet <= MIN_BET) {
    return;
  }

  gameState.bet -= BET_STEP;

  updateDisplay();
}

/*==================================================
 SPIN
===================================================*/

function spin() {
  if (gameState.spinning) {
    return;
  }

  if (gameState.balance < gameState.bet) {
    gameMessage.textContent = "NOT ENOUGH CREDITS";

    return;
  }

  gameState.spinning = true;

  gameState.win = 0;

  gameState.balance -= gameState.bet;

  gameMessage.textContent = "SPINNING...";

  updateDisplay();

  randomizeReels();

  gameMessage.textContent = "NO WIN";

  gameState.spinning = false;

  updateDisplay();
}

/*=================================================
 BUTTON EVENTS
==================================================*/

spinButton.addEventListener("click", spin);

betIncreaseButton.addEventListener("click", increaseBet);

betDecreaseButton.addEventListener("click", decreaseBet);

/*=================================================
 KEYBOARD CONTROLS
==================================================*/

document.addEventListener("keydown", (event) => {
  if (event.code === "Space" || event.code === "Enter") {
    event.preventDefault();

    spin();
  }

  if (event.key === "+" || event.key === "ArrowUp") {
    increaseBet();
  }

  if (event.key === "-" || event.key === "ArrowDown") {
    decreaseBet();
  }
});

/*==================================================
 INITIALIZE GAME
===================================================*/

function initializeGame() {
  createGrid();

  randomizeReels();

  updateDisplay();
}

initializeGame();
