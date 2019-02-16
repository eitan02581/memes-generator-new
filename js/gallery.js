var gImages = [];
var gKeyWords = [];
var gMostPop = [];

function initGrid() {
    createImages();
    createKeyWords();
    findMostPop();
    renderGrid(gImages);
}

function createImage(url, tags) {
    return {
        url: url,
        id: idGenerator(),
        tags: tags
    }
}

function createImages() {
    gImages.push(createImage("meme-imgs/img12.jpg", ['basketball', 'kiss']));
    gImages.push(createImage("meme-imgs/2.jpg", ['dance', 'nature']));
    gImages.push(createImage("meme-imgs/003.jpg", ['trump', 'happy']));
    gImages.push(createImage("meme-imgs/004.jpg", ['animal', 'dog', 'kiss']));
    gImages.push(createImage("meme-imgs/005.jpg", ['animal', 'dog', 'baby', 'sleep']));
    gImages.push(createImage("meme-imgs/5.jpg", ['baby', 'happy', 'nature']));
    gImages.push(createImage("meme-imgs/006.jpg", ['cat', 'animal', 'computer', 'sleep']));
    gImages.push(createImage("meme-imgs/8.jpg", ['bowtie', 'happy']));
    gImages.push(createImage("meme-imgs/9.jpg", ['baby', 'nature', 'happy']));
    gImages.push(createImage("meme-imgs/12.jpg", ['man', 'point']));
    gImages.push(createImage("meme-imgs/19.jpg", ['man', 'crazy', 'yelling']));
    gImages.push(createImage("meme-imgs/Ancient-Aliens.jpg", ['man', 'big', 'happy']));
    gImages.push(createImage("meme-imgs/drevil.jpg", ['man', 'drevil']));
    gImages.push(createImage("meme-imgs/img2.jpg", ['kids', 'nature', 'dancing']));
    gImages.push(createImage("meme-imgs/img4.jpg", ['trump', 'point']));
    gImages.push(createImage("meme-imgs/img5.jpg", ['baby', 'crazy']));
    gImages.push(createImage("meme-imgs/img6.jpg", ['animal', 'dog', 'yoga']));
    gImages.push(createImage("meme-imgs/img11.jpg", ['man', 'obama', 'happy']));
    gImages.push(createImage("meme-imgs/leo.jpg", ['leo', 'cheers', 'happy']));
    gImages.push(createImage("meme-imgs/meme1.jpg", ['man', 'matrix']));
    gImages.push(createImage("meme-imgs/One-Does-Not-Simply.jpg", ['man', 'talking']));
    gImages.push(createImage("meme-imgs/Oprah-You-Get-A.jpg", ['oprah', 'happy']));
    gImages.push(createImage("meme-imgs/patrick.jpg", ['patrick', 'happy', 'star']));
    gImages.push(createImage("meme-imgs/putin.jpg", ['putin', 'man', 'speech']));
    gImages.push(createImage("meme-imgs/X-Everywhere.jpg", ['toystory', 'happy', 'talking']));
}

function renderGrid(images) {
    var strHTML = images.map(function (image) {
        return `<div > <img id="${image.id}"  onclick="  onDispCanvas('${image.id}')"  class="image-render-style" src="${image.url}" alt=""> </div>`
    });
    var str = strHTML.join('');
    document.querySelector('.grid-container').innerHTML = str.split('>,<').join('><');
}

function createKeyWord(word) {
    var keyWord = {
        word: word,
        popularity: 1,
        fontSize: 12
    }
    return keyWord;
}

function createKeyWords() {
    gKeyWords.push(createKeyWord('basketball'));
    gKeyWords.push(createKeyWord('kiss'));
    gKeyWords.push(createKeyWord('dance'));
    gKeyWords.push(createKeyWord('nature'));
    gKeyWords.push(createKeyWord('trump'));
    gKeyWords.push(createKeyWord('happy'));
    gKeyWords.push(createKeyWord('animal'));
    gKeyWords.push(createKeyWord('dog'));
    gKeyWords.push(createKeyWord('baby'));
    gKeyWords.push(createKeyWord('sleep'));
    gKeyWords.push(createKeyWord('cat'));
    gKeyWords.push(createKeyWord('computer'));
    gKeyWords.push(createKeyWord('bowtie'));
    gKeyWords.push(createKeyWord('man'));
    gKeyWords.push(createKeyWord('point'));
    gKeyWords.push(createKeyWord('crazy'));
    gKeyWords.push(createKeyWord('yelling'));
    gKeyWords.push(createKeyWord('big'));
    gKeyWords.push(createKeyWord('drevil'));
    gKeyWords.push(createKeyWord('kids'));
    gKeyWords.push(createKeyWord('dancing'));
    gKeyWords.push(createKeyWord('yoga'));
    gKeyWords.push(createKeyWord('obama'));
    gKeyWords.push(createKeyWord('leo'));
    gKeyWords.push(createKeyWord('cheers'));
    gKeyWords.push(createKeyWord('matrix'));
    gKeyWords.push(createKeyWord('talking'));
    gKeyWords.push(createKeyWord('oprah'));
    gKeyWords.push(createKeyWord('patrick'));
    gKeyWords.push(createKeyWord('star'));
    gKeyWords.push(createKeyWord('putin'));
    gKeyWords.push(createKeyWord('speech'));
    gKeyWords.push(createKeyWord('toystory'));
}