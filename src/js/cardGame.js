// ship.js: this file is the javascript implementation of
// the 12-card dice game

/*

MISC
  [] about page
  [] main homescreen images
 */

// constants for arrays holding values for p1 and p2
const PLAYER_1 = 0;
const PLAYER_2 = 1;

// color scheme
const teal = 0x177e89;
const oceanic = 0x084c61;
const red = 0xdb3a34;
const yellow = 0xffc857;
var charcoal = 0xd3d3d3;
const green = 0x3bb143;
const black = 0x000000;
const white = 0xffffff;

//pixi objs
const Graphics = PIXI.Graphics;
const Text = PIXI.Text;
const Sprite = PIXI.Sprite;

// create window height variable
const windowWidth = document.body.clientWidth;
const windowHeight = window.innerHeight;

// load in the sound files
let audio_pop = new Audio("../sounds/pop.mp3");
audio_pop.volume = 0.5;
let audio_roll = new Audio("../sounds/dice_roll.mp3");
let audio_woosh = new Audio("../sounds/short_woosh.mp3");
let audio_point = new Audio("../sounds/point_2.mp3");
let audio_misclick = new Audio("../sounds/wrong.mp3");

window.onload = function () {
  let volume = document.getElementById("volume-control");
  volume.addEventListener("input", function (e) {
    audio_roll.volume = e.currentTarget.value / 100;
    audio_pop.volume = e.currentTarget.value / 100;
    audio_woosh.volume = e.currentTarget.value / 100;
    audio_point.volume = e.currentTarget.value / 100;
    audio_misclick.volume = e.currentTarget.value / 100;
  });
};

// text styles
// sytle for the numbers on the cards
var cardStyle = new PIXI.TextStyle({
  dropShadow: true,
  dropShadowAlpha: 0.5,
  dropShadowDistance: 5,
  fill: white,
  fontFamily: "Comic Sans MS",
  fontSize: windowWidth * 0.02,
  fontWeight: "bolder",
  lineJoin: "round",
  strokeThickness: 1,
});

//prompt's text style
var promptStyle = new PIXI.TextStyle({
  dropShadow: true,
  dropShadowAlpha: 0.5,
  dropShadowAngle: 0.5,
  dropShadowBlur: 2,
  dropShadowColor: "#f9f06b",
  fontFamily: "Helvetica",
  fontSize: windowWidth * 0.02,
  fontWeight: "bold",
  fill: red,
});

// score text style beneach player sides
var scoreStyle = new PIXI.TextStyle({
  fontSize: windowWidth * 0.03,
  fontFamily: "Comic Sans MS",
  fontWeight: "bold",
  align: "center",
});

//create Application Window
let app = new PIXI.Application({
  transparent: true,
  width: windowWidth,
  height: windowHeight * 0.77,
});

// append the application window to the page
document.body.appendChild(app.view);

// gameplay objects
// RST
let dice1,
  dice2,
  rollButton,
  powerBar,
  powerBarIndicator,
  promptBackdrop,
  prompt;

// flag to move powerBarIndicator
// RST
var powerBarMove = false;

// initialize turn
// RST
var playerTurn = 1;

// Stack class
class Stack {
  // Array is used to implement stack
  constructor() {
    this.items = [];
  }

  // Functions to be implemented
  push(element) {
    this.items.push(element);
  }
  pop() {
    if (this.items.length == 0) return "Underflow";
    return this.items.pop();
  }
  peek() {
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length == 0;
  }
  contains(val) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i] == val) {
        return true;
      }
    }
    return false;
  }
  printStack() {
    var str = "";
    for (var i = 0; i < this.items.length; i++) {
      str += this.items[i] + " ";
    }
    return str;
  }
}

// have everything run from the main funciton eventually
function main() {
  // create game
  createGame();
  // play game
  // show results
}

// function to update the prompt message throughout the game
function updatePrompt(newMessage, turn) {
  if (turn == PLAYER_1) {
    promptStyle.fill = red;
  } else if (turn == PLAYER_2) {
    promptStyle.fill = teal;
  }

  prompt.text = newMessage;
  prompt.x = (windowWidth - prompt.width) / 2;
  promptBackdrop.width = prompt.width * 1.02;
  promptBackdrop.x = prompt.x - prompt.width * 0.02;
}

// base url of dice images
app.loader.baseUrl = "../images/";

