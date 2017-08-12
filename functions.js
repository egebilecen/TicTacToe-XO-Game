//draw everything to canvas
function draw()
{
    let colorIndex = 1;
    settings.rectangle.drawPosition.lastHeight = 0;
    for( let h=0; h < board.length; h++ )
    {
        settings.rectangle.drawPosition.lastWidth  = 0;
        for( let w=0; w < board[h].length; w++ )
        {
            ctx.beginPath();
            ctx.fillStyle = !(colorIndex % 2) ? "pink":"purple";
            ctx.rect(
                settings.rectangle.drawPosition.lastWidth, //x
                settings.rectangle.drawPosition.lastHeight, //y
                settings.rectangle.rectWidth, //width
                settings.rectangle.rectHeight //height
            );
            ctx.fill();
            if ( board[h][w] !== undefined )
            {
                ctx.fillStyle = "white";
                ctx.font = "60px Arial";
                ctx.fillText(board[h][w],settings.rectangle.drawPosition.lastWidth+60,settings.rectangle.drawPosition.lastHeight+100);
            }
            ctx.closePath();
            settings.rectangle.drawPosition.lastWidth += settings.rectangle.rectWidth;
            colorIndex += 1;
        }
        settings.rectangle.drawPosition.lastHeight += settings.rectangle.rectHeight;
    }
}

//update things' pos. on canvas
function update()
{
    clear();
    draw();

    //set scores on html
    if ( players.p1.score !== MEMORY.scores.player1 )
    {
        elements.player1Score.innerHTML = players.p1.score;
        MEMORY.scores.player1 = players.p1.score;
    }
    else if (players.p2.score !== MEMORY.scores.player2)
    {
        elements.player2Score.innerHTML = players.p2.score;
        MEMORY.scores.player2 = players.p2.score;
    }

    //set current move's user
    if (elements.currentMove.innerHTML !== players["p"+GAME.currentMove].string+" - "+players["p"+GAME.currentMove].object)
        elements.currentMove.innerHTML = players["p"+GAME.currentMove].string+" - "+players["p"+GAME.currentMove].object
}

//clear specific canvas
function clear()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function start()
{
    gameInterval = setInterval(
        () => {
            update();
        },
        1000 / settings.draw.fps
    );
}

function stop(_clear=true)
{
    clearInterval(gameInterval);
    if(_clear) clear();
    elements.gameMsg.innerHTML = "Game stopped.";
    console.log("[?]-Game stopped.");
}

function makeMove(posX,posY)
{
    let fRect = findWhichRectangle(posX,posY);
    if ( isValid(fRect.widthIndex,fRect.heightIndex) )
    {
        putObject(players["p"+GAME.currentMove].object,fRect.widthIndex,fRect.heightIndex);
        elements.gameMsg.innerHTML = "-";

        if ( controlCurrentStatus() ) //if this player got point
            resetBoard();

        GAME.currentMove = (GAME.currentMove === 1) ? 2 : 1;
    }
    else
        elements.gameMsg.innerHTML = "Please make a valid move.";
}

function controlHorizontal()
{
    for( let h=0; h < settings.game.areaHeight; h++ )
    {
        let countX = 0; //count of X object
        let countO = 0; //count of O object
        for( let w=0; w < settings.game.areaWidth; w++ )
        {
            if( board[h][w] === "X" ) countX++;
            else if ( board[h][w] === "O" ) countO++;
        }
        if (countX >= 3) //increase score of player
        {
            ( players.p1.object === "X") ? players.p1.score++ : players.p2.score++;
            elements.gameMsg.innerHTML = ( players.p1.object === "X") ? "Player 1 won!" : "Player 2 won!";
            return true;
        }
        else if(countO >= 3)
        {
            ( players.p1.object === "O") ? players.p1.score++ : players.p2.score++;
            elements.gameMsg.innerHTML = ( players.p1.object === "O") ? "Player 1 won!" : "Player 2 won!";
            return true;
        }
    }
    return false;
}

function controlVertical()
{
    for( let w=0; w < settings.game.areaWidth; w++ )
    {
        let countX = 0;
        let countO = 0;
        for( let h=0; h < settings.game.areaHeight; h++ )
        {
            if( board[h][w] === "X" ) countX++;
            else if ( board[h][w] === "O" ) countO++;
        }
        if (countX >= 3) //increase score of player
        {
            ( players.p1.object === "X") ? players.p1.score++ : players.p2.score++;
            elements.gameMsg.innerHTML = ( players.p1.object === "X") ? "Player 1 won!" : "Player 2 won!";
            return true;
        }
        else if(countO >= 3)
        {
            ( players.p1.object === "O") ? players.p1.score++ : players.p2.score++;
            elements.gameMsg.innerHTML = ( players.p1.object === "X") ? "Player 1 won!" : "Player 2 won!";
            return true;
        }
    }
    return false;
}

function controlCurrentStatus()
{
    if(controlHorizontal())
        return true;
    else
    if(controlVertical())
        return true;
    else
        return false;
}

function createBoard() //create board based on game settings
{
    board = [];
    for( let i=0; i < settings.game.areaHeight; i++ )
    {
        board.push([]);
        for( let j=0; j < settings.game.areaWidth; j++ )
            board[i].push([])
    }
    console.log("[?]-Board has been created.");
}

function resetBoard()
{
    console.log("[?]-Board has been reset.");
    createBoard();
}

//@return: object
function findWhichRectangle(x,y){
    w = Math.ceil(x / settings.rectangle.rectWidth) - 1; //index of rect. w
    h = Math.ceil(y / settings.rectangle.rectHeight) - 1; //index of rect. h

    return { widthIndex : w, heightIndex : h }
}

//check move is valid
function isValid( widthIndex, heightIndex )
{
    return board[heightIndex][widthIndex].length === 0;
}

//put X or O to inside of rectangle
function putObject(obj,widthIndex,heightIndex)
{
    board[heightIndex][widthIndex] = obj;
}

//initialize the game
function init()
{
    console.log("[?]-Game initializing.");
    //init board array
    createBoard();
    //determine who is X and O
    players.p1.object = ["X","O"][Math.floor(Math.random() * 2)];
    players.p2.object = ( players.p1.object === "X" ) ? "O" : "X";
    //invoke start() function
    start();
}