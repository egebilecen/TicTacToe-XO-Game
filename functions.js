//draw everything to canvas
function draw()
{
    settings.rectangle.drawPosition.lastWidth  = 1;
    settings.rectangle.drawPosition.lastHeight = 1;
    for( let i=1; i <= settings.game.areaWidth * settings.game.areaHeight; i++ )
    {
        ctx.beginPath();
        ctx.fillStyle = !(i % 2) ? "purple":"orange";
        ctx.rect(
            settings.rectangle.drawPosition.lastWidth, //x
            settings.rectangle.drawPosition.lastHeight, //y
            settings.rectangle.rectWidth, //width
            settings.rectangle.rectHeight //height
        );
        ctx.fill();
        ctx.closePath();
        settings.rectangle.drawPosition.lastWidth = !(i % settings.game.areaWidth) ? 0 : settings.rectangle.drawPosition.lastWidth + settings.rectangle.rectWidth;
        if( !(i % settings.game.areaHeight) )
            settings.rectangle.drawPosition.lastHeight += settings.rectangle.rectHeight;
    }
}

//update things' pos. on canvas
function update()
{
    setInterval(
        () => {
            clear();
            draw();
        },
        1000 / settings.draw.fps
    );
}

//clear specific canvas
function clear()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

//mark player's choice - XO
function mark(){}

//check move is valid
function isValid(){}

//initialize the game
function init()
{
    update();
}