// load and name all dice images
app.loader
  .add("dice0", "dice0.png")
  .add("dice1", "dice1.png")
  .add("dice2", "dice2.png")
  .add("dice3", "dice3.png")
  .add("dice4", "dice4.png")
  .add("dice5", "dice5.png")
  .add("dice6", "dice6.png")
  .add("rollButton", "rollButton.png");

// after images are loaded, create the game
app.loader.onComplete.add(createGame);
app.loader.load();

// card class with card objects and stack of chips?
// MAKE THESE NOT GLOBAL

//array to hold rectangle objects (cards) that go at the top of the page
let cardChips1 = []; // amount of chips on any given card
let cardChips2 = [];
var chipStack1 = new Array(11); // all indeces of the chips on a card from top to bottom
var chipStack2 = new Array(11);
var data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let chipsPlaced1 = new Array(11); // where all the chips were initially placed, doesn't change after chips are removed
let chipsPlaced2 = new Array(11);

let playerBackgrounds = [];

// initialize the created arrays
for (let i = 0; i < 11; i++) {
  chipsPlaced1[i] = 0;
  chipsPlaced2[i] = 0;
}

//constant card dimension values
const cardHeight = windowHeight * 0.23;
const cardWidth = windowWidth * 0.07;
const cornerRadius = 6;

//global, can go in creategame or not
var chips1 = []; // hold's player 1's chips
var chips2 = []; // holds player 2's chips
var cards = []; // all the card objects

// function creates the dice, roll button, and power bar
function createGame() {
  // gameplay objects create struct for gameplay objects?

  // text objects create struct of text objects?
  let playerText = []; // array holding each players "remaining chips"
  let playerScoreText = []; // array holding the score TEXT objects
  let scoreboard = [0, 0]; // holds player scores

  // create the gameplay prompt
  createPrompt();

  // create the user's score and label
  createPlayerScores(playerText, playerScoreText, scoreboard);

  // create the cards in the game
  createCards(cards, chips1, chips2, playerText, playerScoreText, scoreboard);

  // create the game chips
  createChips(chips1, chips2, playerText, playerScoreText, scoreboard);

  // create the dice for the game
  createDice();

  // create the roll button
  createRollButton(playerText, playerScoreText, scoreboard);

  // create power bar
  createPowerBar();

  // add the objects to the screen
  app.stage.addChild(dice1);
  app.stage.addChild(dice2);
}

//global variables
function createChips(chips1, chips2, playerText, playerScoreText, scoreboard) {
  // create a stack of chips
  for (i = 0; i < 10; i++) {
    let j = i;

    const chipWidth = windowWidth * 0.012;
    const chipHeight = windowWidth * 0.008;

    chips1[i] = new Graphics();
    chips2[i] = new Graphics();
    chips1[i].beginFill(red); // ellipse color
    chips2[i].beginFill(teal);
    chips1[i].lineStyle(1, 0x000000, 1); // ellipse border
    chips2[i].lineStyle(1, 0x000000, 1);
    chips1[i].drawEllipse(0, 0, chipWidth, chipHeight); // position + size of the ellipse (topleft x, topleft y, height, width)
    chips2[i].drawEllipse(0, 0, chipWidth, chipHeight);
    chips1[i].x = playerText[PLAYER_1].x + playerText[PLAYER_1].width / 2;
    chips2[i].x = playerText[PLAYER_2].x + playerText[PLAYER_2].width / 2;
    chips1[i].y =
      playerText[PLAYER_1].y +
      chips1[0].height * 6 -
      (chips1[0].height / 4) * i;
    chips2[i].y =
      playerText[PLAYER_2].y +
      chips1[0].height * 6 -
      (chips1[0].height / 4) * i;
    chips1[j].interactive = true;
    chips2[j].interactive = true;
    chips1[j].buttonMode = true;
    chips2[j].buttonMode = true;
    chips1[j].on("pointerdown", () =>
      chipClick(
        j,
        PLAYER_1,
        chips1,
        chips2,
        playerText,
        playerScoreText,
        scoreboard
      )
    );
    chips2[j].on("pointerdown", () =>
      chipClick(
        j,
        PLAYER_2,
        chips1,
        chips2,
        playerText,
        playerScoreText,
        scoreboard
      )
    );
    chips1[i].endFill(); // draws the ellipse
    chips2[i].endFill();

    app.stage.addChild(chips1[i]); // stage the ellipse
    app.stage.addChild(chips2[i]);
  }
}

