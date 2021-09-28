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
var comicSelected = document.getElementById('comicSelected');
var characterSelected = document.getElementById('characterSelected');
//FUNCION DISPLAY COMIC SELECCIONADO
var displaySelectedComic = function (obj) {
    var resultsGrid = document.getElementById('resultsGrid');
    characterSelected.innerHTML = '';
    obj.forEach(function (item) {
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
        // const urlRelatedInfo = `${BASE_URL}/comics/${item.id}/characters?ts=1&apikey=${API_KEY}&hash=${HASH}`
        // //fetchRelatedInfoComic(urlRelatedInfo, 'comics', 0)
        // fetchRelatedInfoComic(urlRelatedInfo, 'comics', 0)
    });
    resultsGrid.style.justifyContent = 'start';
};
