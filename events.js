document.body.addEventListener("mousedown",(e)=>{
    e.preventDefault();
});
canvas.addEventListener("click",(e)=>{
    let pageMargin = 8;
    let posX = e.pageX - pageMargin;
    let posY = e.pageY - pageMargin;

    //console.log("x: "+posX+" / y: "+posY);
    let fRect = findWhichRectangle(posX,posY);
    if ( isValid(fRect.widthIndex,fRect.heightIndex) )
    {
        putObject(GAME.currentMove.object,fRect.widthIndex,fRect.heightIndex);
    }

});