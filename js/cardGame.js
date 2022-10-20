// ship.js: this file is the javascript implementation of
// the 12-card dice game
// it includes the pixijs code for generating the cards, chips, dice, scoreboards, and roll button
// $ http-server -c-1 -a localhost -p 8000 /directory/path/

const Graphics = PIXI.Graphics;
const Text = PIXI.Text;
const Sprite = PIXI.Sprite;
const AnimatedSprite = PIXI.AnimatedSprite;

// object colors
let teal = 0x177e89;
let oceanic = 0x084c61;
let red = 0xdb3a34;
let yellow = 0xffc857;
let charcoal = 0x323031;

// buttons / sheet
let dice1, dice2, rollButton, dice1Roll, dice2Roll, sheet;

//create Application Window
let app = new PIXI.Application({
  backgroundColor: 0xffffff,
  resolution: 1
});

// create window height variable
windowWidth = window.innerWidth - 17;
windowHeight = window.innerHeight - 10;

// resize the window to fit the whole screen
app.renderer.resize(windowWidth, windowHeight);
document.body.appendChild(app.view);

app.loader.baseUrl = "./images";

app.loader.add("dice1", "dice1.png")
  .add("dice2", "dice2.png")
  .add("dice3", "dice3.png")
  .add("dice4", "dice4.png")
  .add("dice5", "dice5.png")
  .add("dice6", "dice6.png")
  .add("rollButton", "rollButton.png")
  .add("diceRoll", "dice.json");
app.loader.onComplete.add(createGame);
app.loader.load();

// rectangle surrounding the cards
const cardWindow = new Graphics;
cardWindow.beginFill(charcoal);
cardWindow.drawRect(0, 0, windowWidth, 300);
app.stage.addChild(cardWindow);

//create player names
const player1 = new Text("PLAYER 1", { fontSize: 40, fontFamily: "\"Arial Black\", Gadget, sans-serif", fontWeight: "bold" });
const player2 = new Text("PLAYER 2", { fontSize: 40, fontFamily: "\"Arial Black\", Gadget, sans-serif", fontWeight: "bold" });
player1.x = 150;
player2.x = windowWidth - 350;
player1.y = 325;
player2.y = 325;
app.stage.addChild(player1);
app.stage.addChild(player2);

//array to hold rectangle objects (cards) that go at the top of the page
let cards = [];
let titles = [];
let cardChips1 = [];
let cardChips2 = [];

//constant card dimension values
const cardHeight = 200;
const cardWidth = 120;
const cornerRadius = 6;
const cardBorderColor = charcoal;
const cardColor = yellow;

// pixijs style object for card number text
const style = new PIXI.TextStyle({
  dropShadow: true,
  dropShadowAlpha: 0.5,
  dropShadowDistance: 5,
  fill: red,
  fontFamily: "\"Arial Black\", Gadget, sans-serif",
  fontSize: 35,
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
  cards[i].y = 50;
  cards[i].interactive = true;
  cards[i].buttonMode = true;
  cards[i].on('pointerdown', (event) => cardClick(j))
    .on('pointerover', (event) => hover(cards[j]))
    .on('pointerout', (event) => hoverOut(cards[j]));
  cards[i].endFill();

  titles[i] = new Text(i + 2, style);
  titles[i].x = cards[i].x + cardWidth / 2 - 10;
  titles[i].y = 50;

  app.stage.addChild(cards[i]);
  app.stage.addChild(titles[i]);
}

// array to hold stack of chips
let chips1 = {};
let chips2 = {};

// create a stack of chips
for (i = 0; i < 10; i++) {

  chips1[i] = new Graphics();
  chips2[i] = new Graphics();
  chips1[i].beginFill(red);              // ellipse color
  chips2[i].beginFill(teal);
  chips1[i].lineStyle(1, charcoal, 1);    // ellipse border
  chips2[i].lineStyle(1, charcoal, 1);
  chips1[i].drawEllipse(0, 0, 24, 12);    // position + size of the ellipse (topleft x, topleft y, height, width)
  chips2[i].drawEllipse(0, 0, 24, 12);
  chips1[i].x = 235;
  chips2[i].x = windowWidth - 250;
  chips1[i].y = (windowHeight + player1.y - 100) / 2 - i * 10;
  chips2[i].y = (windowHeight + player1.y - 100) / 2 - i * 10;
  chips1[i].endFill();                         // draws the ellipse
  chips2[i].endFill();

  app.stage.addChild(chips1[i]);               // stage the ellipse
  app.stage.addChild(chips2[i]);
}

// some vars for moving the chips
let currChip1 = 9;
let currChip2 = 9;

var totalChipCount = 20;
var playerTurn = 0;

function cardClick(cardNumber) {

  // to stop the card from being interactive
  let cardNum = cardNumber;

  // how many ticks take place in the animation
  let ticks = 25;

  if (playerTurn <= 10) {//player 1s turn
    // get old chip's x and y to figure out it's old card
    let oldX = chips1[currChip1].x - (cardWidth / 2);
    let oldCard = -1;

    for (i = 0; i < 11; i++) {
      if (oldX == cards[i].x)
        oldCard = i;
    }

    //decrement the chip counter on it's old card, if the chip came from a card
    if (oldCard > 0)
      cardChips[oldCard] -= 1;

    // calculate new x val based on card position
    let newX = cards[cardNumber].x + (cardWidth / 2) - 25;

    // calculate new y val based on how many chips are on the card
    let newY = cards[cardNumber].y + cardHeight - cardChips1[cardNumber] * 10;

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
    playerTurn++;
    currChip1--;

  }
  else {
    // get old chip's x and y to figure out it's old card
    let oldX = chips2[currChip2].x - (cardWidth / 2);
    let oldCard = -1;

    for (i = 0; i < 11; i++) {
      if (oldX == cards[i].x)
        oldCard = i;
    }

    //decrement the chip counter on it's old card, if the chip came from a card
    if (oldCard > 0)
      cardChips2[oldCard] -= 1;

    // calculate the new X value and Y value based on card size and location
    let newX = cards[cardNumber].x + (cardWidth / 2) + 25;
    let newY = cards[cardNumber].y + cardHeight - cardChips2[cardNumber] * 10;

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
    // but also have to find a way to decrement the card that lost it's chip
    cardChips2[cardNumber] += 1;

    // decrement current chip counter
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

  dice1.x = windowWidth / 2 - 112;
  dice1.y = 400;
  dice2.x = windowWidth / 2 + 10;
  dice2.y = 400;
  rollButton.x = windowWidth / 2 - 95;
  rollButton.y = 500;

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

playerTurn = 1;

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
    }

    ticks++;

  });

}
