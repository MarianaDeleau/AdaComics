//FUNCION DISPLAY GRILLA DE COMICS
var comics = document.getElementsByClassName("comic__results");
var displayComics = function (obj, offset) {
    var resultsGrid = document.getElementById('resultsGrid');
    resultsGrid.innerHTML = " ";
    obj.forEach(function (item) {
        var comicCover = createNode('img', { src: item.thumbnail.path + "." + item.thumbnail.extension, alt: "" + item.title, "class": "comics", id: "" + item.id });
        var divCover = createNode('div', { "class": "comics" }, comicCover);
        var comicTitle = createNode('h3', { "class": 'h3' }, document.createTextNode(item.title));
        var divTitle = createNode('div', { "class": "comic-results-title" }, comicTitle);
        var divComic = createNode('div', { "class": "comic__results", href: "./index.html?title=" + item.title + "&id=" + item.id + "&offset=" + offset }, divCover, divTitle);
        resultsGrid.appendChild(divComic);
        for (var i = 0; i < comics.length; i++) {
            comics[i].addEventListener('click', handleSelectedItem);
        }
    });
};
//FUNCION DISPLAY COMIC SELECCIONADO
var displaySelectedComic = function () {
    var _a = getParams(), id = _a.id, type = _a.type;
    var resultsGrid = document.getElementById('resultsGrid');
    var comicSelected = document.getElementById('comicSelected');
    var characterSelected = document.getElementById('characterSelected');
    comicSelected.innerHTML = '';
    characterSelected.innerHTML = '';
    fetch(BASE_URL + "/" + type + "/" + id + "?ts=1&apikey=" + API_KEY + "&hash=" + HASH)
        .then(function (response) {
        return response.json();
    })
        .then(function (rta) {
        var item = rta.data.results[0];
        var comicCover = createNode('img', { src: item.thumbnail.path + "." + item.thumbnail.extension, alt: "" + item.title, "class": "comic__cover" });
        var divCover = createNode('div', { "class": "comic__cover" }, comicCover);
        var comicTitle = createNode('h2', { "class": "comic__title" }, document.createTextNode("" + item.title));
        var publishedTitle = createNode('h3', { "class": "h3" }, document.createTextNode('Publicado:'));
        var date = new Intl.DateTimeFormat('es-AR').format(new Date(parseInt(item.dates.find(function (date) { return date.type === 'onsaleDate'; }).date)));
        var publishedDate = createNode('p', { "class": "comic__published" }, document.createTextNode(date));
        var writersTitle = createNode('h3', { "class": "h3" }, document.createTextNode('Guionistas:'));
        var writers = [];
        for (var prop in item.creators.items) {
            writers.push(item.creators.items[prop].name);
        }
        var comicWriters = createNode('p', { "class": "comic__writers" }, document.createTextNode(writers.toString()));
        var descriptionTitle = createNode('h3', { "class": "h3" }, document.createTextNode('Descripción:'));
        var comicDescription = createNode('p', { "class": "comic__description" }, document.createTextNode("" + (item.description || "")));
        var comicDetail = createNode('div', { "class": "comic__detail" }, comicTitle, publishedTitle, publishedDate, writersTitle, comicWriters, descriptionTitle, comicDescription);
        comicSelected.appendChild(divCover);
        comicSelected.appendChild(comicDetail);
    });
    resultsGrid.style.justifyContent = 'start';
};
