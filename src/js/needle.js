// create window height variable
const windowWidth = document.body.clientWidth;
const windowHeight = window.innerHeight;


//create Application Window
let app = new PIXI.Application({
    backgroundColor: 0x323031,
    width: windowWidth,
    height: windowHeight
  });
  
  // append the application window to the page
    document.body.appendChild(app.view);