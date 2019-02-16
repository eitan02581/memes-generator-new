function renderGrid(images) {
    var strHTML = images.map(function (image) {
        return `<div > <img id="${image.id}"  onclick="  onDispCanvas('${image.id}')"  class="image-render-style" src="${image.url}" alt=""> </div>`
    });
    var str = strHTML.join('');
    document.querySelector('.grid-container').innerHTML = str.split('>,<').join('><');
}

function renderUL() {
    var strHTML = '';
    for (let i =0 ; i< gKeyWords.length; i++) {
        strHTML += `<li onclick="searchElectedWord(this)"><a href="#">${gKeyWords[i].word}</a></li>`
    }
    document.querySelector('#inputUL').innerHTML = strHTML;
}

function showList() {
    if (document.querySelector('#myInput').value) {
        document.querySelector('#inputUL').classList.remove('hidden');
    } else {
        document.querySelector('#inputUL').classList.add('hidden');
    }    
}