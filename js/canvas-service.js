var gInputImgEv

function inputText(i) {
    var text = document.querySelector(`.text-input${i}`).value;
    gMeme.txts[i].line = text
    renderText()
}


//UPLOAD IMG WITH INPUT FILE 

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

function eraseText(elErase, inputBoxNum) {
    elErase.previousElementSibling.value = '';
    inputText(inputBoxNum);
}

// TODO: add the file to img arr