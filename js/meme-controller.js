var gElCanvas;
var gCtx;
var gCurrMeme; 
var gMemeOptions = {
    color: '#00000',
    fontSize: 50,
    isTopLine: true
} 
onMemeInit()
function onMemeInit() {
    // document.querySelector('.meme-gallery').style.display = 'none';
    // document.querySelector('.meme-creator').style.display = 'block';

    gElCanvas = document.getElementById('meme-canvas')
    gCtx = gElCanvas.getContext('2d');
    gCurrMeme = getMemeById(1); 
    renderMeme(1); 
}

function renderMeme(memeId) {
    var img = new Image();
    const meme = getMemeById(memeId);
    img.src = meme.url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(meme.txt);
    }
}

function drawText(txt) {
    gCtx.font = `${gMemeOptions.fontSize}px serif`;
    gCtx.fillStyle = gMemeOptions.color;

    gCtx.fillText(txt.topLineTxt, 10, 50);
    gCtx.fillText(txt.bottomLineTxt, 10, 550)
}

function onSetMemeText(elInput) {
    setMemeText(elInput.value, gCurrMeme.id, gMemeOptions.isTopLine); 
    renderMeme(gCurrMeme.id);
}

function onSetTextColor(elColorInput){
    gMemeOptions.color = elColorInput.value; 
    renderMeme(gCurrMeme.id);
}

function onSetFontSize(str){
    const diff = (str === 'inc') ? 10 : -10; 
    gMemeOptions.fontSize += diff;
     
    renderMeme(gCurrMeme.id)
}

function onSwitchLine(){
    gMemeOptions.isTopLine = !gMemeOptions.isTopLine;
}