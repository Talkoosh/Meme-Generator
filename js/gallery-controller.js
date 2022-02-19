var gFilterBy;

function onGalleryInit() {
    document.querySelector('.meme-gallery').style.display = 'block';
    document.querySelector('.meme-creator-container').style.display = 'none';
    gFilterBy = ''; 
    renderKeywords(); 
    renderGallery();
}

function renderGallery(){
    const elGallery = document.querySelector('.meme-pics');
    const memes = (gFilterBy) ?  getFilteredMemes(gFilterBy) :  getMemes();
    let strHTML = ''; 

    memes.forEach(meme => strHTML += `<img src="${meme.url}" onclick="onMemeInit(${meme.id})">`);

    elGallery.innerHTML = strHTML;
}

function onSetFilter(elSearch){
    gFilterBy = elSearch.value;
    renderGallery();
}

function keywordClicked(keyword, elBtn){
    gFilterBy = keyword; 
    renderGallery();
}

function onMenuBtnClick(){
    document.querySelector('body').classList.add('menu-open');
}

function onCloseMenu(){
    document.querySelector('body').classList.remove('menu-open');
}

function renderKeywords(){
    const keywords = getKeywords();
    const elKeywords = document.querySelector('.filter-words'); 
    let strHTML = '';

    for(var i = 0; i < 4; i++){
        strHTML += `<button onclick="keywordClicked('${keywords[i]}', this)">${keywords[i]}</button>`
    }
    elKeywords.innerHTML = strHTML;
}

function onMoreClick(){
    const keywords = getKeywords();
    const elKeywords = document.querySelector('.filter-words'); 
    let strHTML = '';

    keywords.forEach(keyword => strHTML += `<button onclick="keywordClicked('${keyword}', this)">${keyword}</button>`);
    
    elKeywords.innerHTML = strHTML;
}