// global variables used:
// - promptBackdrop
// - prompt
function createPrompt() {
  // create the original game prompt
  // instructional propmt x and y coordinates, size, and colors
  prompt = new Text("Player 1 click on a card to place your chip", promptStyle);
  prompt.resolution = 2;
  prompt.x = (windowWidth - prompt.width) / 2;
  prompt.y = windowHeight * 0.34;

  // create prompt highlighting
  // backdrop to the prompt x and y coords, size, and colors
  promptBackdrop = new Graphics();
  promptBackdrop.beginFill(yellow);
  promptBackdrop.drawRoundedRect(
    0,
    0,
    prompt.width * 1.02, // width
    prompt.height * 1.02, //height
    6 // corner radius
  );
  promptBackdrop.x = prompt.x - prompt.width * 0.01;
  promptBackdrop.y = prompt.y - prompt.height * 0.02;
  promptBackdrop.alpha = 0.6;
  promptBackdrop.endFill();

  app.stage.addChild(promptBackdrop);
  app.stage.addChild(prompt);
}

//global vars
// - scoreboard
function createPlayerScores(playerText, playerScoreText, scoreboard) {
  //create player names with styling
  playerText[PLAYER_1] = new Text("Player 1's chip stack", {
    fontSize: windowWidth * 0.015,
    fontFamily: '"Arial Black", Gadget, sans-serif',
    fontWeight: "bold",
    fill: red,
    align: "center",
    resolution: 2,
  });
  playerText[PLAYER_2] = new Text("Player 2's chip stack", {
    fontSize: windowWidth * 0.015,
    fontFamily: '"Arial Black", Gadget, sans-serif',
    fontWeight: "bold",
    fill: teal,
    align: "center",
    resolution: 2,
  });
  playerScoreText[PLAYER_1] = new Text("0", scoreStyle);
  playerScoreText[PLAYER_2] = new Text("0", scoreStyle);
  scoreboard = [0, 0];

  // position and size the text based on window size
  playerText[PLAYER_1].x = windowWidth * 0.05;
  playerText[PLAYER_2].x = windowWidth * 0.95 - playerText[PLAYER_2].width;

  playerScoreText[PLAYER_1].x =
    windowWidth * 0.05 + playerText[PLAYER_1].width / 2;
  playerScoreText[PLAYER_2].x =
    windowWidth * 0.95 - playerText[PLAYER_2].width / 2;

  playerText[PLAYER_1].y = windowHeight * 0.35;
  playerText[PLAYER_2].y = windowHeight * 0.35;
  playerScoreText[PLAYER_1].y = windowHeight * 0.45;
  playerScoreText[PLAYER_2].y = windowHeight * 0.45;
}

