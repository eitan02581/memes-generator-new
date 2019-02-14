'use setrict'
var gCanvas;
var gCtx

function initCanvas() {

    gCanvas.width = 600;
    gCanvas.height = 300
    gCanvas
}

// upload image to canvas

function onFileInputChange(ev) {
    handleImageFromInput(ev, renderCanvas)
}

function renderCanvas(img) {
    gCanvas.width = img.width;
    gCanvas.height = img.height;
    gCtx.drawImage(img, 0, 0);
}

//UPLOAD IMG WITH INPUT FILE
function handleImageFromInput(ev, onImageReady) {
    var reader = new FileReader();

    reader.onload = function (ev) {
        var img = new Image();
        img.onload = function () {
            gCanvas.width = img.width;
            gCanvas.height = img.height;
            gCtx.drawImage(img, 0, 0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}