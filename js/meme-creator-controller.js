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
    gElCanvas.addEventListener('touchstart', onDown);
    gElCanvas.addEventListener('mouseup', () => gIsDrag = false);
    gElCanvas.addEventListener('touchend', () => gIsDrag = false)
    gElCanvas.addEventListener('mousemove', setNewTxtPos);
    gElCanvas.addEventListener('touchmove', setNewTxtPos);
}

function onSetMemeText(elInput) {
    setMemeText(elInput.value, gCurrMeme, gMemeOptions.isTopLine);
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
}

function onAddLine() {
    addLine();
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

function onFontFamilyChange(elSelect) {
    setFontFamily(elSelect.value);
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