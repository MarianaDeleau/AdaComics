//FUNCION DISPLAY GRILLA DE PERSONAJES
var characters = document.getElementsByClassName("character__results");
var displayCharacters = function (obj, offset) {
    var resultsGrid = document.getElementById('resultsGrid');
    resultsGrid.innerHTML = " ";
    obj.forEach(function (item) {
        var characterPicture = createNode('img', { src: item.thumbnail.path + "." + item.thumbnail.extension, alt: "" + item.name, id: "" + item.id, "class": "characters" });
        var divPicture = createNode('div', { "class": "characters" }, characterPicture);
        var characterName = createNode('h3', { "class": 'h3' }, document.createTextNode(item.name));
        var divName = createNode('div', { "class": "character-results-title" }, characterName);
        var divCharacter = createNode('div', { "class": "character__results" }, divPicture, divName);
        resultsGrid.appendChild(divCharacter);
        for (var i = 0; i < characters.length; i++) {
            characters[i].addEventListener('click', handleSelectedItem);
        }
    });
};
//FUNCION DISPLAY SECCION PERSONAJE
var displaySelectedCharacter = function () {
    var _a = getParams(), id = _a.id, type = _a.type;
    var characterSelected = document.getElementById('characterSelected');
    var comicSelected = document.getElementById('comicSelected');
    var resultsGrid = document.getElementById('resultsGrid');
    comicSelected.innerHTML = '';
    characterSelected.innerHTML = '';
    fetch(BASE_URL + "/" + type + "/" + id + "?ts=1&apikey=" + API_KEY + "&hash=" + HASH)
        .then(function (response) {
        return response.json();
    })
        .then(function (rta) {
        var item = rta.data.results[0];
        var characterPicture = createNode('img', { src: item.thumbnail.path + "." + item.thumbnail.extension, alt: "" + item.name, "class": "character__picture" });
        var divPicture = createNode('div', { "class": "character__picture" }, characterPicture);
        var characterName = createNode('h2', { "class": "character__name" }, document.createTextNode("" + item.name));
        var characterDescription = createNode('p', { "class": "character__description" }, document.createTextNode("" + item.description));
        var characterDetail = createNode('div', { "class": "character__detail" }, characterName, characterDescription);
        characterSelected.appendChild(divPicture);
        characterSelected.appendChild(characterDetail);
    });
    resultsGrid.style.justifyContent = 'start';
};
