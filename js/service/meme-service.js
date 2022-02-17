var gId = 1;
var gMemes = [
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny, politics'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny, politics'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny, politics'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny, politics'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny, politics'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny, politics'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny, politics'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny, politics'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny, politics'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny, politics'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny, politics'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny, politics'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny, politics'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny, politics'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny, politics'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny, politics'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny, politics'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `./images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny, politics'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
];

function getMemes() {
    return gMemes.slice();
}

function getMemeById(id) {
    return gMemes.find(meme => meme.id === id);
}

function setMemeText(userText, currMeme, isTopLine) {
    if (isTopLine) currMeme.txt.topLineTxt = userText;
    else currMeme.txt.bottomLineTxt= userText;
}

function removeLine(line, memeObj){
    const meme = gMemes.find(meme => memeObj.id === meme.id);
    if(line === 'top') meme.txt.topLineTxt = ''; 
    else meme.txt.bottomLineTxt = '';
}