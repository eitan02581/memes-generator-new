'use setrict'
var gCanvas;
var gCtx;
var gMeme
var gSelectedTextItem
var gTxtItemIdx
// indicate mouse's place
var gStartX
var gStartY



function initCanvas() {
    gCanvas = document.querySelector('#img-canvas');
    gCtx = gCanvas.getContext('2d');
    gCanvas.width = 600;
    gCanvas.height = 300
    gTxtItemIdx = 0
    initGmeme()
    gSelectedTextItem = gMeme.txts[0]
    setEvents()
    // TODO: THINK ABOUT A BETTER OPTION TO RENDER THE SECOND LINE HEIGHT
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
            font: 'Ariel',
            size: 50,
            align: '',
            color: '#fff',
            posX: 50,
            posY: 50,
        }, {
            isDraggable: false,
            line: '',
            font: 'Ariel',
            size: 50,
            align: '',
            color: '#000',
            posX: 50
        }]
    }
}



function convertImageToCanvas(id) {
    clearCtx();
    gMeme.selectedImgId = id;
    var image = document.getElementById(`${id}`);
    gCanvas.width = image.naturalWidth;
    gCanvas.height = image.naturalHeight;
    gCtx.drawImage(image, 0, 0);
}


// -------------------------------bar controller-------------------------
function onInputText() {
    // clearCtx()
    // if (gMeme.selectedImgId) convertImageToCanvas(gMeme.selectedImgId)
    inputText()
}

function clearCtx() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function renderText() {
    // clear old text , render img + new text
    clearCtx()
    if (gMeme.selectedImgId) convertImageToCanvas(gMeme.selectedImgId)
    // TODO: fix the rendering text problem on input file image
    else handleImageFromInput(gInputImgEv)
    var textItem = gMeme.txts
    // makes sure  to render all existing texts 
    textItem.forEach((txtItem, i) => {
        gCtx.font = `${txtItem.size}px ${txtItem.font}`;
        //TODO: fix the stroke color inside
        onAlignText(i, txtItem.align)
        gCtx.strokeStyle = txtItem.color;
        gCtx.strokeText(txtItem.line, txtItem.posX, txtItem.posY);
        onAlignText(i, txtItem.align)
    });
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


// -------------------------------x and y positions-------------------------

function setBottomTextMeasure() {
    gMeme.txts[1].posY = gCanvas.height - 50;
}

function getMousePosRelative(ev) {
    var rect = gCanvas.getBoundingClientRect();
    return {
        x: ev.clientX - rect.left,
        y: ev.clientY - rect.top
    }
}







// ----------------------- on line adding ------------------------

function onAddLine() {
    gTxtItemIdx++
    if (gTxtItemIdx > 1) gMeme.txts.push(createTxtObj());
    gSelectedTextItem = gMeme.txts[gTxtItemIdx]
    fillTextItemLine()
    // clean the input field on new line
    document.querySelector('.text-input').value = '';
    renderText()
}

function fillTextItemLine() {
    gSelectedTextItem.line = 'New Line'
}



// -----------------------canvas drag text funcs------------------
function setEvents() {
    gCanvas.addEventListener('mousedown', mouseDownEvent, event)
    gCanvas.addEventListener('mousemove', mouseMoveEvent, event)
    gCanvas.addEventListener('mouseup', mouseUpEvent, event)
    gCanvas.addEventListener('mouseout', mouseOutEvent, event)
}

function mouseDownEvent(ev) {
    isThereText = checkIfText()
    if (isThereText === undefined) return

    // TODO: fix the erorr (of toggle draggble txt func) by return if txtItem line is empty 
    var mouseStartPos = getMousePosRelative(ev)
    gStartX = mouseStartPos.x
    gStartY = mouseStartPos.y
    // set drag = true to the specific texitem 
    setSelectedTextDraggable(ev)
}

function setSelectedTextDraggable(ev) {
    gMeme.txts.forEach((txtItem) => {

        if (ev.offsetX > txtItem.posX &&
            ev.offsetX < (txtItem.posX + gCtx.measureText(txtItem.line).width) &&
            // TODO: needs to be more precise  => (txtItem.posY - txtItem.size)
            ev.offsetY > (txtItem.posY - txtItem.size) &&
            ev.offsetY < txtItem.posY) {
            gSelectedTextItem = txtItem
            // set line value to the input filed
            document.querySelector('.text-input').value = gSelectedTextItem.line;
            toggleTextDraggable(txtItem, 'true')
        }
    })

}

function mouseMoveEvent(ev) {
    // return if there is no text
    var draggableTxtItem = getDraggableTxtItem()
    if (!draggableTxtItem) return
    draggableTxtItem.align = ''

    // get mouse cur pos relative to canvas
    var mouseCurPos = getMousePosRelative(ev)
    mouseCurX = mouseCurPos.x
    mouseCurY = mouseCurPos.y
    // distance calc

    var dx = mouseCurX - gStartX;
    var dy = mouseCurY - gStartY;
    gStartX = mouseCurX;
    gStartY = mouseCurY;


    draggableTxtItem.posX += dx;
    draggableTxtItem.posY += dy;
    renderText()
}


function mouseUpEvent() {
    isThereText = checkIfText()
    if (isThereText === undefined) return

    var draggableItem = getDraggableTxtItem()
    toggleTextDraggable(draggableItem, 'false')
}

function mouseOutEvent() {
    isThereText = checkIfText()
    if (isThereText === undefined) return

    var draggableItem = getDraggableTxtItem()
    toggleTextDraggable(draggableItem, 'false')
}


// helpers func

function getDraggableTxtItem() {
    return gMeme.txts.find((txtItem) => {
        return txtItem.isDraggable === true
    })
}

function toggleTextDraggable(txtItem, state) {
    state === 'true' ? txtItem.isDraggable = true : txtItem.isDraggable = false;
}

function checkIfText() {
    return gMeme.txts.find(txtItem => {
        return txtItem.line !== ''
    })
}