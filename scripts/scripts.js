var API_KEY = '42ae3fcea4ffd21315989c5e0dee4006';
var BASE_URL = 'https://gateway.marvel.com/v1/public';
var HASH = '5e2b4e7a9678fe99d5424aad34d696f1';
var offset = 0;
var resultCounter = 0;
var params = new URLSearchParams(window.location.search);
//const searchForm = document.getElementById('searchForm');
var searchInput = document.getElementById('search__input');
var searchType = document.getElementById('search__type');
var sortSsearch = document.getElementById('sort__search');
var searchBtn = document.getElementById('search__button');
var btnStart = document.getElementById('btnStart');
var btnPreviousPage = document.getElementById('previousPage');
var btnEnd = document.getElementById('btnEnd');
var btnNextPage = document.getElementById('nextPage');
//FUNCION PARA CREAR NODOS
var createNode = function (tag, attr) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    var elem = document.createElement(tag);
    for (var prop in attr) {
        if (prop === "data") {
            for (var dataElement in attr[prop]) {
                elem.dataset[dataElement] = attr[prop][dataElement];
            }
        }
        else {
            elem.setAttribute(prop, attr[prop]);
        }
    }
    for (var _a = 0, children_1 = children; _a < children_1.length; _a++) {
        var child = children_1[_a];
        elem.appendChild(child);
    }
    return elem;
};
//CONTADOR DE RESULTADOS
var resultsCounter = function (total) {
    var counter = document.getElementById('resultsCounter');
    counter.innerHTML = total;
};
//PAGINACION
var pagination = function (e) {
    var selected = e.target;
    var page = selected.value;
    var title = searchInput.value;
    var type = searchType.value;
    switch (page) {
        case "start":
            offset = 0;
            return filter(offset);
        case "previousPage":
            offset -= 20;
            return filter(offset);
        case "nextPage":
            offset += 20;
            return filter(offset);
        case "end":
            if (type === 'comics') {
                return fetch(BASE_URL + "/" + type + "?ts=1&apikey=" + API_KEY + "&hash=" + HASH + "&titleStartsWith=" + (title || 'a'))
                    .then(function (response) {
                    return response.json();
                })
                    .then(function (rta) {
                    var total = rta.data.total;
                    console.log(total);
                    offset = total - ((total % 20));
                    return filter(offset);
                });
            }
            else if (type === 'characters') {
                return fetch(BASE_URL + "/" + type + "?ts=1&apikey=" + API_KEY + "&hash=" + HASH + "&nameStartsWith=" + (title || 'a'))
                    .then(function (response) {
                    return response.json();
                })
                    .then(function (rta) {
                    var total = rta.data.total;
                    console.log(total);
                    offset = total - ((total % 20));
                    return filter(offset);
                });
            }
        default:
            offset = 0;
            return filter(offset);
    }
};
btnStart.addEventListener('click', pagination);
btnPreviousPage.addEventListener('click', pagination);
btnEnd.addEventListener('click', pagination);
btnNextPage.addEventListener('click', pagination);
searchType.addEventListener('change', pagination);
//FUNCION PARA DESABILITAR BOTONES DE PAGINADO
var disableButtons = function (offset, total) {
    if (offset === 0) {
        btnStart.disabled = true;
        btnStart.style.backgroundColor = 'transparent';
        btnPreviousPage.disabled = true;
        btnPreviousPage.style.backgroundColor = 'transparent';
    }
    else {
        btnStart.disabled = false;
        btnStart.style.backgroundColor = '#FF0000';
        btnPreviousPage.disabled = false;
        btnPreviousPage.style.backgroundColor = '#FF0000';
    }
    if (offset + 20 >= total) {
        btnEnd.disabled = true;
        btnEnd.style.backgroundColor = 'transparent';
        btnNextPage.disabled = true;
        btnNextPage.style.backgroundColor = 'transparent';
    }
    else {
        btnEnd.disabled = false;
        btnEnd.style.backgroundColor = '#FF0000';
        btnNextPage.disabled = false;
        btnNextPage.style.backgroundColor = '#FF0000';
    }
};
//FILTROS
var filter = function () {
    //e.preventDefault();
    var title = searchInput.value;
    var type = searchType.value;
    var sort = sortSsearch.value;
    if (type === 'comics') {
        fetch(BASE_URL + "/" + type + "?ts=1&apikey=" + API_KEY + "&hash=" + HASH + "&offset=" + offset + "&" + sort + "&titleStartsWith=" + (title || 'a'))
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
        fetch(BASE_URL + "/" + type + "?ts=1&apikey=" + API_KEY + "&hash=" + HASH + "&offset=" + offset + "&nameStartsWith=" + (title || 'a'))
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
searchBtn.addEventListener('click', filter);
//SETEAR PARAMS
var setHomeParams = function () {
    //e.preventDefault();
    // const searchInput = document.getElementById('search__input');
    // const searchType = document.getElementById('search__type');
    // const sortSearch = document.getElementById('sort__search');
    // // params.set('search', searchInput.value)
    // // params.set('type', searchType.value)
    // // params.set('sort', sortSearch.value)
    //console.log(params)
    //window.location.href = `${window.location.pathname}?${params.toString()}`
    window.location.href = window.location.pathname + "?";
};
//searchBtn.addEventListener('submit', setHomeParams)
//searchType.addEventListener('change', setHomeParams)