// global variables
// - cardChips1, cardChips2
// - chipStack1, chipStack2
// - cards
function createCards(
  cards,
  chips1,
  chips2,
  playerText,
  playerScoreText,
  scoreboard
) {
  let titles = []; // card labels 2-12

  let chipTracker = [];
  chipTracker[0] = 9;
  chipTracker[1] = 9;
  chipTracker[2] = 20;

  // create the cards at the top of the application screen
  for (i = 0; i < 11; i++) {
    let j = i;

    cardChips1[j] = 0;
    cardChips2[j] = 0;
    chipStack1[j] = new Stack();
    chipStack2[j] = new Stack();
    cards[i] = new Graphics();
    cards[i].beginFill(yellow);
    cards[i].lineStyle(2, charcoal, 4);
    cards[i].drawRoundedRect(0, 0, cardWidth, cardHeight, cornerRadius);
    cards[i].x = (windowWidth / 11) * i + (windowWidth / 11 - cardWidth) / 2;
    cards[i].y = windowHeight * 0.05;
    cards[i].interactive = true;
    cards[i].buttonMode = true;
    cards[i]
      .on("pointerdown", () =>
        cardClick(
          cards,
          j,
          chipTracker,
          chips1,
          chips2,
          playerText,
          playerScoreText,
          scoreboard
        )
      )
      .on("pointerover", () => hover(cards[j], 0.82))
      .on("pointerout", () => hoverOut(cards[j]));
    cards[i].endFill();

    // add the numbers to cards
    titles[i] = new Text(i + 2, cardStyle);
    titles[i].resolution = 2;
    if (i < 8) {
      titles[i].x = cards[i].x + (cardWidth / 2) * 0.75;
    } else {
      titles[i].x = cards[i].x + (cardWidth / 2) * 0.65;
    }

    titles[i].y = windowHeight * 0.05;

    app.stage.addChild(cards[i]);
    app.stage.addChild(titles[i]);
  }

  // add each players background thing
  playerBackgrounds[PLAYER_1] = new Graphics();
  playerBackgrounds[PLAYER_2] = new Graphics();
  playerBackgrounds[PLAYER_1].beginFill(red);
  playerBackgrounds[PLAYER_1].lineStyle(4, charcoal, 4);
  playerBackgrounds[PLAYER_1].alpha = 0.2;
  playerBackgrounds[PLAYER_1].drawRoundedRect(
    0,
    0,
    playerText[PLAYER_1].width,
    windowHeight * 0.3,
    10
  );
  playerBackgrounds[PLAYER_1].x = playerText[PLAYER_1].x;
  playerBackgrounds[PLAYER_1].y = playerText[PLAYER_1].y;

  playerBackgrounds[PLAYER_2].beginFill(teal);
  playerBackgrounds[PLAYER_2].lineStyle(4, charcoal, 4);
  playerBackgrounds[PLAYER_2].alpha = 0.2;
  playerBackgrounds[PLAYER_2].drawRoundedRect(
    0,
    0,
    playerText[PLAYER_2].width,
    windowHeight * 0.3,
    10
  );
  playerBackgrounds[PLAYER_2].x = playerText[PLAYER_2].x;
  playerBackgrounds[PLAYER_2].y = playerText[PLAYER_2].y;

  app.stage.addChild(playerBackgrounds[PLAYER_1]);
  app.stage.addChild(playerBackgrounds[PLAYER_2]);

  // adding player info labels to screen
  app.stage.addChild(playerText[PLAYER_1]);
  app.stage.addChild(playerText[PLAYER_2]);
}

//global variables
// - dice1, dice2
function createDice() {
  // load in the dice images
  dice1 = new Sprite.from(app.loader.resources["dice0"].texture);
  dice2 = new Sprite.from(app.loader.resources["dice0"].texture);

  // size and positioning of each dice
  dice1.width = windowWidth * 0.06;
  dice1.height = windowWidth * 0.06;
  dice2.width = windowWidth * 0.06;
  dice2.height = windowWidth * 0.06;
  dice1.x = windowWidth / 2 - dice1.width;
  dice1.y = windowHeight * 0.47;
  dice2.x = windowWidth / 2;
  dice2.y = windowHeight * 0.47;
}

// global variables
// - rollButton
function createRollButton(playerText, playerScoreText, scoreboard) {
  rollButton = new Sprite.from(app.loader.resources["rollButton"].texture);

  // size and positioning of roll button
  rollButton.width = windowWidth * 0.1;
  rollButton.height = windowHeight * 0.1;
  rollButton.x = (windowWidth - rollButton.width) / 2;
  rollButton.y = dice1.y + dice1.height * 1.15;

  // make the objects interactive and assign functions to them
  rollButton.interactive = true;
  rollButton.buttonMode = true;
  rollButton
    .on("pointerdown", () => roll(playerText, playerScoreText, scoreboard))
    .on("pointerover", () => hover(rollButton, 0.82))
    .on("pointerout", () => hoverOut(rollButton));
}

// global variables
// - powerBar
// - powerBarIndicator;
function createPowerBar() {
  // draw the powerbar for dice power as a gradient
  const quality = 256;
  const canvas = document.createElement("canvas");
  canvas.width = quality;
  canvas.height = 1;
  const ctx = canvas.getContext("2d");
  const grd = ctx.createLinearGradient(0, 0, quality, 0);
  grd.addColorStop(0, "white");
  grd.addColorStop(0.05, "red");
  grd.addColorStop(0.5, "yellow");
  grd.addColorStop(0.95, "green");
  grd.addColorStop(1, "white");

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, quality, 1);

  const gradTexture = PIXI.Texture.from(canvas);
  powerBar = new Sprite(gradTexture);
  powerBar.position.set(dice1.x, dice1.y + dice1.height * 1.03);
  powerBar.width = dice1.width * 2;
  powerBar.height = dice1.height / 4;

  // draw power bar indicator
  powerBarIndicator = new Graphics();
  powerBarIndicator.beginFill(red);
  powerBarIndicator.drawRoundedRect(
    0,
    0,
    powerBar.width / 20,
    dice1.height / 3,
    4
  );
  powerBarIndicator.x = dice1.x;
  powerBarIndicator.y = dice1.y + dice1.height * 0.99;
  powerBarIndicator.endFill();
}

