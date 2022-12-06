// create window height variable
const windowWidth = document.body.clientWidth;
const windowHeight = window.innerHeight;
const needleLength = 70;

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
    console.log(lineSpace);
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
      const dots = new PIXI.Graphics();
      let x = 0;
      let y = 0;
      for(let j =0; j < 10; j++)
      {
        x = Math.floor(Math.random() * windowWidth);
        y = Math.floor(Math.random() * windowHeight);
        dots.beginFill(0xAA4F08);
        dots.drawRect(x, y, 35, 2);
        dots.endFill();
        app.stage.addChild(dots);
        dots.beginFill(0xAA4F08);
        dots.drawRect(x - 35, y, 35, 2);
        dots.endFill();
        app.stage.addChild(dots);

      }

    }
    function toRadians(angle)
    {
      return angle * (Math.PI / 180);
    }
    function needleXY()
    {
      
      let xCenter, yCenter;
      let topX, topY, botX, botY;
      let x, y;
      for(let j = 0; j < 10; j++)
      {
        xCenter = Math.floor(Math.random() * windowWidth);
        yCenter = Math.floor(Math.random() * windowHeight);

        //create dots here
        /*line.beginFill(0xAA4F08, 2);
        line.drawRect(x, y, 2, 2);
        line.endFill();
        app.stage.addChild(line);*/

        //calculate the angle
        let angle = Math.floor(Math.random() * 360);
        angle = toRadians(angle);


        //creating angle/line
        y = (needleLength/2) * (Math.sin(angle));
        x = (needleLength/2) * (Math.cos(angle));
        if(angle > (Math.PI / 2)){
          topX = xCenter - x;
          topY = yCenter + y;
          botX = xCenter + x;
          botY = yCenter - y;
        }
        else{
          topX = xCenter + x;
          topY = yCenter + y;
          botX = xCenter - x;
          botY = yCenter - y;

        }
        line.beginFill(0xAA4F08, 2);
        line.lineStyle(4, 0xffd900, 1);
        line.moveTo(xCenter, yCenter);
        line.lineTo(topX, topY);
        line.closePath();
        line.endFill();
        app.stage.addChild(line);
        line.beginFill(0xAA4F08, 2);
        line.moveTo(xCenter, yCenter);
        line.lineTo(botX, botY);
        line.closePath();
        line.endFill();
        app.stage.addChild(line);

      } 


    }
