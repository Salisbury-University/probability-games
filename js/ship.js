
// queue class used to store chips
class Queue {
  constructor() {
    this.elements = {};
    this.head;
    this.tail;
  }
  enqueue(element) {
    this.elements[this.tail] = element;
    this.tail++;
  }
  dequeue() {
    const item = this.elements[this.head];
    delete this.elements[this.head];
    this.head++;
    return item;
  }
  top() {
    return this.elements[this.head];
  }
  get length() {
    return this.tail - this.head;
  }
  get isEmpty() {
    return this.length === 0;
  }
}

// $ http-server -c-1 -a localhost -p 8000 /directory/path/

// write documentation
// create an animate function that is set when the position of a chip needs to be moved
// calculate the new position in btn.onclick,
// set a flag so that the function runs in the ticker function with the calculated values
// continue

// create the button first so its at the top

var count = 0;

let app = new PIXI.Application({
  backgroundColor: 0x548CC3
});

// create window height variable
windowWidth = window.innerWidth - 10;
windowHeight = window.innerHeight - 10;

// resize the windwo to fit the whole screen
app.renderer.resize(windowWidth, windowHeight);

document.body.appendChild(app.view);

const Graphics = PIXI.Graphics;
const TitleText = PIXI.Text;
const PlayerText = PIXI.Text;

// rectangle surrounding the cards
let cardWindow = new Graphics;

cardWindow.beginFill(0x35654d);
cardWindow.lineStyle(20, 0x725044);
cardWindow.drawRoundedRect(0, 0, windowWidth, 300);
app.stage.addChild(cardWindow);


if (count == 10) {
  console.log("fuck you");
}
//array to hold rectangle objects (cards) that go at the top of the page
let cards = [];
let titles = [];
let cardChips = [];

//constant card dimension values
const cardHeight = 200;
const cardWidth = 120;
const cornerRadius = 6;
const cardBorderColor = 0xb8c0e0;
const cardColor = 0xffffff;

// create the cards at the top of the application screen
for (i = 0; i < 11; i++) {
  let j = i;
  titles[i] = new TitleText(i + 2);
  titles[i].x = ((windowWidth / 11 * i) + (windowWidth / 11 - cardWidth) / 2) + 50;
  titles[i].y = 50;
  cardChips[i] = 0;
  cards[i] = new Graphics;
  cards[i].beginFill(cardColor);
  cards[i].lineStyle(1, cardBorderColor, 1);
  cards[i].drawRoundedRect(0, 0, cardWidth, cardHeight, cornerRadius);
  cards[i].x = ((windowWidth / 11 * i)) + (windowWidth / 11 - cardWidth) / 2;
  cards[i].y = 50;
  cards[i].interactive = true;
  cards[i].buttonMode = true;
  cards[i].on('pointerdown', (event) => clickMove(j));
  cards[i].endFill();

  app.stage.addChild(cards[i]);
  app.stage.addChild(titles[i]);
}

// array to hold stack of chips
let chips = {};

// chip color vars
const chipWidth = 24;
const chipHeight = chipWidth / 2;
const chipColor = 0xd4af37;
const chipBorderColor = 0x000000;
const numChips = 10;

// create a stack of chips
for (i = 0; i < numChips; i++) {

  chips[i] = new Graphics();
  chips[i].beginFill(chipColor);              // ellipse color
  chips[i].lineStyle(1, chipBorderColor, 1);  // ellipse border
  chips[i].drawEllipse(0, 0, 24, 12);  // position + size of the ellipse (topleft x, topleft y, height, width)
  // note: while rectangle has its x and y at the top left, ellipse's x and y are at its center
  chips[i].x = windowWidth / 2;
  chips[i].y = (windowHeight + 100) / 2 - i * 10;
  chips[i].endFill();                         // draws the ellipse

  app.stage.addChild(chips[i]);               // stage the ellipse
}

// loop is an arbitrary name for the funciton called by the ticker method which is a continuous loop
app.ticker.add(delta => loop(delta));

// move the text back and forth accross the whole screen
let elapsed = 0.0;

// main loop
function loop(delta) {
  elapsed += delta;
}

// some vars for moving the chips
let pressCount = 0;
let currChip = 9;
let increasing = 1;

function clickMove(cardNumber) {

  // get old chip's x and y to figure out it's old card
  let oldX = chips[currChip].x - (cardWidth / 2);
  let oldCard = -1;

  for (i = 0; i < 11; i++) {
    if (oldX == cards[i].x)
      oldCard = i;
  }

  //decrement the chip counter on it's old card, if the chip came from a card
  if (oldCard > 0)
    cardChips[oldCard] -= 1;

  // calculate new x val based on card position
  chips[currChip].x = cards[cardNumber].x + (cardWidth / 2);

  // calculate new y val based on how many chips are on the card
  chips[currChip].y = cards[cardNumber].y + cardHeight - cardChips[cardNumber] * 10;

  // increment the number of chips on card cardNumber
  // but also have to find a way to decrement the card that lost it's chip
  cardChips[cardNumber] += 1;

  // increment/decrement counters
  if (increasing == 1) {
    pressCount++;
    currChip--;
  }
  else {
    pressCount--;
    currChip++;
  }

  // if out of range start decrementing/incrementing
  if (pressCount == 10) {
    pressCount -= 1;
    currChip = 0;
    increasing = 0;
  }
  else if (pressCount == -1) {
    pressCount += 1;
    currChip = 9;
    increasing = 1;

  }

}
