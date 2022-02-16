var gId = 1;
var gMemes = [
    {
        url: `/images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny, politics'],
        txt: {
            topLineTxt: '',
            bottomLineTxt: ''
        }
    },
    {
        url: `/images/${gId}.jpg`,
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
    return gMemes.find(img => img.id === id);
}

function setMemeText(userText, id, isTopLine) {
    const img = getMemeById(id);
    if (isTopLine) img.txt.topLineTxt = userText;
    else img.txt.bottomLineTxt= userText;
}