function onGalleryInit() {
    renderGallery();
}

function renderGallery(){
    const elGallery = document.querySelector('.meme-pics');
    const memes = getMemes(); 
    let strHTML = ''; 
    memes.forEach(meme => strHTML += `<img src="${meme.url}" onclick="onMemeInit(${meme.id})">`);

    elGallery.innerHTML = strHTML;
}
