const Graphics = PIXI.Graphics;
const Text = PIXI.Text;
const Sprite = PIXI.Sprite;
const AnimatedSprite = PIXI.AnimatedSprite;

let teal = 0x177e89;
let oceanic = 0x084c61;
let red = 0xdb3a34;
let yellow = 0xffc857;
let charcoal = 0x323031;
// $ http-server -c-1 -a localhost -p 8000 /directory/path/

// write documentation
// create an animate function that is set when the position of a chip needs to be moved
// calculate the new position in btn.onclick,
// set a flag so that the function runs in the ticker function with the calculated values
// continue


let dice1, dice2, rollButton, dice1Roll, dice2Roll, sheet;
//create Application Window
let app = new PIXI.Application({
  backgroundColor: 0xffffff,
  resolution: 1
});


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

// create window height variable
windowWidth = window.innerWidth - 17;
windowHeight = window.innerHeight - 10;

// resize the windwo to fit the whole screen
app.renderer.resize(windowWidth, windowHeight);

document.body.appendChild(app.view);

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
let pressCount1 = 0;
let currChip1 = 9;
let increasing1 = 1;
let pressCount2 = 0;
let currChip2 = 9;
let increasing2 = 1;

var totalChipCount = 20;
var playerTurn = 0;
var newX = -1;
var newY = -1;



function cardClick(cardNumber) {
  if (playerTurn <= 9) {//player 1s turn
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

    chips1[currChip1].x = newX;
    chips1[currChip1].y = newY;

    // increment the number of chips on card cardNumber
    // but also have to find a way to decrement the card that lost it's chip
    cardChips1[cardNumber] += 1;

    // increment/decrement counters
    pressCount1++;
    currChip1--;
    playerTurn++;
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

    // calculate new x val based on card position
    chips2[currChip2].x = cards[cardNumber].x + (cardWidth / 2) + 25;

    // calculate new y val based on how many chips are on the card
    chips2[currChip2].y = cards[cardNumber].y + cardHeight - cardChips2[cardNumber] * 10;

    // increment the number of chips on card cardNumber
    // but also have to find a way to decrement the card that lost it's chip
    cardChips2[cardNumber] += 1;

    // increment/decrement counters
    pressCount2++;
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


count = 0;

app.ticker.add(() => {
  count += 0.1;

  // the function is Math.sin(count) * newY or newX
  // chips1[0].x = (Math.cos(count) * 100) + 100;
  // chips1[0].y = (Math.sin(count) * 100) + 100;
});

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

function roll() {

  const textures = [];

  for (let i = 1; i < 7; i++) {
    const texture = app.loader.resources[`dice${i}`].texture;
    textures.push(texture);
  }

  const die = new PIXI.AnimatedSprite(textures);
  die.position.set(dice1.x, dice1.y);
  die.scale(2, 2);
  app.stage.removeChild(dice1);
  app.stage.addChild(die);
  die.play();

  // die.play();
  // dice1.interactive = true;
  // dice2.interactive = true;
  // dice1.anchor.set(0.5);
  // dice2.anchor.set(0.5);

  // elapsed = 0.0;

  // // change the face texture
  // dice1.texture = app.loader.resources[dieFaces[randNum]].texture;
  // dice2.texture = app.loader.resources[dieFaces[randNum]].texture;

  // app.ticker.add((delta) => {
  //   elapsed += 0.0;

  //   let randNum = Math.floor(Math.random() * 6) + 1;

  //   // spinning the dice
  //   dice1.rotation += 0.1;
  //   dice2.rotation += 0.1;

  //   dice1 = new Sprite.from(app.loader.resources[`dice${randNum}`].texture);

  // });
}
