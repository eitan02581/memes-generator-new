function init() {
    gCanvas = document.querySelector('#img-canvas');
    gCtx = gCanvas.getContext('2d');
    initCanvas();
    initGrid();
}