// global variables
function switchTurns(turn, playerText, playerScoreText) {
  if (turn == 1) {
    //grey out the other player's text
    playerText[PLAYER_2].alpha = 0.5;
    playerScoreText[PLAYER_2].alpha = 0.5;
    playerText[PLAYER_1].alpha = 1;
    playerScoreText[PLAYER_1].alpha = 1;
  } else if (turn == 2) {
    playerText[PLAYER_1].alpha = 0.5;
    playerScoreText[PLAYER_1].alpha = 0.5;
    playerText[PLAYER_2].alpha = 1;
    playerScoreText[PLAYER_2].alpha = 1;
  }
}

// players sending chips to their cards
function cardClick(
  cards,
  cardNumber,
  chipTracker,
  chips1,
  chips2,
  playerText,
  playerScoreText,
  scoreboard
) {
  // how many ticks take place in the animation
  let ticks = 20;

  let currChip1 = chipTracker[0];
  let currChip2 = chipTracker[1];
  let totalChipCount = chipTracker[2];

  if (playerTurn == 1 && totalChipCount > 0) {
    //player 1s turn
    // play chip moving audio
    audio_woosh.pause();
    audio_woosh.currentTime = 0;
    audio_woosh.play();

    // track score information
    if (scoreboard[PLAYER_1] < 10) scoreboard[PLAYER_1]++;
    playerScoreText[PLAYER_1].text = scoreboard[PLAYER_1];

    // calculate new x val based on card position
    let newX = cards[cardNumber].x + cardWidth * 0.25;

    // calculate new y val based on how many chips are on the card
    let newY =
      cards[cardNumber].y +
      cardHeight -
      cardChips1[cardNumber] * (windowWidth * 0.006);

    // calculate how large each step is based on the difference between new and old positions
    let xVelocity = (newX - chips1[currChip1].x) / ticks;
    let yVelocity = (newY - chips1[currChip1].y) / ticks;

    let count = 0;

    // ticker functino to move the chip
    app.ticker.add(() => {
      // only perform the specified number of steps
      if (count < ticks) {
        chips1[currChip1 + 1].x += xVelocity;
        chips1[currChip1 + 1].y += yVelocity;
        // prevent double-clicking
        for (let i = 0; i < 11; i++) {
          cards[i].interactive = false;
        }
        count++;
      } else {
        // once chip is moved, allow clicking again
        for (let i = 0; i < 11; i++) {
          cards[i].interactive = true;
        }
      }
    });

    chipStack1[cardNumber].push(currChip1); // push chip index onto stack

    // increment the number of chips on card cardNumber
    cardChips1[cardNumber] += 1;
    chipsPlaced1[cardNumber] += 1;

    // increment current chip counter
    updatePrompt("Player 2 click on a card to place your chip", PLAYER_2);
    playerTurn = 2;
    switchTurns(2, playerText, playerScoreText);
    currChip1--;
    chipTracker[0]--;
  } else if (playerTurn == 2 && totalChipCount > 0) {
    audio_woosh.pause();
    audio_woosh.currentTime = 0;
    audio_woosh.play();

    // scoreboard information
    if (scoreboard[PLAYER_2] < 10) scoreboard[PLAYER_2]++;

    playerScoreText[PLAYER_2].text = scoreboard[PLAYER_2];

    // calculate the new X value and Y value based on card size and location
    let newX = cards[cardNumber].x + cardWidth * 0.75;
    let newY =
      cards[cardNumber].y +
      cardHeight -
      cardChips2[cardNumber] * (windowWidth * 0.006);

    let xVelocity = (newX - chips2[currChip2].x) / ticks;
    let yVelocity = (newY - chips2[currChip2].y) / ticks;

    // count the number of iteratoins through the loop
    let count = 0;

    // ticker function to move the chip
    app.ticker.add(() => {
      if (count < ticks) {
        chips2[currChip2 + 1].x += xVelocity;
        chips2[currChip2 + 1].y += yVelocity;
        // prevent double-clicking
        for (let i = 0; i < 11; i++) {
          cards[i].interactive = false;
        }
        count++;
      } else {
        // once move is finished, allow clicking again
        for (let i = 0; i < 11; i++) {
          cards[i].interactive = true;
        }
      }
    });

    // update which chip got sent to which card
    chipStack2[cardNumber].push(currChip2);

    // increment the number of chips on card cardNumber
    cardChips2[cardNumber] += 1;
    chipsPlaced2[cardNumber] += 1;

    // decrement current chip counter
    updatePrompt("Player 1 click on a card to place your chip", PLAYER_1);
    playerTurn = 1;
    switchTurns(1, playerText, playerScoreText);
    currChip2--;
    chipTracker[1]--;
  }
  totalChipCount--;
  chipTracker[2]--;

  // if all chips are placed on the board stage player text and update prompt
  if (totalChipCount == 0) {
    updatePrompt("Player 1's roll", PLAYER_1);
    for (i = 0; i < 11; i++) {
      let j = i;
      cards[j].interactive = false;
      cards[j].buttonMode = false;
      cards[j].on("pointerover", () => hover(cards[j], 1));
    }

    // updating the player prompt
    playerText[PLAYER_1].text = "Player 1's\n Remaining Chips:";
    playerText[PLAYER_2].text = "Player 2's\n Remaining Chips:";

    // centering the text
    playerScoreText[PLAYER_1].x =
      playerText[PLAYER_1].x +
      playerText[PLAYER_1].width / 2 -
      playerScoreText[PLAYER_1].width / 2;

    playerScoreText[PLAYER_2].x =
      playerText[PLAYER_2].x +
      playerText[PLAYER_2].width / 2 -
      playerScoreText[PLAYER_2].width / 2;

    // realign the backgrounds
    playerBackgrounds[PLAYER_1].width = playerText[PLAYER_1].width + 4;
    playerBackgrounds[PLAYER_2].width = playerText[PLAYER_2].width + 4;
    playerText[PLAYER_1].x = playerBackgrounds[PLAYER_1].x;
    playerText[PLAYER_2].x = playerBackgrounds[PLAYER_2].x;

    app.stage.addChild(playerScoreText[PLAYER_1]);
    app.stage.addChild(playerScoreText[PLAYER_2]);

    app.stage.addChild(rollButton);
    app.stage.addChild(powerBar);
    app.stage.addChild(powerBarIndicator);
    powerBarMove = true;

    // move the power bar indicator up and down the power bar
    let elapsed = 0.0;
    app.ticker.add((delta) => {
      // move the powerBar if the move is set to true
      if (powerBarMove == true) {
        elapsed += delta;
        powerBarIndicator.x =
          Math.cos(elapsed / 20) * (powerBar.width / 2) +
          (powerBar.width / 2 + powerBar.x * 0.99);
      } else if (elapsed > 0) {
        // fix this part, if resetting, the powerBarIndicator should go back to the original x value, while still being able ot freeze
        elapsed -= delta;
      }
    });
  }
}

