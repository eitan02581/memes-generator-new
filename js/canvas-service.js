function inputText() {
    var text = document.querySelector('.text-input').value;
    gMeme.txts[0].line = text
    var line = gMeme.txts[0].line
    renderText(line)
}


//UPLOAD IMG WITH INPUT FILE 

function onFileInputChange(ev) {
    handleImageFromInput(ev, renderCanvas)
}

function renderCanvas(img) {
    gCanvas.width = img.width;
    gCanvas.height = img.height;
    gCtx.drawImage(img, 0, 0);
}

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

// TODO: add the file to img arr