const canvas = document.getElementById("canvas");
const ctx    = canvas.getContext("2d");
const settings = {
    draw : {
      fps : 60
    },
    game : {
        // Game board settings
        areaWidth  : 3, //be sure making both of them equal
        areaHeight : 3
    }
};
const board = []; //will be edited in init() function.
// rectangle's settings
settings["rectangle"] = {
    rectWidth  : canvas.width / settings.game.areaWidth,
    rectHeight : canvas.height / settings.game.areaHeight,
    drawPosition : {
        lastWidth : null, //will be edited in draw() function.
        lastHeight : null
    }
};
const elements = {
  player1Score : document.getElementById("p1-score"),
  player2Score : document.getElementById("p2-score"),
  currentMove  : document.getElementById("move-ind")
};
const players = {
    p1 : {
        string : "Player 1",
        score : 0,
        object : null //X or O
    },
    p2 : {
        string : "Player 2",
        score : 0,
        object : null //X or O
    }
};
const GAME = {
    currentMove : players.p1
};
const MEMORY = {
    scores : {
        player1 : players.p1.score,
        player2 : players.p2.score
    }
};