//draw everything to canvas
function draw()
{
    settings.rectangle.drawPosition.lastWidth  = 0;
    settings.rectangle.drawPosition.lastHeight = 0;
    for( let i=1; i <= settings.game.areaWidth * settings.game.areaHeight; i++ )
    {
        ctx.beginPath();
        ctx.fillStyle = !(i % 2) ? "pink":"purple";
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
    gameInterval = setInterval(
        () => {
            clear();
            draw();

            if ( players.p1.score != MEMORY.scores.player1 )
            {
                elements.player1Score.innerHTML = players.p1.score;
                MEMORY.scores.player1 = players.p1.score;
            }
            else if (players.p2.score != MEMORY.scores.player2)
            {
                elements.player2Score.innerHTML = players.p2.score;
                MEMORY.scores.player2 = players.p2.score;
            }
        },
        1000 / settings.draw.fps
    );
}

//clear specific canvas
function clear()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function start()
{
    update();
}

function stop(_clear=true)
{
    clearInterval(gameInterval);
    if(_clear) clear();
    console.log("[?]-Game stopped.");
}

function getDistanceBetween( obj1, obj2 ){}

//@return: object
function findWhichRectangle(x,y){
    w = Math.ceil(x / settings.rectangle.rectWidth) - 1; //index of rect. w
    h = Math.ceil(y / settings.rectangle.rectHeight) - 1; //index of rect. h

    return { widthIndex : w, heightIndex : h }
}

//mark player's choice - XO
function mark(){}

//check move is valid
function isValid(){}

//put X or O to inside of rectangle
function putObject(){}

//initialize the game
function init()
{
    console.log("[?]-Game initializing.");
    //init board array
    for( let i=0; i < settings.game.areaHeight; i++ )
    {
        board.push([]);
        for( let j=0; j < settings.game.areaWidth; j++ )
            board[i].push([])
    }
    //determine who is X and O
    players.p1.object = ["X","O"][Math.floor(Math.random() * 2)];
    players.p2.object = ( players.p1.object == "X" ) ? "O" : "X";
    //invoke start() function
    start();
}