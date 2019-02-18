'use strict'


function createImage(url, tags) {
    return {
        url: url,
        id: idGenerator(),
        tags: tags
    }
}

function createImages() {
    gImages.push(createImage("meme-imgs/img12.jpg", ['basketball', 'kiss', 'כדורסל', 'נשיקה']));
    gImages.push(createImage("meme-imgs/2.jpg", ['dance', 'nature', 'ריקוד', 'טבע']));
    gImages.push(createImage("meme-imgs/003.jpg", ['trump', 'happy', 'טראמפ', 'שמח']));
    gImages.push(createImage("meme-imgs/004.jpg", ['animal', 'dog', 'kiss', 'חיה', 'כלב', 'נשיקה']));
    gImages.push(createImage("meme-imgs/005.jpg", ['animal', 'dog', 'baby', 'sleep', 'חיה', 'כלב', 'תינוק', 'שינה']));
    gImages.push(createImage("meme-imgs/5.jpg", ['baby', 'happy', 'nature', 'תינוק', 'שמח', 'טבע']));
    gImages.push(createImage("meme-imgs/006.jpg", ['cat', 'animal', 'computer', 'sleep', 'חתול', 'חיה', 'מחשב', 'שינה']));
    gImages.push(createImage("meme-imgs/8.jpg", ['bowtie', 'happy', 'עניבה', 'שמח']));
    gImages.push(createImage("meme-imgs/9.jpg", ['baby', 'nature', 'happy', 'תינוק', 'שמח', 'טבע']));
    gImages.push(createImage("meme-imgs/12.jpg", ['man', 'point', 'איש', 'מצביע']));
    gImages.push(createImage("meme-imgs/19.jpg", ['man', 'crazy', 'yelling', 'איש', 'משוגע', 'צועק']));
    gImages.push(createImage("meme-imgs/Ancient-Aliens.jpg", ['man', 'big', 'happy', 'איש', 'גדול', 'שמח']));
    gImages.push(createImage("meme-imgs/drevil.jpg", ['man', 'drevil', 'איש', 'דררשע']));
    gImages.push(createImage("meme-imgs/img2.jpg", ['kids', 'nature', 'dancing', 'ילדים', 'טבע', 'ריקודים']));
    gImages.push(createImage("meme-imgs/img4.jpg", ['trump', 'point', 'טראמפ', 'מצביע']));
    gImages.push(createImage("meme-imgs/img5.jpg", ['baby', 'crazy', 'תינוק', 'משוגע']));
    gImages.push(createImage("meme-imgs/img6.jpg", ['animal', 'dog', 'yoga', 'חיה', 'כלב', 'יוגה']));
    gImages.push(createImage("meme-imgs/img11.jpg", ['man', 'obama', 'happy', 'איש', 'אובמה', 'שמח']));
    gImages.push(createImage("meme-imgs/leo.jpg", ['leo', 'cheers', 'happy', 'ליו', 'לחיים', 'שמח']));
    gImages.push(createImage("meme-imgs/meme1.jpg", ['man', 'matrix', 'איש', 'מטריקס']));
    gImages.push(createImage("meme-imgs/One-Does-Not-Simply.jpg", ['man', 'talking', 'איש', 'מדבר']));
    gImages.push(createImage("meme-imgs/Oprah-You-Get-A.jpg", ['oprah', 'happy', 'אופרה', 'שמח']));
    gImages.push(createImage("meme-imgs/patrick.jpg", ['patrick', 'happy', 'star', 'פטריק', 'שמח', 'כוכב']));
    gImages.push(createImage("meme-imgs/putin.jpg", ['putin', 'man', 'speech', 'פוטין', 'איש', 'נאום']));
    gImages.push(createImage("meme-imgs/X-Everywhere.jpg", ['toystory', 'happy', 'talking', 'צעצועשלסיפור', 'שמח', 'מדבר']));
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

    gKeyWords[5].popularity = 5;
    gKeyWords[2].popularity = 3;
    gKeyWords[10].popularity = 2;
    gKeyWords[13].popularity = 4;

    gKeyWords[5].fontSize = 28;
    gKeyWords[2].fontSize = 20;
    gKeyWords[10].fontSize = 16;
    gKeyWords[13].fontSize = 24;
}

function eraseInput() {
    document.querySelector('#myInput').value = '';
    renderGrid(gImages);
}