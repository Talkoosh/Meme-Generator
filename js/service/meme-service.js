var gId = 1;
var gMemes = [
    {
        url: `/images/${gId}.jpg`,
        id: gId++,
        keywords: ['funny, politics'],
        text: ''
    }, 
];


function getMeme(id){
    return gMemes.find(img => img.id === id); 
}

function setMemeText(userText, id){
    const img = getMeme(id); 
    img.text = userText;
}