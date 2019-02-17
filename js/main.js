function scrollDown() {
    $('html,body').animate({
        scrollTop: $("#about-us").offset().top
    }, 'slow');
}

function scrollUp() {
    $('html,body').animate({
        scrollTop: $(".navbar-area").offset().top
    }, 'slow');
}

function toggleContact() {
    document.querySelector('.contact').classList.toggle('contact-show');
}

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
    var ul = document.getElementById("inputUL");
    var li = ul.getElementsByTagName("li");
    for (let i = 0; i < li.length; i++) {
        var a = li[i].getElementsByTagName("a")[0];
        var txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(str) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
    renderGrid(searchedImages);
}

function updateKeyWordPop(word) {
    for (let i = 0; i < gKeyWords.length; i++) {
        if (word === gKeyWords[i].word.toUpperCase()) {
            gKeyWords[i].popularity++;
            if (gKeyWords[i].fontSize < 50) gKeyWords[i].fontSize++;
            findMostPop();
        }
    }
}

function findMostPop() {
    var copyArr = [...gKeyWords]; // a copy of the key words
    
    // if isn't onload makes a copy of popular words array
    if (!gFirstAppear) {
        var copyMostPop = [...gMostPop];
    }
    for (let j = 0; j < 5; j++) {
        var max = -Infinity;
        var idx = 0;
        // finds most popular word
        for (let i = 0; i < copyArr.length; i++) {
            if (copyArr[i].popularity > max) {
                max = copyArr[i].popularity;
                idx = i;
            }
        }
        // inserts the most popular word into array
        gMostPop[j] = copyArr[idx];
        // removes it from copy array
        copyArr.splice(idx, 1);
        // makes all font sizes up to date
        for (let k=0; k<gMostPop.length; k++) {
            var text = document.querySelector(`.word${j + 1}`).innerText;
            if (text === gMostPop[k].word) {
                document.querySelector(`.word${j + 1}`).style.fontSize = gMostPop[k].fontSize + 'px';
            }
        }
    }
    // when isn't first load, checks if theres a new popular word
    if (!gFirstAppear) {
        for (let i = 0; i < gMostPop.length; i++) {
            if (gMostPop.indexOf(copyMostPop[i]) === -1) {
                gPopChanged = true;
                break;
            }
        }
    }
    // if is first load or most popular array changed, it shuffles the most populars on screen
    if (gFirstAppear || gPopChanged) {
        // shuffles pop array
        gMostPop = shuffle(gMostPop);
        // renders words and font sizes
        for (let j = 0; j < gMostPop.length; j++) {
            document.querySelector(`.word${j + 1}`).innerText = gMostPop[j].word;
            document.querySelector(`.word${j + 1}`).style.fontSize = gMostPop[j].fontSize + 'px';
        }
        // updates status
        if (gFirstAppear) gFirstAppear = false;
        if (gPopChanged) gPopChanged = false;
    }
}

function searchElectedWord(el) {
    if (document.querySelector('#myInput').value !== el.innerText) {
        document.querySelector('#myInput').value = el.innerText;
        document.querySelector('#inputUL').classList.add('hidden');
        keyWordSearch();
    }
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') {
        document.body.classList.add('rtl')
    } else {
        document.body.classList.remove('rtl')
    }
    doTrans();
}

function onSendEmail() {
    sendEmail()
}

function sendEmail() {
    var name = $('#contact-name').val();
    var email = $('#contact-email').val();
    var subj = $('#contact-subject').val();
    var body = $('#contact-body').val();

    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subj}&body=${body}`);
}