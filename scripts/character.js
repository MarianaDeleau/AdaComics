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
        var divCharacter = createNode('div', { "class": "character__results", href: "./index.html?title=" + item.name + "&id=" + item.id + "&offset=" + offset }, divPicture, divName);
        resultsGrid.appendChild(divCharacter);
        for (var i = 0; i < characters.length; i++) {
            characters[i].addEventListener('click', handleSelectedItem);
        }
    });
};
//FUNCION DISPLAY SECCION PERSONAJE
var displaySelectedCharacter = function (obj) {
    var characterSelected = document.getElementById('characterSelected');
    var comicSelected = document.getElementById('comicSelected');
    var resultsGrid = document.getElementById('resultsGrid');
    comicSelected.innerHTML = '';
    obj.forEach(function (item) {
        var characterPicture = createNode('img', { src: item.thumbnail.path + "." + item.thumbnail.extension, alt: "" + item.name, "class": "character__picture" });
        var divPicture = createNode('div', { "class": "character__picture" }, characterPicture);
        var characterName = createNode('h2', { "class": "character__name" }, document.createTextNode("" + item.name));
        var characterDescription = createNode('p', { "class": "character__description" }, document.createTextNode("" + item.description));
        var characterDetail = createNode('div', { "class": "character__detail" }, characterName, characterDescription);
        characterSelected.appendChild(divPicture);
        characterSelected.appendChild(characterDetail);
        // const urlRelatedInfo =  `${BASE_URL}/characters/${item.id}/comics?ts=1&apikey=${API_KEY}&hash=${HASH}`
        //     console.log(urlRelatedInfo)
        //     fetchRelatedInfoComic(urlRelatedInfo, 'characters')
    });
    resultsGrid.style.justifyContent = 'start';
};
