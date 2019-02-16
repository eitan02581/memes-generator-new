function idGenerator() {
    var length = 6;
    var txt = '';
    var possible = 'ABCDE0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }    
    return txt;
}