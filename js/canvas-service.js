var gInputImgEv
var gFonts = ['Ariel', 'cursive', 'Courier', 'Sans Serif', 'Comic Sans MS', 'Times New Roman', 'Courier New', 'Verdana', 'Trebuchet MS',
    'Arial Black', 'Impact', 'Bookman', 'Garamond', 'Palatino', 'Georgia'
];
var gUploadedImg


function inputText() {
    var text = document.querySelector(`.text-input`).value;
    // set text for the first line
    gSelectedTextItem.line = text;
    renderText()
}

//set  aspect ration 
function setBestAspectSize(image) {
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

// -------------------- new text obj func --------------

function createTxtObj() {
    return {
        isDraggable: false,
        line: '',
        font: 'Impact',
        size: 50,
        align: '',
        color: '#fff',
        posX: gCanvas.width / 2,
        posY: gCanvas.height / 2,
    }
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




// -------------------------------- UPLOAD IMG WITH INPUT FILE ---------------

function onFileInputChange(ev) {
    handleImageFromInput(ev)
}


// function renderCanvas(img) {
//     gCanvas.width = img.width;
//     gCanvas.height = img.height;
//     gCtx.drawImage(img, 0, 0);
// }



function handleImageFromInput(ev, onImageReady) {
    //    reset the selected img id ( from the first pic)
    gMeme.selectedImgId = ''
    gInputImgEv = ev
    clearCtx()
    var reader = new FileReader();

    reader.onload = function (ev) {
        gUploadedImg = new Image();
        gUploadedImg.onload = function () {
            gCanvas.width = gUploadedImg.width;
            gCanvas.height = gUploadedImg.height;
            gCtx.drawImage(gUploadedImg, 0, 0);
        }
        gUploadedImg.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);


}
// TODO: pop txtITEM FROM GMEME
function eraseText() {
    document.querySelector('.text-input').value = '';
    inputText();
}


function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpg');
    elLink.href = imgContent;
}
// TODO: add the file to img arr




// -----------------------canvas drag text funcs------------------
function setDeviceEvents() {
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
var can = document.querySelector('canvas');
can.addEventListener("touchmove", preventBehavior, {
    passive: false
});