function hover(object, alphaVal) {
  object.alpha = alphaVal;
}

function hoverOut(object) {
  object.alpha = 1;
}

// array to track the number of rolls for each player
var numRolls = new Array(2);
numRolls[PLAYER_1] = 0;
numRolls[PLAYER_2] = 0;

var clickableCard = -1;

// upon click of roll button
function roll(playerText, playerScoreText, scoreboard) {
  audio_roll.pause();
  audio_roll.currentTime = 0;
  audio_roll.play();

  powerBarMove = false;

  // making the dice interactive
  dice1.interactive = true;
  dice2.interactive = true;

  let ticks = 0;

  // dice rolls
  let roll1 = 1;
  let roll2 = 1;

  // ticker function to roll the dice
  app.ticker.add(() => {
    // only roll dice every 5 ticks 10 times (50/5)
    if (ticks % 5 == 0 && ticks < 50) {
      // gen rand num 1-6
      roll1 = Math.floor(Math.random() * 6) + 1;
      roll2 = Math.floor(Math.random() * 6) + 1;

      // change the face texture
      dice1.texture = app.loader.resources[`dice${roll1}`].texture;
      dice2.texture = app.loader.resources[`dice${roll2}`].texture;
      rollButton.interactive = false;
    }
    // dice is finished rolling
    else if (ticks == 50) {
      data[roll1 + roll2 - 2]++;
      updateChart();
      let totalRolled = roll1 + roll2;

      // player 1's turn
      if (playerTurn == 1) {
        numRolls[PLAYER_1] += 1;

        // a card is rolled with chips on it
        if (cardChips1[totalRolled - 2] > 0) {
          rollButton.interactive = false;
          updatePrompt(
            "click on the correct pile to remove the chip",
            PLAYER_1
          );

          clickableCard = totalRolled - 2;
        } else {
          // move to player 2's turn
          updatePrompt("Player 2's roll", PLAYER_2);
          playerTurn = 2;
          switchTurns(2, playerText, playerScoreText);
          rollButton.interactive = true;

          // reset power bar, and continue to move it
          powerBarIndicator.x = dice1.x;
          powerBarMove = true;
        }
      } else {
        // a card is rolled with chips on it
        numRolls[PLAYER_2] += 1;
        if (cardChips2[totalRolled - 2] > 0) {
          rollButton.interactive = false;
          updatePrompt(
            "click on the correct pile to remove the chip",
            PLAYER_2
          );

          clickableCard = totalRolled - 2;
        } else {
          // move to player 1's turn
          updatePrompt("Player 1's roll", PLAYER_1);
          playerTurn = 1;
          switchTurns(1, playerText, playerScoreText);
          rollButton.interactive = true;

          // reset power bar, and continue to move it
          powerBarIndicator.x = dice1.x;
          powerBarMove = true;
        }
      }

      ticks++;
    }

    ticks++;

    // for now, just reload the page if someone wins
    if (scoreboard[PLAYER_1] == 0 || scoreboard[PLAYER_2] == 0) {
      rollButton.interactive = false;
      app.stage.removeChild(dice1);
      app.stage.removeChild(dice2);
      app.stage.removeChild(prompt);
      app.stage.removeChild(rollButton);

      // this part is broken, should it be in the ticker function?, probably not
      // also, the fstring literals aren't working right
      if (scoreboard[PLAYER_1] == 0) {
        winStr = `Player 1 won in ${numRolls[PLAYER_1]} rolls!`;
        document.getElementById("win-header").style.color = "#db3a34";
      } else if (scoreboard[PLAYER_2] == 0) {
        winStr = `Player 2 won in ${numRolls[PLAYER_2]} rolls!`;
        document.getElementById("win-header").style.color = "#177e89";
      }

      // so this if condition will not be entered again
      scoreboard[PLAYER_1] = -1;
      scoreboard[PLAYER_2] = -1;

      app.height = 1;
      for (let i = app.stage.children.length - 1; i >= 0; i--) {
        app.stage.removeChild(app.stage.children[i]);
      }

      document.getElementById("win-header").innerHTML = winStr;

      // get rid of all the gameplay objects
      for (let i = 0; i < 11; i++) {
        let j = i;
        document.getElementById(`r1c${j + 1}`).innerHTML = chipsPlaced1[j];
        document.getElementById(`r2c${j + 1}`).innerHTML = chipsPlaced2[j];
      }

      document.body.removeChild(app.view);
      document.getElementById("border").hidden = false;
    }
  });
}

