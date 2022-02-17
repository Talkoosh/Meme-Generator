var gFilterBy;

function onGalleryInit() {
    document.querySelector('.meme-gallery').style.display = 'block';
    document.querySelector('.meme-creator-container').style.display = 'none';

    renderGallery();
}

function renderGallery(){
    const elGallery = document.querySelector('.meme-pics');
    const memes = (gFilterBy) ?  getFilteredMemes(gFilterBy) :  getMemes();
    // const memes = getMemes();
    let strHTML = ''; 
    memes.forEach(meme => strHTML += `<img src="${meme.url}" onclick="onMemeInit(${meme.id})">`);

    elGallery.innerHTML = strHTML;
}

function onSetFilter(elSearch){
    gFilterBy = elSearch.value;
    renderGallery();
}