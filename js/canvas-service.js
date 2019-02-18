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