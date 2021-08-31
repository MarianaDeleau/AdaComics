var API_KEY = '42ae3fcea4ffd21315989c5e0dee4006';
var BASE_URL = 'https://gateway.marvel.com/v1/public';
var HASH = '5e2b4e7a9678fe99d5424aad34d696f1';
var urlComic = BASE_URL + "/comics?ts=1&apikey=" + API_KEY + "&hash=" + HASH;
//console.log(url)
fetch(urlComic)
    .then(function (response) {
    return response.json();
})
    .then(function (rta) {
    var comics = rta.data.results;
    //console.log(comics)
    var table = document.getElementById('movies');
    var tbody = table.getElementsByTagName('tbody')[0];
    comics.forEach(function (comic) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
        var td5 = document.createElement('td');
        var text = document.createTextNode(comic.title);
        var text2 = document.createTextNode(comic.id);
        var text4 = document.createTextNode(comic.description);
        for (var _i = 0, _a = comic.characters.items; _i < _a.length; _i++) {
            var item = _a[_i];
            var text5 = document.createTextNode(item.name + ", ");
            td5.appendChild(text5);
        }
        var cover = document.createElement('img');
        cover.setAttribute('src', comic.thumbnail.path + "." + comic.thumbnail.extension);
        cover.style.width = '50px';
        tr.appendChild(td);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        td.appendChild(text);
        td2.appendChild(text2);
        td3.appendChild(cover);
        td4.appendChild(text4);
        tbody.appendChild(tr);
    });
});
var urlCharacter = BASE_URL + "/characters?ts=1&apikey=" + API_KEY + "&hash=" + HASH;
fetch(urlCharacter)
    .then(function (response) {
    return response.json();
})
    .then(function (rta) {
    var characters = rta.data.results;
    //console.log(characters)
    var table = document.getElementById('character');
    var tbody = document.getElementById('character__table');
    table.appendChild(tbody);
    characters.forEach(function (character) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
        var text = document.createTextNode(character.name);
        var text2 = document.createTextNode(character.id);
        var text4 = document.createTextNode(character.description);
        var picture = document.createElement('img');
        picture.setAttribute('src', character.thumbnail.path + "." + character.thumbnail.extension);
        picture.style.width = '50px';
        tr.appendChild(td);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        td.appendChild(text);
        td2.appendChild(text2);
        td3.appendChild(picture);
        td4.appendChild(text4);
        tbody.appendChild(tr);
    });
});
