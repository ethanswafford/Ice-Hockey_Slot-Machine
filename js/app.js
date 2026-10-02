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
  },
  {
    name: "stick",
    display: "🏒",
  },
  {
    name: "skate",
    display: "⛸️",
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
