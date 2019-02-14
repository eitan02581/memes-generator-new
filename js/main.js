function init() {
    gCanvas = document.querySelector('#img-canvas');
    gCtx = gCanvas.getContext('2d');
    initCanvas();
    initGrid();
}

function keyWordSearch() {
    var searchedImages = [];
    var str = $('#myInput').val().toUpperCase();
    for (let i = 0; i < gImages.length; i++) {
        for (let j = 0; j < gImages[i].tags.length; j++) {
            if (gImages[i].tags[j].toUpperCase().indexOf(str) > -1) {
                searchedImages.push(gImages[i]);
                break;                
            }
        }
    }
    renderGrid(searchedImages);
}