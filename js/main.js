function init() {
    initCanvas();
    initGrid();
}

function onDispSection() {
    document.querySelector('.canvas-section').classList.toggle('hidden');
    document.querySelector('.gallery-section').classList.toggle('hidden');
}