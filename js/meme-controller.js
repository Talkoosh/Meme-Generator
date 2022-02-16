var gElCanvas;
var gCtx;

function init() {
    gElCanvas = document.getElementById('meme-canvas')
    gCtx = gElCanvas.getContext('2d');
    renderMeme();
}

function renderMeme() {
    var img = new Image();
    const meme = getMeme(1)
    img.src = meme.url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(meme.text);
    }
}

function drawText(txt = 'When x y z') {
    gCtx.font = '48px serif';
    gCtx.fillText(txt, 10, 50);
}

function onSetMemeText(elInput) {
    setMemeText(elInput.value, 1); 
    renderMeme();
}