//PETICION COMICS
var urlComic = BASE_URL + "/comics?ts=1&apikey=" + API_KEY + "&hash=" + HASH;
//PETICION COMICS
// const fetchComics = (offset) => {
//     fetch(`${BASE_URL}/comics?ts=1&apikey=${API_KEY}&hash=${HASH}&offset=${offset}`)
//     .then((response) => {
//        return response.json()
//    })
//     .then(rta => {
//         const comics = rta.data.results
//         const total = rta.data.total
//         displayComics(comics, offset)
//         resultsCounter(total)
//         disableButtons(offset, total)
//     })
// }
var fetchMarvel = function (offset) {
    var title = searchInput.value;
    var type = searchType.value;
    var sort = sortSsearch.value;
    if (type === 'comics') {
        fetch(BASE_URL + "/" + type + "?ts=1&apikey=" + API_KEY + "&hash=" + HASH + "&offset=" + offset + "&" + sort)
            .then(function (response) {
            return response.json();
        })
            .then(function (rta) {
            var results = rta.data.results;
            var total = rta.data.total;
            displayComics(results, offset);
            resultsCounter(total);
            disableButtons(offset, total);
        });
    }
    else if (type === 'characters') {
        fetch(BASE_URL + "/" + type + "?ts=1&apikey=" + API_KEY + "&hash=" + HASH + "&offset=" + offset)
            .then(function (response) {
            return response.json();
        })
            .then(function (rta) {
            var results = rta.data.results;
            var total = rta.data.total;
            displayCharacters(results, offset);
            resultsCounter(total);
            disableButtons(offset, total);
        });
    }
};
fetchMarvel(0);
//FUNCION DISPLAY GRILLA DE COMICS
var comics = document.getElementsByClassName("comic__results");
var displayComics = function (obj, offset) {
    var resultsGrid = document.getElementById('resultsGrid');
    resultsGrid.innerHTML = " ";
    obj.forEach(function (item) {
        var comicCover = createNode('img', { src: item.thumbnail.path + "." + item.thumbnail.extension, alt: "" + item.title, "class": "comic-results-cover", id: "" + item.id });
        var divCover = createNode('div', { "class": "comic-results-cover" }, comicCover);
        var comicTitle = createNode('h3', { "class": 'h3' }, document.createTextNode(item.title));
        var divTitle = createNode('div', { "class": "comic-results-title" }, comicTitle);
        var divComic = createNode('div', { "class": "comic__results", href: "./index.html?title=" + item.title + "&id=" + item.id + "&offset=" + offset }, divCover, divTitle);
        resultsGrid.appendChild(divComic);
        for (var i = 0; i < comics.length; i++) {
            comics[i].addEventListener('click', displaySelectedComic);
        }
    });
};
var displaySelectedComic = function (e) {
    var comicSelectedId = e.target.id;
    var comicSelected = document.getElementById('comicSelected');
    var resultsSection = document.getElementById('resultsSection');
    console.log(comicSelectedId);
    setTimeout(function () {
        fetch(BASE_URL + "/comics/" + comicSelectedId + "?ts=1&apikey=" + API_KEY + "&hash=" + HASH)
            .then(function (response) {
            return response.json();
        })
            .then(function (rta) {
            var selectedComic = rta.data.results[0];
            var comicCover = createNode('img', { src: selectedComic.thumbnail.path + "." + selectedComic.thumbnail.extension, alt: "" + selectedComic.title, "class": "comic__cover" });
            var divCover = createNode('div', { "class": "comic__cover" }, comicCover);
            var comicTitle = createNode('h2', { "class": "comic__title" }, document.createTextNode("" + selectedComic.title));
            var publishedTitle = createNode('h3', { "class": "h3" }, document.createTextNode('Publicado:'));
            var date = new Intl.DateTimeFormat('es-AR').format(new Date(parseInt(selectedComic.dates.find(function (date) { return date.type === 'onsaleDate'; }).date)));
            var publishedDate = createNode('p', { "class": "comic__published" }, document.createTextNode(date));
            var writersTitle = createNode('h3', { "class": "h3" }, document.createTextNode('Guionistas:'));
            var writers = [];
            for (var prop in selectedComic.creators.items) {
                writers.push(selectedComic.creators.items[prop].name);
            }
            var comicWriters = createNode('p', { "class": "comic__writers" }, document.createTextNode(writers.toString()));
            var descriptionTitle = createNode('h3', { "class": "h3" }, document.createTextNode('Descripción:'));
            var comicDescription = createNode('p', { "class": "comic__description" }, document.createTextNode("" + (selectedComic.description || "")));
            var comicDetail = createNode('div', { "class": "comic__detail" }, comicTitle, publishedTitle, publishedDate, writersTitle, comicWriters, descriptionTitle, comicDescription);
            comicSelected.appendChild(divCover);
            comicSelected.appendChild(comicDetail);
        });
        resultsSection.setAttribute('hidden', 'true');
    }, 2000);
};
