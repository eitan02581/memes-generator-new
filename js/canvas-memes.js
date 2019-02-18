'use setrict'
var gCanvas;
var gCtx;
var gMeme
var gSelectedTextItem
var gTxtItemIdx
// indicate mouse's place
var gStartX
var gStartY
var gFirstImage





function initCanvas() {
    gCanvas = document.querySelector('#img-canvas');
    gCtx = gCanvas.getContext('2d');
    gCanvas.width = 500;
    gCanvas.height = 500;
    initEditor()

}

function initEditor() {
    gTxtItemIdx = 0;
    gFirstImage = true
    initGmeme();
    gSelectedTextItem = gMeme.txts[0];
    setDeviceEvents();
    renderFontSelect();
    // TODO: THINK ABOUT A BETTER OPTION TO RENDER THE SECOND LINE HEIGHT
    setTimeout(() => {
        onAlignText('center')
    }, 200);
    setTimeout(() => {
        setBottomTextMeasure()
    }, 1000);
}

function initGmeme() {
    gMeme = {
        selectedImgId: '',
        txts: [{
            isDraggable: false,
            line: '',
            font: 'Impact',
            size: 50,
            align: 'center',
            color: '#fff',
            posX: 50,
            posY: 50,
        }, {
            isDraggable: false,
            line: '',
            font: 'Impact',
            size: 50,
            align: '',
            color: '#fff',
            posX: 50
        }]
    }
}

function convertImageToCanvas(id) {
    clearCtx();
    gMeme.selectedImgId = id;
    var image = document.getElementById(`${id}`);
    if (gFirstImage) {
        setBestAspectSize(image)
    }
    gCtx.drawImage(image, 0, 0, gCanvas.width, gCanvas.height);
}


// -------------------------------bar controller-------------------------
function onInputText() {
    inputText()
}

function clearCtx() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function renderText() {
    // clear old text , render img + new text
    clearCtx()
    if (gMeme.selectedImgId) convertImageToCanvas(gMeme.selectedImgId)
    else gCtx.drawImage(gUploadedImg, 0, 0);
    // render all existing texts 
    var textItem = gMeme.txts
    textItem.forEach((txtItem, i) => {
        gCtx.font = `${txtItem.size}px ${txtItem.font}`;
        gCtx.fillStyle = txtItem.color
        gCtx.fillText(txtItem.line, txtItem.posX, txtItem.posY);
        gCtx.strokeStyle = 'black';
        gCtx.lineWidth = 1
        gCtx.strokeText(txtItem.line, txtItem.posX, txtItem.posY);
    });
}

function renderFontSelect() {
    var strHTML = '';
    for (let i = 0; i < gFonts.length; i++) {
        strHTML += `<option value="${gFonts[i]}">${gFonts[i]}</option>`
    }
    document.querySelector('.select-font').innerHTML = strHTML;
}

function onTextColor(hexColor) {
    var color = hexColor.value;
    gCtx.fillStyle = `${color}`;
    gSelectedTextItem.color = `${color}`;
    renderText();
}

function onFontSizeChange(type) {
    if (type === '+') gSelectedTextItem.size = gSelectedTextItem.size + 5;
    else gSelectedTextItem.size = gSelectedTextItem.size - 5;
    renderText();
}

function onAlignText(direction) {
    gSelectedTextItem.align = direction
    switch (direction) {
        case 'left':
            gSelectedTextItem.posX = 0;
            break;
        case 'center':
            gSelectedTextItem.posX = (gCanvas.width / 2) - (gCtx.measureText(gSelectedTextItem.line).width / 2);
            break;
        case 'right':
            gSelectedTextItem.posX = gCanvas.width - gCtx.measureText(gSelectedTextItem.line).width;
            break;
    }
}

function onFontSelect(el) {
    var font = el.value;
    gSelectedTextItem.font = font
}

function onSaveImage(elLink) {
    downloadImg(elLink)
}

function onEraseText(elText) {
    eraseText(elText);
}









// ----------------------- on line adding ------------------------

function onAddLine() {
    gTxtItemIdx++
    if (gTxtItemIdx > 1) gMeme.txts.push(createTxtObj());
    gSelectedTextItem = gMeme.txts[gTxtItemIdx]
    initNewTextItem()
    // clean the input field on new line
    document.querySelector('.text-input').value = '';
    renderText()
}

function initNewTextItem() {
    gSelectedTextItem.line = 'New Line'
    onAlignText('center')
}