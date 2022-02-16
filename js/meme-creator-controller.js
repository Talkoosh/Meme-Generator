var gElCanvas;
var gCtx;
var gCurrMeme;
var gIsDrag = false;
var gMemeOptions = {
    color: '#00000',
    font: 'impact',
    fontSize: 50,
    isTopLine: true,
};
var gTextPos = {
    topTxtPos: {
        xStart: 10,
        yStart: 50
    },
    bottomTxtPos: {
        xStart: 10,
        yStart: 550
    }
}

function onMemeInit(memeId) {
    document.querySelector('.meme-gallery').style.display = 'none';
    document.querySelector('.meme-creator-container').style.display = 'block';

    gElCanvas = document.getElementById('meme-canvas')
    gCtx = gElCanvas.getContext('2d');
    gCurrMeme = getMemeById(memeId);
    addMouseListeners();
    renderMeme(gCurrMeme);
}

function addMouseListeners() {
    // gElCanvas.addEventListener('mousedown', () => gIsDrag = true);
    // gElCanvas.addEventListener('mouseup', () => gIsDrag = false);
    // gElCanvas.addEventListener('mousemove', checkClickPos);

}

function renderMeme(meme) {
    var img = new Image();
    img.src = meme.url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(meme.txt);
    }
}

function drawText(txt) {
    gCtx.font = `${gMemeOptions.fontSize}px ${gMemeOptions.font}`;
    gCtx.fillStyle = gMemeOptions.color;

    gCtx.fillText(txt.topLineTxt, gTextPos.topTxtPos.xStart, gTextPos.topTxtPos.yStart);
    setTextPos('top', txt.topLineTxt);
    gCtx.fillText(txt.bottomLineTxt, gTextPos.bottomTxtPos.xStart, gTextPos.bottomTxtPos.yStart);
    setTextPos('bottom', txt.bottomLineTxt);

}

function setTextPos(area, txt) {
    const measure = gCtx.measureText(txt);
    const txtWidth = measure.width;
    let fontHeight = measure.fontBoundingBoxAscent + measure.fontBoundingBoxDescent;

    switch (area) {
        case 'top':
            gTextPos.topTxtPos['xEnd'] = gTextPos.topTxtPos.xStart + txtWidth;
            gTextPos.topTxtPos['yEnd'] = gTextPos.topTxtPos.yStart - fontHeight
            break;
        case 'bottom':
            gTextPos.bottomTxtPos['xEnd'] = gTextPos.bottomTxtPos.xStart + txtWidth;
            gTextPos.bottomTxtPos['yEnd'] = gTextPos.bottomTxtPos.yStart - fontHeight;
    }
}

function onSetMemeText(elInput) {
    setMemeText(elInput.value, gCurrMeme, gMemeOptions.isTopLine);
    renderMeme(gCurrMeme);
}

function onSetTextColor(elColorInput) {
    gMemeOptions.color = elColorInput.value;
    renderMeme(gCurrMeme);
}

function onSetFontSize(str) {
    const diff = (str === 'inc') ? 10 : -10;
    gMemeOptions.fontSize += diff;

    renderMeme(gCurrMeme)
}

function onSwitchLine() {
    gMemeOptions.isTopLine = !gMemeOptions.isTopLine;
}

function onAddLine() {
    gMemeOptions.isTopLine = false;
}

function onRemoveLine() {
    const line = (gMemeOptions.isTopLine) ? 'top' : 'bottom';
    removeLine(line, gCurrMeme);
    renderMeme(gCurrMeme);

}

function onSetTextAlignment(alignTo) {
    if (alignTo === 'right') {
        gTextPos.topTxtPos.xStart = 10;
        gTextPos.bottomTxtPos.xStart = 10;
    } else if (alignTo === 'left') {
        gTextPos.topTxtPos.xStart = gElCanvas.width - 10;
        gTextPos.bottomTxtPos.xStart = gElCanvas.width - 10;
    } else {
        gTextPos.topTxtPos.xStart = gElCanvas.width / 2;
        gTextPos.bottomTxtPos.xStart = gElCanvas.width / 2;
    }
    renderMeme(gCurrMeme);
}

// function checkClickPos(ev) {
//     if(!gIsDrag) return;

//     if(ev.offsetX >= gTextPos.topTxtPos.xStart &&
//         ev.offsetX <= gTextPos.topTxtPos.xEnd){
//             if(ev.offsetY <= gTextPos.topTxtPos.yStart &&
//                 ev.offsetY >= gTextPos.topTxtPos.yEnd){
//                     gTextPos.topTxtPos.xStart = ev.offsetX;
//                     gTextPos.topTxtPos.yStart = ev.offsetY;
//                     gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
//                     drawText(gCurrMeme.txt.topLineTxt)
//                 }
//         }

//     if(ev.offsetX >= gTextPos.bottomTxtPos.xStart &&
//         ev.offsetX <= gTextPos.bottomTxtPos.xEnd){
//             if(ev.offsetY <= gTextPos.bottomTxtPos.yStart &&
//                 ev.offsetY >= gTextPos.bottomTxtPos.yEnd){

//                 }
//         }
// }