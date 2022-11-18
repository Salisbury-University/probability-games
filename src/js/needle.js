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

    const line = new PIXI.Graphics();
    
    let lineSpace = windowHeight / 10;
    let yValue = lineSpace;
    for(let i = 0; i < 10; i++)
    {
      line.beginFill(0xDE3249);
      line.drawRect(0, yValue, windowWidth, 2);
      line.endFill();
      app.stage.addChild(line);
      yValue = yValue + lineSpace;
    }

    function needleCenter()
    {
      const dots = new PIXI.Graphics()
      let x = 0;
      let y = 0;
      for(let j =0; j < 10; j++)
      {
        x = Math.floor(Math.random() * windowWidth);
        y = Math.floor(Math.random() * windowHeight);
        dots.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
        dots.beginFill(0xAA4F08, 2);
        dots.drawCircle(x, y, 2);
        dots.endFill();
        app.stage.addChild(dots);

      }

    }