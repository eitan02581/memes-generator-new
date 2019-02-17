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
    gTxtItemIdx = 0;
    gFirstImage = true
    initGmeme();
    gSelectedTextItem = gMeme.txts[0];
    setEvents();
    renderSelect();
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

function getBestAspectSize(image) {
    gFirstImage = false
    if (window.innerWidth > 540 && window.innerWidth < 940) {
        gCanvas.width = 400
        gCanvas.height = 400

    } else if (window.innerWidth > 450 && window.innerWidth < 540) {
        gCanvas.width = 350
        gCanvas.height = 350

    } else if (window.innerWidth < 450) {
        gCanvas.width = 280
        gCanvas.height = 280

    }
    var imgRatio = image.width / image.height; // Image aspect ratio
    var canvasRatio = gCanvas.width / gCanvas.height; // Canvas aspect ratio
    var resultImageH, resultImageW;
    if (imgRatio < canvasRatio) {
        resultImageH = gCanvas.height;
        resultImageW = resultImageH * imgRatio;
    } else {
        resultImageW = gCanvas.width;
        resultImageH = resultImageW / imgRatio;
    }
    gCanvas.width = resultImageW
    gCanvas.height = resultImageH

}

function convertImageToCanvas(id) {
    clearCtx();
    gMeme.selectedImgId = id;
    var image = document.getElementById(`${id}`);
    if (gFirstImage) {
        getBestAspectSize(image)
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
    // TODO: fix the rendering text problem on input file image
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

function renderSelect() {
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


// -------------------------------x and y positions-------------------------

function setBottomTextMeasure() {
    gMeme.txts[1].posY = gCanvas.height - 50;

}

function getMousePosRelative(ev) {
    var rect = gCanvas.getBoundingClientRect();
    if ("ontouchstart" in document.documentElement) {
        return {

            x: ev.targetTouches[0].clientX - rect.left,
            y: ev.targetTouches[0].clientY - rect.top
        }
    } else {
        return {
            x: ev.clientX - rect.left,
            y: ev.clientY - rect.top
        }
    }
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



// -----------------------canvas drag text funcs------------------
function setEvents() {
    gCanvas.addEventListener('mousedown', mouseDownEvent, event)
    gCanvas.addEventListener('mousemove', mouseMoveEvent, event)
    gCanvas.addEventListener('mouseup', mouseUpEvent, event)
    gCanvas.addEventListener('mouseout', mouseOutEvent, event)

    gCanvas.addEventListener('touchstart', mouseDownEvent, event)
    gCanvas.addEventListener('touchmove', mouseMoveEvent, event)
    gCanvas.addEventListener('touchend', mouseUpEvent, event)
    // prevent the dragged text to get over the canvas
    gCanvas.addEventListener('touchmove', touchOut, event)
}

function touchOut(ev) {
    if (gStartX > gCanvas.width ||
        gStartX < 0 ||
        // TODO: needs to be more precise  => (txtItem.posY - txtItem.size)
        gStartY > gCanvas.height ||
        gStartY < 0) {
        var draggableItem = getDraggableTxtItem()
        toggleTextDraggable(draggableItem, 'false')
    }
}

function mouseDownEvent(ev) {
    isThereText = checkIfText()
    if (isThereText === undefined) return

    // TODO: fix the erorr (of toggle draggble txt func) by return if txtItem line is empty 
    var deviceCursorPos = getMousePosRelative(ev)
    gStartX = deviceCursorPos.x
    gStartY = deviceCursorPos.y
    // set drag = true to the specific texitem 
    setSelectedTextDraggable(ev)
}

function setSelectedTextDraggable(ev) {
    gMeme.txts.forEach((txtItem) => {
        // TODO: FIND offset prop to touch 
        if (gStartX > txtItem.posX &&
            gStartX < (txtItem.posX + gCtx.measureText(txtItem.line).width) &&
            // TODO: needs to be more precise  => (txtItem.posY - txtItem.size)
            gStartY > (txtItem.posY - txtItem.size) &&
            gStartY < txtItem.posY) {
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


// --------------------------prevent scrolling  ---------------


function preventBehavior(e) {
    e.preventDefault(); 
};

document.addEventListener("touchmove", preventBehavior, {passive: false});