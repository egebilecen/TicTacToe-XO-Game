document.body.addEventListener("mousedown",(e)=>{
    e.preventDefault();
});
document.body.addEventListener("click",(e)=>{
    e.preventDefault();
});
canvas.addEventListener("click",(e)=>{
    let pageMargin = 8;
    let posX = e.pageX - pageMargin;
    let posY = e.pageY - pageMargin;

    makeMove(posX,posY);
});