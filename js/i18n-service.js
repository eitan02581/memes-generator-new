var gTrans = {
    'about-us': {
        en: 'ABOUT US',
        he: 'עלינו'
    },
    'contact-us': {
        en: 'CONTACT US',
        he: 'צור קשר'
    }, 
    'main-header': {
        en: 'Memes generator',
        he: 'יוצר המימים'
    },
    'return-btn': {
        en: 'Back to gallery',
        he: 'בחזרה לגלריה'
    },
    'text-left': {
        en: 'Left',
        he: 'שמאלה'
    },
    'text-center': {
        en: 'Center',
        he: 'מרכז'
    },
    'text-right': {
        en: 'Right',
        he: 'ימינה'
    },
    'add-line': {
        en: 'Add line',
        he: 'הוסף שורה'
    },
    'save-btn': {
        en: 'Save',
        he: 'שמור'
    },
    'share-btn': {
        en: 'Share',
        he: 'שתף'
    },
    'pic-choice': {
        en: 'Choose a pic',
        he: 'בחר תמונה'
    },
    'search-placeholder': {
        en: 'Search by keywords..',
        he: '..חפש לפי מילות מפתח'
    },
    'tag-basketball': {
        en: 'Basketball',
        he: 'כדורסל'
    },
    'tag-kiss': {
        en: 'Kiss',
        he: 'נשיקה'
    },
    'tag-dance': {
        en: 'Dance',
        he: 'ריקוד'
    },
    'tag-nature': {
        en: 'Nature',
        he: 'טבע'
    },
    'tag-trump': {
        en: 'Trump',
        he: 'טראמפ'
    },
    'tag-happy': {
        en: 'Happy',
        he: 'שמחה'
    },
    'tag-animal': {
        en: 'Animal',
        he: 'חיה'
    },
    'tag-dog': {
        en: 'Dog',
        he: 'כלב'
    },
    'tag-baby': {
        en: 'Baby',
        he: 'תינוק'
    },
    'tag-sleep': {
        en: 'Sleep',
        he: 'שינה'
    },
    'tag-cat': {
        en: 'Cat',
        he: 'חתול'
    },
    'tag-computer': {
        en: 'Computer',
        he: 'מחשב'
    },
    'tag-bowtie': {
        en: 'Bowtie',
        he: 'עניבה'
    },
    'tag-man': {
        en: 'Man',
        he: 'איש'
    },
    'tag-point': {
        en: 'Point',
        he: 'מצביע'
    },
    'tag-crazy': {
        en: 'Crazy',
        he: 'משוגע'
    },
    'tag-yelling': {
        en: 'Yelling',
        he: 'צועק'
    },
    'tag-big': {
        en: 'Big',
        he: 'גדול'
    },
    'tag-drevil': {
        en: 'Drevil',
        he: 'דררשע'
    },
    'tag-kids': {
        en: 'Kids',
        he: 'ילדים'
    },
    'tag-dancing': {
        en: 'Dancing',
        he: 'ריקודים'
    },
    'tag-yoga': {
        en: 'Yoga',
        he: 'יוגה'
    },
    'tag-obama': {
        en: 'Obama',
        he: 'אובמה'
    },
    'tag-leo': {
        en: 'Leo',
        he: 'ליאו'
    },
    'tag-cheers': {
        en: 'Cheers',
        he: 'לחיים'
    },
    'tag-matrix': {
        en: 'Matrix',
        he: 'מטריקס'
    },
    'tag-talking': {
        en: 'Talking',
        he: 'דיבורים'
    },
    'tag-oprah': {
        en: 'Oprah',
        he: 'אופרה'
    },
    'tag-patrick': {
        en: 'Patrick',
        he: 'פטריק'
    },
    'tag-star': {
        en: 'Star',
        he: 'כוכב'
    },
    'tag-putin': {
        en: 'Putin',
        he: 'פוטין'
    },
    'tag-speech': {
        en: 'Speech',
        he: 'נאום'
    },
    'tag-toystory': {
        en: 'Toystory',
        he: 'צעצועשלסיפור'
    }
}


var gCurrLang = 'en';

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');
    
    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        // var transKey = el.getAttribute('data-trans');
        var transKey = el.dataset.trans;
        
        var txt = getTrans(transKey);

        // Translating is actually complex and needs a library
        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt);
        } else {
            el.innerText = txt;
        }
    }
}

function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';

    var txt = keyTrans[gCurrLang];

    // If not found - use english
    if (!txt) txt = keyTrans['en'];

    return txt;
}

function setLang(lang) {
    gCurrLang = lang;
}