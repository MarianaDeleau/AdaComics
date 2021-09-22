//PETICION PERSONAJES
var urlCharacter = BASE_URL + "/characters?ts=1&apikey=" + API_KEY + "&hash=" + HASH;
//PETICION COMICS
var fetchCharacter = function (offset) {
    fetch(BASE_URL + "/characters?ts=1&apikey=" + API_KEY + "&hash=" + HASH + "&offset=" + offset)
        .then(function (response) {
        return response.json();
    })
        .then(function (rta) {
        var characters = rta.data.results;
        var total = rta.data.total;
        displayCharacters(characters, offset);
        resultsCounter(total);
        disableButtons(offset, total);
    });
};
//fetchCharacter(0)
//FUNCION DISPLAY GRILLA DE PERSONAJES
var characters = document.getElementsByClassName("character__results");
var displayCharacters = function (obj, offset) {
    var resultsGrid = document.getElementById('resultsGrid');
    resultsGrid.innerHTML = " ";
    obj.forEach(function (item) {
        var characterPicture = createNode('img', { src: item.thumbnail.path + "." + item.thumbnail.extension, alt: "" + item.name, id: "" + item.id, "class": "character-results-picture" });
        var divPicture = createNode('div', { "class": "character-results-picture" }, characterPicture);
        var characterName = createNode('h3', { "class": 'h3' }, document.createTextNode(item.name));
        var divName = createNode('div', { "class": "character-results-title" }, characterName);
        var divCharacter = createNode('div', { "class": "character__results", href: "./index.html?title=" + item.name + "&id=" + item.id + "&offset=" + offset }, divPicture, divName);
        resultsGrid.appendChild(divCharacter);
        for (var i = 0; i < characters.length; i++) {
            characters[i].addEventListener('click', displaySelectedCharacter);
        }
    });
};
//FUNCION DISPLAY SECCION PERSONAJE
var displaySelectedCharacter = function (e) {
    var characterSelectedId = e.target.id;
    var characterSelected = document.getElementById('characterSelected');
    var resultsSection = document.getElementById('resultsSection');
    console.log(characterSelectedId);
    setTimeout(function () {
        fetch(BASE_URL + "/characters/" + characterSelectedId + "?ts=1&apikey=" + API_KEY + "&hash=" + HASH)
            .then(function (response) {
            return response.json();
        })
            .then(function (rta) {
            var selectedCharacter = rta.data.results[0];
            var characterPicture = createNode('img', { src: selectedCharacter.thumbnail.path + "." + selectedCharacter.thumbnail.extension, alt: "" + selectedCharacter.name, "class": "character__picture" });
            var divPicture = createNode('div', { "class": "character__picture" }, characterPicture);
            var characterName = createNode('h2', { "class": "character__name" }, document.createTextNode("" + selectedCharacter.name));
            var characterDescription = createNode('p', { "class": "character__description" }, document.createTextNode("" + selectedCharacter.description));
            var characterDetail = createNode('div', { "class": "character__detail" }, characterName, characterDescription);
            characterSelected.appendChild(divPicture);
            characterSelected.appendChild(characterDetail);
        });
        resultsSection.setAttribute('hidden', 'true');
    }, 2000);
};
