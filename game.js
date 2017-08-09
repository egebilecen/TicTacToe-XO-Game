const canvas = document.getElementById("canvas");
const ctx    = canvas.getContext("2d");
const settings = {
    draw : {
      fps : 60
    },
    game : {
        // Game board settings
        areaWidth  : 3,
        areaHeight : 3
    }
};
const scores = {
    player1 : 0,
    player2 : 0
};
settings["rectange"] = {
    rectWidth  : canvas.width / settings.game.areaWidth,
    rectHeight : canvas.height / settings.game.areaHeight,
    drawPosition : {
        lastWidth : 1,
        lastHeight : 1
    }
};