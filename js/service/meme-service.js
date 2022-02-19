var gId = 1;
var gMemes = [
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny', 'politics'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['cute', 'animal'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['cute', 'animal'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['tired', 'animal'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['success', 'baby'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny', 'man'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny', 'baby'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny', 'man'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny', 'baby'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny', 'politics'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny', 'sports'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny', 'man'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny', 'actors'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['matrix', 'actors'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny', 'actors'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny', 'actors'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny', 'politics'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny', 'toys'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
];

function getMemes() {
    return gMemes.slice();
}

function getFilteredMemes(filterBy){
    return gMemes.filter(meme => meme.keywords.includes(filterBy));
}

function getMemeById(id) {
    return gMemes.find(meme => meme.id === id);
}

function setMemeText(userText, currMeme, isTopLine) {
    if (isTopLine) currMeme.txt.topLineTxt = userText;
    else currMeme.txt.bottomLineTxt= userText;
}

function addSticker(sticker, currMeme, isTopLine){
    if(isTopLine) currMeme.txt.topLineTxt += sticker; 
    else currMeme.txt.bottomLineTxt += sticker; 

}

function removeLine(line, memeObj){
    const meme = gMemes.find(meme => memeObj.id === meme.id);
    if(line === 'top') meme.txt.topLineTxt = ''; 
    else meme.txt.bottomLineTxt = '';
}

function getKeywords(){
    const keywords = []; 

    gMemes.forEach((meme) => {
        meme.keywords.forEach((memeKey) => {
            if(!keywords.includes(memeKey)) keywords.push(memeKey);
        })
    })
    return keywords; 
}
