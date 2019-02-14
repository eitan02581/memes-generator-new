var gImages = [];

function initGrid() {
    gImages = createImages();
    console.log(gImagesgit);
    
    renderGrid();
}

function createImage(url, tags) {
    var image = {url: url, id: idGenerator(), tags: tags}
    return image;
}

function createImages() {
    gImages.push(createImage("../1 Thursday - 2100/meme-imgs/003.jpg", ['trump', 'happy']));
    gImages.push(createImage("../1 Thursday - 2100/meme-imgs/2.jpg", ['dance', 'happy']));
    gImages.push(createImage("../1 Thursday - 2100/meme-imgs/003.jpg", ['trump', 'happy']));
    gImages.push(createImage("../1 Thursday - 2100/meme-imgs/003.jpg", ['trump', 'happy']));
    gImages.push(createImage("../1 Thursday - 2100/meme-imgs/003.jpg", ['trump', 'happy']));
    gImages.push(createImage("../1 Thursday - 2100/meme-imgs/003.jpg", ['trump', 'happy']));

}

function renderGrid() {
    console.log(gImages);
    
    var strHTML = gImages.map(function(image) {
        return `<div id="${images.id}"> <img src="${images.url} alt=""> </div>`
    })
    $('.grid-container').html(strHTML);
}