function playAgain() {
  location.reload();
}

function chipClick(
  chipNo,
  player,
  chips1,
  chips2,
  playerText,
  playerScoreText,
  scoreboard
) {
  if (clickableCard != -1) {
    if (playerTurn == 1 && playerTurn == player + 1) {
      if (chipStack1[clickableCard].contains(chipNo)) {
        // remove the chip
        audio_pop.play();
        app.stage.removeChild(chips1[chipStack1[clickableCard].pop()]);
        scoreboard[PLAYER_1] -= 1;
        cardChips1[clickableCard] -= 1;
        playerScoreText[PLAYER_1].text = scoreboard[PLAYER_1];

        // recenter the score text
        playerScoreText[PLAYER_1].x =
          playerText[PLAYER_1].x +
          playerText[PLAYER_1].width / 2 -
          playerScoreText[PLAYER_1].width / 2;

        // allow game to continue5
        rollButton.interactive = true;
        updatePrompt("Player 2's roll", PLAYER_2);
        playerTurn = 2;
        switchTurns(2, playerText, playerScoreText);
        clickableCard = -1;

        //reset powerbar indicator
        powerBarIndicator.x = dice1.x;
        powerBarMove = true;
      } else {
        audio_misclick.pause();
        audio_misclick.time = 0;
        audio_misclick.play();
      }
    } else if (playerTurn == 2 && playerTurn == player + 1) {
      if (chipStack2[clickableCard].contains(chipNo)) {
        //remove the chip
        audio_pop.play(); // play audio

        app.stage.removeChild(chips2[chipStack2[clickableCard].pop()]);
        scoreboard[PLAYER_2] -= 1;
        cardChips2[clickableCard] -= 1;
        playerScoreText[PLAYER_2].text = scoreboard[PLAYER_2];

        // recenter the text
        playerScoreText[PLAYER_2].x =
          playerText[PLAYER_2].x +
          playerText[PLAYER_2].width / 2 -
          playerScoreText[PLAYER_2].width / 2;

        // allow game to continue
        rollButton.interactive = true;
        updatePrompt("Player 1's roll", PLAYER_1);
        playerTurn = 1;
        switchTurns(1, playerText, playerScoreText);
        clickableCard = -1;

        //reset powerbar indicator
        powerBarIndicator.x = dice1.x;
        powerBarMove = true;
      } else {
        audio_misclick.pause();
        audio_misclick.time = 0;
        audio_misclick.play();
      }
    } else {
      audio_misclick.pause();
      audio_misclick.time = 0;
      audio_misclick.play();
    }
  }
}

