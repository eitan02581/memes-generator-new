var gInputImgEv
var fonts = ['Ariel', 'cursive', 'Courier', 'Sans Serif', 'Comic Sans MS', 'Times New Roman', 'Courier New', 'Verdana', 'Trebuchet MS',
             'Arial Black', 'Impact', 'Bookman', 'Garamond', 'Palatino','Georgia'];

function inputText() {
    var text = document.querySelector(`.text-input`).value;
    // set text for the first line
    gSelectedTextItem.line = text;
    renderText()
}


// -------------------- new text obj func --------------

function createTxtObj() {
    return {
        isDraggable: false,
        line: '',
        font: 'Ariel',
        size: 50,
        align: '',
        color: '#fff',
        posX: gCanvas.width / 2,
        posY: gCanvas.height / 2,
    }
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
// TODO: pop txtITEM FROM GMEME
function eraseText(elErase) {
    elErase.previousElementSibling.value = '';
    inputText();
}


function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpg');
    elLink.href = imgContent;
}
// TODO: add the file to img arr