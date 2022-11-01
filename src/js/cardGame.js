// ship.js: this file is the javascript implementation of
// the 12-card dice game
// it includes the pixijs code for generating the cards, chips, dice, scoreboards, and roll button
// $ http-server -c-1 -a localhost -p 8000 /directory/path/

const Graphics = PIXI.Graphics;
const Text = PIXI.Text;
const Sprite = PIXI.Sprite;
const AnimatedSprite = PIXI.AnimatedSprite;

// color scheme
const teal = 0x177e89;
const oceanic = 0x084c61;
const red = 0xdb3a34;
const yellow = 0xffc857;
const charcoal = 0x323031;

// buttons / sheet
let dice1, dice2, rollButton, dice1Roll, dice2Roll, sheet;

// create window height variable
var windowWidth = document.body.clientWidth;
var windowHeight = window.innerHeight;

//create Application Window
let app = new PIXI.Application({
  backgroundColor: 0xffffff,
  width: windowWidth,
  height: windowHeight
});

// append the application window to the page
document.body.appendChild(app.view);

// base url of dice images
app.loader.baseUrl = "./images";

// load and name all dice images
app.loader.add("dice1", "dice1.png")
  .add("dice2", "dice2.png")
  .add("dice3", "dice3.png")
  .add("dice4", "dice4.png")
  .add("dice5", "dice5.png")
  .add("dice6", "dice6.png")
  .add("rollButton", "rollButton.png")
  .add("diceRoll", "dice.json");

// after images are loaded, create the game
app.loader.onComplete.add(createGame);
app.loader.load();

// cards background
var cardWindow = new Graphics;
cardWindow.beginFill(charcoal);
cardWindow.drawRect(0, 0, windowWidth, windowHeight * .32);
app.stage.addChild(cardWindow);

//create player names
var player1 = new Text("PLAYER 1", { fontSize: windowWidth * .02, fontFamily: "\"Arial Black\", Gadget, sans-serif", fontWeight: "bold", fill: red });
var player2 = new Text("PLAYER 2", { fontSize: windowWidth * .02, fontFamily: "\"Arial Black\", Gadget, sans-serif", fontWeight: "bold", fill: teal });
var player1ScoreText = new Text("0", { fontSize: windowWidth * .07, fontFamily: "\"Arial Black\", Gadget, sans-serif", fontWeight: "bold" });
var player2ScoreText = new Text("0", { fontSize: windowWidth * .07, fontFamily: "\"Arial Black\", Gadget, sans-serif", fontWeight: "bold" });
var scoreboard = [0, 0];

player1.x = windowWidth * .08;
player2.x = windowWidth * .81;
player1ScoreText.x = windowWidth * .13;
player2ScoreText.x = windowWidth * .8;

player1.y = windowHeight * 0.35;
player2.y = windowHeight * 0.35;
player1ScoreText.y = windowHeight * .45;
player2ScoreText.y = windowHeight * .45;

app.stage.addChild(player1);
app.stage.addChild(player2);
app.stage.addChild(player1ScoreText);
app.stage.addChild(player2ScoreText);

//array to hold rectangle objects (cards) that go at the top of the page
let cards = [];
let titles = [];
let cardChips1 = [];
let cardChips2 = [];

//constant card dimension values
var cardHeight = windowHeight * .21;
var cardWidth = windowWidth * .06;
var cornerRadius = 6;
const cardBorderColor = charcoal;
const cardColor = yellow;

// pixijs style object for card number text
var style = new PIXI.TextStyle({
  dropShadow: true,
  dropShadowAlpha: 0.5,
  dropShadowDistance: 5,
  fill: red,
  fontFamily: "\"Arial Black\", Gadget, sans-serif",
  fontSize: windowWidth * .02,
  fontWeight: "bolder",
  lineJoin: "round",
  strokeThickness: 1
});

// create the cards at the top of the application screen
for (i = 0; i < 11; i++) {
  let j = i;

  cardChips1[i] = 0;
  cardChips2[i] = 0;
  cards[i] = new Graphics;
  cards[i].beginFill(cardColor);
  cards[i].lineStyle(2, cardBorderColor, 4);
  cards[i].drawRoundedRect(0, 0, cardWidth, cardHeight, cornerRadius);
  cards[i].x = ((windowWidth / 11 * i)) + (windowWidth / 11 - cardWidth) / 2;
  cards[i].y = windowHeight * .05;
  cards[i].interactive = true;
  cards[i].buttonMode = true;
  cards[i].on('pointerdown', (event) => cardClick(j))
    .on('pointerover', (event) => hover(cards[j]))
    .on('pointerout', (event) => hoverOut(cards[j]));
  cards[i].endFill();

  titles[i] = new Text(i + 2, style);
  if (i < 8) {
    titles[i].x = cards[i].x + ((cardWidth / 2) * .75);
  }
  else {
    titles[i].x = cards[i].x + ((cardWidth / 2) * .55);
  }

  titles[i].y = windowHeight * .05;

  app.stage.addChild(cards[i]);
  app.stage.addChild(titles[i]);
}

// array to hold stack of chips
let chips1 = {};
let chips2 = {};

