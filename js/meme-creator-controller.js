var gCurrMeme;

function onMemeInit(memeId) {
    document.querySelector('.meme-gallery').style.display = 'none';
    document.querySelector('.meme-creator-container').style.display = 'block';

    setCanvas();

    gCurrMeme = getMemeById(memeId);
    resizeCanvas();
    addListeners();

    renderMeme(gCurrMeme);

    window.addEventListener('resize', () => resizeCanvas());
}

function addListeners() {
    gElCanvas.addEventListener('mousedown', onDown);
    gElCanvas.addEventListener('mouseup', () => gIsDrag = false);
    gElCanvas.addEventListener('mousemove', setNewTxtPos);
}


function onSetMemeText(elInput) {
    setMemeText(elInput.value, gCurrMeme, getMemeOptions().isTopLine);
    renderMeme(gCurrMeme);
}

function onSetTextColor(elColorInput) {
    setTextColor(elColorInput.value);
    renderMeme(gCurrMeme);
}

function onSetStrokeColor(elStrokeColorInput) {
    setStrokeColor(elStrokeColorInput.value);
    renderMeme(gCurrMeme);
}

function onSetFontSize(str) {
    setFontSize(str);
    renderMeme(gCurrMeme)
}

function onSwitchLine() {
    switchLine();
    renderMeme(gCurrMeme);
}

function onAddLine() {
    addLine();
    renderMeme(gCurrMeme);
}

function onRemoveLine() {
    const line = (getMemeOptions().isTopLine) ? 'top' : 'bottom';
    removeLine(line, gCurrMeme);
    renderMeme(gCurrMeme);
}

function onSetTextAlignment(alignTo) {
    setTextAlignment(alignTo);
    renderMeme(gCurrMeme);
}

function onFontFamilyChange() {
    const font = document.querySelector('.font-family-select').value;
    setFontFamily(font);
    renderMeme(gCurrMeme)
}

function onAddSticker(elSticker){
    const isTopLine = getMemeOptions().isTopLine; 
    addSticker(elSticker.innerText, gCurrMeme, isTopLine);
    renderMeme(gCurrMeme)
}

function onShareMeme() {
    uploadImg();
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    setCanvasSize(elContainer.offsetWidth)
}