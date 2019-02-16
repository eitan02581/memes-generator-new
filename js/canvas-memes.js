'use setrict'
var gCanvas;
var gCtx;
var gMeme
// indicate mouse's place
var gisDragging
var gStartX
var gStartY

function initCanvas() {
    gCanvas = document.querySelector('#img-canvas');
    gCtx = gCanvas.getContext('2d');
    gCanvas.width = 600;
    gCanvas.height = 300
    initGmeme()
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
            posY: 50
        }, {
            isDraggable: false,
            line: '',
            font: 'Ariel',
            size: 50,
            align: '',
            color: '#000',
            posX: 50,

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
    // set the heigth of the text of the second input text
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

function onTextColor(i, hexColor) {
    var color = hexColor.value;
    gCtx.fillStyle = `${color}`;
    gMeme.txts[i].color = `${color}`;
    inputText(+i);
}

function onFontSizeChange(i, type) {
    if (type === '+') gMeme.txts[i].size = gMeme.txts[i].size + 5;
    else gMeme.txts[i].size = gMeme.txts[i].size - 5;
    inputText(+i);
}

function onAlignText(i, direction) {
    var txtItem = gMeme.txts[i]
    txtItem.align = direction
    switch (direction) {
        case 'left':
            txtItem.posX = 0;
            break;
        case 'center':
            txtItem.posX = (gCanvas.width / 2) - (gCtx.measureText(txtItem.line).width / 2);
            break;
        case 'right':
            txtItem.posX = gCanvas.width - gCtx.measureText(txtItem.line).width;
            break;
    }
}

function onFontSelect(i, el) {
    var font = el.value;
    gMeme.txts[i].font = font
}

function onSaveImage(elLink) {
    downloadImg(elLink)
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
    gisDragging = true
    // TODO: fix the erorr by return if txtItem line is empty 
    var mouseStartPos = getMousePosRelative(ev)
    gStartX = mouseStartPos.x
    gStartY = mouseStartPos.y
    // set drag = true to the specific texitem 
    gMeme.txts.forEach((txtItem) => {
        if (ev.offsetX > txtItem.posX &&
            ev.offsetX < (txtItem.posX + gCtx.measureText(txtItem.line).width) &&
            // TODO: needs to be more precise  => (txtItem.posY - txtItem.size)
            ev.offsetY > (txtItem.posY - txtItem.size) &&
            ev.offsetY < txtItem.posY)
            toggleTextDraggable(txtItem, 'true')
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


//TODO: funct to move text by x y pos
//TODO: funct to DELETE TEXT