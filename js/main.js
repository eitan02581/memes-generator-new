function init() {
    initGrid();
}

function onDispCanvas(imgId) {
    initCanvas()
    convertImageToCanvas(imgId)
    document.querySelector('.canvas-section').classList.remove('hidden');
    document.querySelector('.gallery-section').classList.add('hidden');

}
function onDispGallerry() {
    document.querySelector('.canvas-section').classList.add('hidden');
    document.querySelector('.gallery-section').classList.toggle('hidden');
}

function keyWordSearch() {
    var searchedImages = [];
    var str = document.querySelector('#myInput').value.toUpperCase();
    updateKeyWordPop(str);
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

function updateKeyWordPop(word) {
    for (let i = 0; i < gKeyWords.length; i++) {
        if (word === gKeyWords[i].word.toUpperCase()) {
            gKeyWords[i].popularity++;
            if (gKeyWords[i].fontSize < 50) gKeyWords[i].fontSize += 4;
            findMostPop();
        }
    }
}

function findMostPop() {
    var copyArr = [...gKeyWords];
    for (let j = 0; j < 5; j++) {
        var max = -Infinity;
        var idx = 0;
        for (let i = 0; i < copyArr.length; i++) {
            if (copyArr[i].popularity > max) {
                max = copyArr[i].popularity;
                idx = i;
            }
        }
        gMostPop[j] = copyArr[idx];
        copyArr.splice(idx, 1);
        document.querySelector(`.word${j + 1}`).innerText = gMostPop[j].word;
        document.querySelector(`.word${j + 1}`).style.fontSize = gMostPop[j].fontSize + 'px';
    }
}

function searchElectedWord(el) {
    document.querySelector('#myInput').value = el.innerText;
    keyWordSearch();
}