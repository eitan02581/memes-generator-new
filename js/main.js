function init() {
    initGrid();
}

function onDispCanvas(imgId) {
    initCanvas()
    convertImageToCanvas(imgId)
    console.log(document.querySelector('.gallery-section'));
    
    document.querySelector('.canvas-section').classList.remove('hidden');
    document.querySelector('.gallery-section').classList.add('hidden');
}

function onDispGallerry() {
    document.querySelector('.canvas-section').classList.add('hidden');
    document.querySelector('.gallery-section').classList.toggle('hidden');
}