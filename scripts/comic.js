//PETICION
var urlToFetch = '';
var getParams = function (offset) {
    var params = new URLSearchParams(window.location.search);
    var type = params.get('type') ? params.get('type') : searchType.value;
    var sort = params.get('orderBy') ? params.get('orderBy') : getSortValue();
    var input = searchInput.value;
    offset = params.get('offset') ? params.get('offset') : offset;
    urlToFetch = BASE_URL + "/" + type + "?ts=1&apikey=" + API_KEY + "&hash=" + HASH + "&offset=" + offset + "&" + sort;
    if (input) {
        return urlToFetch += inputToSearch(type, input);
    }
    else {
        return urlToFetch += '';
    }
    //ADRI
    //let url = '';
    // //if (!params.get('page'))
    // url += params.get('page') || 1
    // url += params.get('type') || searchType.value;
    // url += params.get('orderBy') || sortSearch.value;
    // url += params.get('titleStartsWith') || params.get('nameStartsWith') || searchInput.value;
    // url += params.get('offset') || 0;
};
console.log(urlToFetch);
var fetchMarvel = function (offset, url) {
    fetch(url)
        .then(function (response) {
        return response.json();
    })
        .then(function (rta) {
        var results = rta.data.results;
        var total = rta.data.total;
        if (searchType.value === 'comics') {
            displayComics(results, offset);
        }
        else if (searchType.value === 'characters') {
            displayCharacters(results, offset);
        }
        resultsCounter(total);
        disableButtons(offset, total);
    });
};
fetchMarvel(0, getParams(0));
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
//FUNCION DISPLAY COMIC SELECCIONADO
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
