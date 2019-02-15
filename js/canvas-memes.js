'use setrict'
var gCanvas;
var gCtx;
// to fill gmeme in a better place
var gMeme = {
    selectedImgId: '',
    txts: [{
        line: '',
        size: 20,
        align: 'center',
        color: 'white'
    },{
        line: '',
        size: 20,
        align: 'center',
        color: 'white'
    }]
}

function initCanvas() {
    gCanvas = document.querySelector('#img-canvas');
    gCtx = gCanvas.getContext('2d');
    gCanvas.width = 600;
    gCanvas.height = 300;
}

function convertImageToCanvas(id) {
    clearCtx();
    gMeme.selectedImgId = id;

    var image = document.getElementById(`${id}`);
    gCanvas.width = image.naturalWidth;
    gCanvas.height = image.naturalHeight;
    gCtx.drawImage(image, 0, 0);
}

function onInputText() {
    clearCtx();
    if (gMeme.selectedImgId) convertImageToCanvas(gMeme.selectedImgId);
    inputText();
}

function clearCtx() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function renderText(lineText) {
    gCtx.font = "70px Arial";
    gCtx.fillStyle = gMeme.color;
    gCtx.fillText(lineText, 50, 50);
}

function onTextColor(hexColor) {
    var color = hexColor.value;
    gCtx.fillStyle = `${color}`;
    gMeme.color = `${color}`;
    inputText();
}