// maybe use pixi tint?
function swapTheme(dropdown) {
  theme = dropdown.innerHTML.replace(/\s/g, "").toLowerCase();

  // change to Light Mode
  if (theme == "lightmode") {
    document.body.style.backgroundColor = "#ffffff";
    charcoal = 0xd3d3d3;
    document.getElementById("dropdownThemeLabel").innerHTML = "Light Mode";
    dropdown.innerHTML = "Dark Mode";

    document.getElementById("settingsModalContent").classList.remove("bg-dark");
    document
      .getElementById("settingsModalContent")
      .classList.remove("text-white");

    // update html elemnets to work in dark mode
    document.getElementById("page-header").classList.remove("text-white");
    document.getElementById("win-header").classList.remove("bg-dark");
    document.getElementById("win-header").classList.add("bg-light");

    // change to Dark Mode
  } else if (theme == "darkmode") {
    document.body.style.backgroundColor = "#666666";
    charcoal = 0xffffff;
    document.getElementById("dropdownThemeLabel").innerHTML = "Dark Mode";
    dropdown.innerHTML = "Light Mode";

    // update html elemnets to work in dark mode
    document.getElementById("settingsModalContent").classList.add("bg-dark");
    document.getElementById("settingsModalContent").classList.add("text-white");

    document.getElementById("page-header").classList.add("text-white");
    document.getElementById("win-header").classList.remove("bg-light");
    document.getElementById("win-header").classList.add("bg-dark");

    //update PIXIjs colors
    for (let i = 0; i < 10; i++) {
      cards[i].lineStyle(2, 0xffffff, 4);
      cards[i].tint = 0xffffff;
      chips1[i].lineStyle(1, 0xffffff, 1); // ellipse border
      chips2[i].lineStyle(1, 0xffffff, 1); // ellipse border
    }

    cards[10].lineStyle(2, 0xffffff, 4);
  }
}

function updateChart() {
  // set the dimensions of the chart
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = 900 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // select the SVG element
  const svg = d3.select("svg");

  // remove any existing chart elements
  svg.selectAll("*").remove();

  // create the chart container
  const chart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // create the X and Y scales
  const x = d3
    .scaleBand()
    .domain(data.map((d, i) => i + 2))
    .range([0, width])
    .padding(0.1);

  let ymax = d3.max(data);

  const y = d3
    .scaleLinear()
    .domain([0, ymax > 0 ? ymax : 1])
    .range([height, 0]);

  // create the X and Y axes
  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y);

  // add the X and Y axes to the chart
  chart.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);
  chart.append("g").call(yAxis);

  // create the bars
  chart
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d, i) => x(i + 2))
    .attr("y", (d) => y(d))
    .attr("width", x.bandwidth())
    .attr("height", (d) => height - y(d));

  chart
    .append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -40)
    .attr("dy", ".70em")
    .attr("transform", "rotate(-90)")
    .text("Number of Hits");
}
updateChart();