// create a stack of chips
for (i = 0; i < 10; i++) {

  const chipWidth = windowWidth * 0.012;
  const chipHeight = windowWidth * 0.008;

  chips1[i] = new Graphics();
  chips2[i] = new Graphics();
  chips1[i].beginFill(red);              // ellipse color
  chips2[i].beginFill(teal);
  chips1[i].lineStyle(1, charcoal, 1);    // ellipse border
  chips2[i].lineStyle(1, charcoal, 1);
  chips1[i].drawEllipse(0, 0, chipWidth, chipHeight);    // position + size of the ellipse (topleft x, topleft y, height, width)
  chips2[i].drawEllipse(0, 0, chipWidth, chipHeight);
  chips1[i].x = windowWidth * .09;
  chips2[i].x = windowWidth * .9;
  chips1[i].y = (((windowHeight + player1.y - 100) * .55) - i * (windowHeight * .011)) * .85;
  chips2[i].y = (((windowHeight + player2.y - 100) * .55) - i * (windowHeight * .011)) * .85;
  chips1[i].endFill();                         // draws the ellipse
  chips2[i].endFill();

  app.stage.addChild(chips1[i]);               // stage the ellipse
  app.stage.addChild(chips2[i]);
}

// some vars for moving the chips
let currChip1 = 9;
let currChip2 = 9;

var totalChipCount = 20;
var playerTurn = 1;

function cardClick(cardNumber) {

  // how many ticks take place in the animation
  let ticks = 20;

  if (playerTurn == 1) {//player 1s turn

    // track score information
    if (scoreboard[0] < 10)
      scoreboard[0]++;
    player1ScoreText.text = scoreboard[0];
    app.stage.addChild(player1ScoreText);

    // calculate new x val based on card position
    let newX = cards[cardNumber].x + cardWidth * .25;

    // calculate new y val based on how many chips are on the card
    let newY = (cards[cardNumber].y + cardHeight - cardChips1[cardNumber] * (windowWidth * .006));

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
        for (let i = 0; i < 11; i++)
          cards[i].interactive = false;
        count++;
      }
      else {
        // once chip is moved, allow clicking again
        for (let i = 0; i < 11; i++)
          cards[i].interactive = true;
      }

    });

    // increment the number of chips on card cardNumber
    cardChips1[cardNumber] += 1;

    // increment current chip counter
    playerTurn = 2;
    currChip1--;

  }
  else {

    // scoreboard information
    if (scoreboard[1] < 10)
      scoreboard[1]++;
    player2ScoreText.text = scoreboard[1];
    app.stage.addChild(player2ScoreText);

    // calculate the new X value and Y value based on card size and location
    let newX = cards[cardNumber].x + cardWidth * .75;
    let newY = (cards[cardNumber].y + cardHeight - cardChips2[cardNumber] * (windowWidth * .006));

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
        for (let i = 0; i < 11; i++)
          cards[i].interactive = false;
        count++;
      }
      else {
        // once move is finished, allow clicking again
        for (let i = 0; i < 11; i++)
          cards[i].interactive = true;
      }

    });

    // increment the number of chips on card cardNumber
    cardChips2[cardNumber] += 1;

    // decrement current chip counter
    playerTurn = 1;
    currChip2--;

  }
  totalChipCount--;
  if (totalChipCount == 0) {
    for (i = 0; i < 10; i++) {
      let j = i;
      cards[i].interactive = false;
      cards[i].on('pointerdown', (event) => clickRemove(j));
      cards[i].alpha = 1;

    }
    app.stage.addChild(rollButton);
  }
}

function createGame() {
  sheet = app.loader.resources["./images/dice.png"];
  dice1 = new Sprite.from(app.loader.resources["dice1"].texture);
  dice2 = new Sprite.from(app.loader.resources["dice1"].texture);
  rollButton = new Sprite.from(app.loader.resources["rollButton"].texture);

  dice1.width = windowWidth * .06;
  dice1.height = windowHeight * .12;
  dice2.width = windowWidth * .06;
  dice2.height = windowHeight * .12;
  dice1.x = windowWidth * .44;
  dice1.y = windowHeight * .43;
  dice2.x = windowWidth * .5;
  dice2.y = windowHeight * .43;


  rollButton.width = windowWidth * .1;
  rollButton.height = windowHeight * .1;
  rollButton.x = windowWidth * .45;
  rollButton.y = windowHeight * .53;

  rollButton.interactive = true;
  rollButton.buttonMode = true;
  rollButton.on('pointerdown', (event) => roll())
    .on('pointerover', (event) => hover(rollButton))
    .on('pointerout', (event) => hoverOut(rollButton));

  app.stage.addChild(dice1);
  app.stage.addChild(dice2);

}

function hover(object) {
  object.alpha = 0.82;
}

function hoverOut(object) {
  object.alpha = 1;
}

// upon click of roll button
function roll() {

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
      let totalRolled = roll1 + roll2;

      // player 1's turn
      if (playerTurn == 1) {
        // if there is a chip on the card, alter the score and number of chips on that card
        if (cardChips1[totalRolled - 2] > 0) {
          scoreboard[0] -= 1;
          cardChips1[totalRolled - 2] -= 1;
          player1ScoreText.text = scoreboard[0];
          app.stage.addChild(player1ScoreText);
        }
        playerTurn = 2;
      }
      else {
        if (cardChips2[totalRolled - 2] > 0) {
          scoreboard[1] -= 1;
          cardChips2[totalRolled - 2] -= 1;
          player2ScoreText.text = scoreboard[1];
          app.stage.addChild(player2ScoreText);
        }
        playerTurn = 1;
      }

      rollButton.interactive = true;
      ticks++;
    }

    ticks++;

  });

  // for now, just reload the page if someone wins
  if (scoreboard[0] == 0 || scoreboard[1] == 0) {
    rollButton.interactive = false;
    location.reload();
  }

}
