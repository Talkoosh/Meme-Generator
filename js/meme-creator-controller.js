var gElCanvas;
var gCtx;
var gCurrMeme;
var gIsDrag = false;

var gMemeOptions = {
    color: '#FFFF',
    strokeColor: '#0000',
    font: 'impact',
    fontSize: 50,
    isTopLine: true,
    alignment: 'left'
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
 
var gClickDiff = { 
    x: null,
    y: null
};

function onMemeInit(memeId) {
    document.querySelector('.meme-gallery').style.display = 'none';
    document.querySelector('.meme-creator-container').style.display = 'block';

    gElCanvas = document.getElementById('meme-canvas')
    gCtx = gElCanvas.getContext('2d');
    gCurrMeme = getMemeById(memeId);
    resizeCanvas();
    addMouseListeners();

    renderMeme(gCurrMeme);

    window.addEventListener('resize', () =>{
        resizeCanvas();
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', (ev) => {
        gIsDrag = true;
        if (checkClickPos(ev) === 'top') {
            gClickDiff.x = ev.offsetX - gTextPos.topTxtPos.xStart;
            gClickDiff.y = gTextPos.topTxtPos.yStart - ev.offsetY;
            gMemeOptions.isTopLine = true; 
            
        } else if (checkClickPos(ev) === 'bottom'){
            gClickDiff.x = ev.offsetX - gTextPos.bottomTxtPos.xStart;
            gClickDiff.y = gTextPos.bottomTxtPos.yStart - ev.offsetY
            gMemeOptions.isTopLine = false;
        } 
    });
    gElCanvas.addEventListener('mouseup', () => gIsDrag = false);
    gElCanvas.addEventListener('mousemove', setNewTxtPos);
}

function setNewTxtPos(ev){
    if(!gIsDrag) return; 
    if(gMemeOptions.isTopLine){
        gTextPos.topTxtPos.xStart = ev.offsetX - gClickDiff.x; 
        gTextPos.topTxtPos.yStart = ev.offsetY + gClickDiff.y; 
    }
    else{
        gTextPos.bottomTxtPos.xStart = ev.offsetX - gClickDiff.x; 
        gTextPos.bottomTxtPos.yStart = ev.offsetY + gClickDiff.y; 
    }
    renderMeme(gCurrMeme);
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
    setTextOptions();

    gCtx.fillText(txt.topLineTxt, gTextPos.topTxtPos.xStart, gTextPos.topTxtPos.yStart);
    getTxtEndPos('top', txt.topLineTxt);
    gCtx.fillText(txt.bottomLineTxt, gTextPos.bottomTxtPos.xStart, gTextPos.bottomTxtPos.yStart);
    getTxtEndPos('bottom', txt.bottomLineTxt);

    gCtx.strokeText(txt.topLineTxt, gTextPos.topTxtPos.xStart, gTextPos.topTxtPos.yStart);
    gCtx.strokeText(txt.bottomLineTxt, gTextPos.bottomTxtPos.xStart, gTextPos.bottomTxtPos.yStart);
}

function setTextOptions() {
    gCtx.font = `${gMemeOptions.fontSize}px ${gMemeOptions.font}`;
    gCtx.fillStyle = gMemeOptions.color;
    gCtx.strokeStyle = gMemeOptions.strokeColor;
}

function getTxtEndPos(area, txt) {
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

function onSetStrokeColor(elStrokeColorInput) {
    gMemeOptions.strokeColor = elStrokeColorInput.value;
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
    gMemeOptions.alignment = alignTo;
    alignText();
}

function alignText() {
    const topTxtWidth = gCtx.measureText(gCurrMeme.txt.topLineTxt).width;
    const bottomTxtWidth = gCtx.measureText(gCurrMeme.txt.bottomLineTxt).width;

    if (gMemeOptions.alignment === 'left') {
        gTextPos.topTxtPos.xStart = 10;
        gTextPos.bottomTxtPos.xStart = 10;
    } else if (gMemeOptions.alignment === 'right') {
        gTextPos.topTxtPos.xStart = gElCanvas.width - topTxtWidth - 10;
        gTextPos.bottomTxtPos.xStart = gElCanvas.width - bottomTxtWidth - 10;
    } else {
        gTextPos.topTxtPos.xStart = (gElCanvas.width / 2) - (topTxtWidth / 2)
        gTextPos.bottomTxtPos.xStart = (gElCanvas.width / 2) - (bottomTxtWidth / 2)

    }
    renderMeme(gCurrMeme);
}

function onFontFamilyChange(elSelect) {
    gMemeOptions.font = elSelect.value;
    renderMeme(gCurrMeme)
}

function onDownloadMeme(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.download = 'my-meme.jpg';
    elLink.href = data;
}

function onShareMeme() {
    uploadImg();
}

function checkClickPos(ev) {
    if (ev.offsetX >= gTextPos.topTxtPos.xStart &&
        ev.offsetX <= gTextPos.topTxtPos.xEnd) {
        if (ev.offsetY <= gTextPos.topTxtPos.yStart &&
            ev.offsetY >= gTextPos.topTxtPos.yEnd) {
            return 'top';
        }
    }

    if (ev.offsetX >= gTextPos.bottomTxtPos.xStart &&
        ev.offsetX <= gTextPos.bottomTxtPos.xEnd) {
        if (ev.offsetY <= gTextPos.bottomTxtPos.yStart &&
            ev.offsetY >= gTextPos.bottomTxtPos.yEnd) {
            return 'bottom';
        }
    }

    return null;
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = gElCanvas.width;
    renderMeme(gCurrMeme);
   }