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
    },
};

var gClickDiff = {
    x: null,
    y: null
};

function getMemeOptions() {
    return gMemeOptions;
}

function setCanvas() {
    gElCanvas = document.getElementById('meme-canvas')
    gCtx = gElCanvas.getContext('2d');
}

function clearHighlight(){
    renderMeme(gCurrMeme, true);
}

function onDown(ev) {
    gIsDrag = true;
    const pos = getPos(ev);

    if (checkClickPos(ev) === 'top') {
        gClickDiff.x = pos.x - gTextPos.topTxtPos.xStart;
        gClickDiff.y = gTextPos.topTxtPos.yStart - pos.y;
        gMemeOptions.isTopLine = true;

    } else if (checkClickPos(ev) === 'bottom') {
        gClickDiff.x = pos.x - gTextPos.bottomTxtPos.xStart;
        gClickDiff.y = gTextPos.bottomTxtPos.yStart - pos.y;
        gMemeOptions.isTopLine = false;
    } else gIsDrag = false;

    renderMeme(gCurrMeme);
}

function setNewTxtPos(ev) {
    if (!gIsDrag) return;
    const pos = getPos(ev);

    if (gMemeOptions.isTopLine) {
        gTextPos.topTxtPos.xStart = pos.x - gClickDiff.x;
        gTextPos.topTxtPos.yStart = pos.y + gClickDiff.y;
    }
    else {
        gTextPos.bottomTxtPos.xStart = pos.x - gClickDiff.x;
        gTextPos.bottomTxtPos.yStart = pos.y + gClickDiff.y;
    }

    renderMeme(gCurrMeme);
}

function renderMeme(meme, isDownload = false) {
    var img = new Image();
    img.src = meme.url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        drawText(meme.txt);
        if(!isDownload) highlightText();
        else downloadMeme();
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

function highlightText() {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    if (gMemeOptions.isTopLine) {
        if(!gCurrMeme.txt.topLineTxt) return
        const txtWidth = gCtx.measureText(gCurrMeme.txt.topLineTxt).width; 
        gCtx.strokeRect(gTextPos.topTxtPos.xStart, gTextPos.topTxtPos.yEnd, txtWidth, gTextPos.topTxtPos.yStart - gTextPos.topTxtPos.yEnd + 20);
    } else {
        if(!gCurrMeme.txt.bottomLineTxt) return
        const txtWidth = gCtx.measureText(gCurrMeme.txt.bottomLineTxt).width; 
        gCtx.strokeRect(gTextPos.bottomTxtPos.xStart, gTextPos.bottomTxtPos.yEnd, txtWidth, gTextPos.bottomTxtPos.yStart - gTextPos.bottomTxtPos.yEnd + 20);
    }
}

function setTextOptions() {
    gCtx.font = `${gMemeOptions.fontSize}px ${gMemeOptions.font}`;
    gCtx.fillStyle = gMemeOptions.color;
    gCtx.strokeStyle = gMemeOptions.strokeColor;
}

function setTextColor(color) {
    gMemeOptions.color = color;
}

function setStrokeColor(color) {
    gMemeOptions.strokeColor = color;
}

function setFontSize(str) {
    const diff = (str === 'inc') ? 10 : -10;
    gMemeOptions.fontSize += diff;
}

function addLine() {
    gMemeOptions.isTopLine = false;
}

function switchLine() {
    gMemeOptions.isTopLine = !gMemeOptions.isTopLine;
}


function setTextAlignment(alignTo) {
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
}

function setFontFamily(font) {
    gMemeOptions.font = font;
}

function getTxtEndPos(area, txt) {
    const measure = gCtx.measureText(txt);
    const txtWidth = measure.width;
    let fontHeight = measure.fontBoundingBoxAscent + measure.fontBoundingBoxDescent;

    switch (area) {
        case 'top':
            gTextPos.topTxtPos['xEnd'] = gTextPos.topTxtPos.xStart + txtWidth;
            gTextPos.topTxtPos['yEnd'] = gTextPos.topTxtPos.yStart - fontHeight;
            break;
        case 'bottom':
            gTextPos.bottomTxtPos['xEnd'] = gTextPos.bottomTxtPos.xStart + txtWidth;
            gTextPos.bottomTxtPos['yEnd'] = gTextPos.bottomTxtPos.yStart - fontHeight;
    }
}


function checkClickPos(ev) {
    const pos = getPos(ev);
    if (pos.x >= gTextPos.topTxtPos.xStart &&
        pos.x <= gTextPos.topTxtPos.xEnd) {
        if (pos.y <= gTextPos.topTxtPos.yStart &&
            pos.y >= gTextPos.topTxtPos.yEnd) {
            return 'top';
        }
    }

    if (pos.x >= gTextPos.bottomTxtPos.xStart &&
        pos.x <= gTextPos.bottomTxtPos.xEnd) {
        if (pos.y <= gTextPos.bottomTxtPos.yStart &&
            pos.y >= gTextPos.bottomTxtPos.yEnd) {
            return 'bottom';
        }
    }

    return null;
}

function setCanvasSize(width) {
    gElCanvas.width = width;
    gElCanvas.height = width;
    setBottomTxtPos();
    renderMeme(gCurrMeme);
}

function setBottomTxtPos() {
    gTextPos.bottomTxtPos.yStart = gElCanvas.height - 50;
}

function getPos(ev) {
    let pos;
    const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

        pos = {
            x: ev.offsetX,
            y: ev.offsetY
        }
        if (gTouchEvs.includes(ev.type)) {
            ev.preventDefault()
            ev = ev.changedTouches[0]
            pos = {
                x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
                y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
            }
        }
    return pos;
}