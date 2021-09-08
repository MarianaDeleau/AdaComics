//PETICION PERSONAJES
var urlCharacter = BASE_URL + "/characters?ts=1&apikey=" + API_KEY + "&hash=" + HASH;
fetch(urlCharacter)
    .then(function (response) {
    return response.json();
})
    .then(function (rta) {
    var characters = rta.data.results;
    console.log(characters);
    displayCharacters(characters);
    resultsCounter(rta);
    //displaySelectedCharacter(characters)
});
//FUNCION DISPLAY GRILLA DE PERSONAJES
var displayCharacters = function (obj) {
    var resultsGrid = document.getElementById('resultsGrid');
    obj.forEach(function (item) {
        var characterPicture = createNode('img', { src: item.thumbnail.path + "." + item.thumbnail.extension, "class": "character-results-picture" });
        var divPicture = createNode('div', { "class": "character-results-picture" }, characterPicture);
        var characterName = createNode('h3', { "class": 'h3' }, document.createTextNode(item.name));
        var divName = createNode('div', { "class": "character-results-title" }, characterName);
        var divCharacter = createNode('div', { "class": "character__results" }, divPicture, divName);
        resultsGrid.appendChild(divCharacter);
    });
};
//FUNCION DISPLAY SECCION PERSONAJE
var displaySelectedCharacter = function (obj) {
    var characterSelected = document.getElementById('characterSelected');
    obj.forEach(function (item) {
        var characterPicture = createNode('img', { src: item.thumbnail.path + "." + item.thumbnail.extension, alt: "" + item.name, "class": "character__picture" });
        var divPicture = createNode('div', { "class": "character__picture" }, characterPicture);
        var characterName = createNode('h2', { "class": "character__name" }, document.createTextNode("" + item.name));
        var characterDescription = createNode('p', { "class": "character__description" }, document.createTextNode("" + item.description));
        var characterDetail = createNode('div', { "class": "character__detail" }, characterName, characterDescription);
        characterSelected.appendChild(divPicture);
        characterSelected.appendChild(characterDetail);
    });
};
//PETICION PARA TABLA DE PERSONAJES
// fetch(urlCharacter)
//    .then((response) => {
//       return response.json()
//    })
//     .then(rta => {
//         const characters = rta.data.results
//         displayCharacters(characters)
//        console.log(characters)
//         const table = document.getElementById('character');
//         const tbody = document.getElementById('character__table');
//       table.appendChild(tbody)
//         characters.forEach((character) => {
//             const tr = document.createElement('tr');
//             const td = document.createElement('td');
//             const td2 = document.createElement('td');
//             const td3 = document.createElement('td');
//             const td4 = document.createElement('td');
//             const td5 = document.createElement('td');
//             const text = document.createTextNode(character.name);
//             const text2 = document.createTextNode(character.id);
//             const text4 = document.createTextNode(character.description);
//             for (const comic of character.comics.items) {
//                 const text5 = document.createTextNode(`${comic.name}, `)
//                 td5.appendChild(text5);
//             }            
//             const picture = document.createElement('img');
//             picture.setAttribute('src', `${character.thumbnail.path}.${character.thumbnail.extension}`);
//             picture.style.width = '50px';
//             tr.appendChild(td);
//             tr.appendChild(td2);
//             tr.appendChild(td3);
//             tr.appendChild(td4);
//             tr.appendChild(td5);
//             td.appendChild(text);
//             td2.appendChild(text2);
//             td3.appendChild(picture)
//             td4.appendChild(text4);
//             tbody.appendChild(tr);
//           });
//     })