'use setrict'
var gCanvas;
var gCtx;
// to fill gmeme in a better place
var gMeme

function initCanvas() {
    gCanvas = document.querySelector('#img-canvas');
    gCtx = gCanvas.getContext('2d');
    gCanvas.width = 600;
    gCanvas.height = 300
    initGmeme()
}

function initGmeme() {
    gMeme = {
        selectedImgId: '',
        txts: [{
            line: '',
            size: 50,
            align: 'center',
            color: '#fff',
            posX: 50,
            posY: 50
        }, {
            line: '',
            size: 50,
            align: 'center',
            color: '#000',
            posX: 50,
        }]
    }
}



function convertImageToCanvas(id) {
    clearCtx()
    gMeme.selectedImgId = id
    var image = document.getElementById(`${id}`);
    gCanvas.width = image.naturalWidth;
    gCanvas.height = image.naturalHeight;
    gCtx.drawImage(image, 0, 0);
    // set the heigth of the text of the second input text
    gMeme.txts[1].posY = gCanvas.height - 50
}

// -------------------------------bar controller-------------------------
function onInputText(i) {
    // clearCtx()
    // if (gMeme.selectedImgId) convertImageToCanvas(gMeme.selectedImgId)
    
    inputText(+i)
}

function clearCtx() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function renderText() {
    // clear old text , render img + new text
    clearCtx()
    if (gMeme.selectedImgId) convertImageToCanvas(gMeme.selectedImgId)
    // TODO: fix the rendering text problem on input image
    else handleImageFromInput(gInputImgEv)
    var textItem = gMeme.txts
    // make sure  to render all existing texts 
    textItem.forEach(txtItem => {        
        gCtx.font = `${txtItem.size}px Arial`;
        //TODO: fix the stroke color inside
        gCtx.strokeStyle = txtItem.color;
        gCtx.strokeText(txtItem.line, txtItem.posX, txtItem.posY)
    });
}

function onTextColor(i, hexColor) {
    var color = hexColor.value
    gCtx.fillStyle = `${color}`;
    gMeme.txts[i].color = `${color}`;
    inputText(+i)
}

function onFontSizeChange(i, type) {
    if (type === '+') gMeme.txts[i].size = gMeme.txts[i].size + 5
    else gMeme.txts[i].size = gMeme.txts[i].size - 5
    inputText(+i)
}
// -----------------------canvas click funcs------------------
// function canvasClicked(ev) {
//     var clickedText = gCelebs.find((celeb) => {
//         return (
//             ev.offsetX > celeb.x &&
//             ev.offsetX < celeb.x + barWidth &&
//             ev.offsetY > celeb.y &&
//             ev.offsetY < celeb.y + (heightFactor*celeb.rate)
//         )
//     })
//     console.log(clickedText)
//     if(clickedText) openModal(ev,clickedText)
//     else closeModal()
// }


//TODO: funct to move text by x y pos
//TODO: funct to DELETE TEXT