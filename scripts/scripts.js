var API_KEY = '42ae3fcea4ffd21315989c5e0dee4006';
var BASE_URL = 'https://gateway.marvel.com/v1/public';
var HASH = '5e2b4e7a9678fe99d5424aad34d696f1';
var offset = 0;
var resultCounter = 0;
var params = new URLSearchParams(window.location.search);
var searchForm = document.getElementById('searchForm');
var searchInput = document.getElementById('search__input');
var searchType = document.getElementById('search__type');
var sortSearch = document.getElementById('sort__search');
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
    switch (page) {
        case "start":
            offset = 0;
            urlToFetch = getParams(offset);
            return fetchMarvel(offset, urlToFetch);
        case "previousPage":
            offset -= 20;
            urlToFetch = getParams(offset);
            return fetchMarvel(offset, urlToFetch);
        case "nextPage":
            offset += 20;
            urlToFetch = getParams(offset);
            return fetchMarvel(offset, urlToFetch);
        case "end":
            return fetch(getParams(0))
                .then(function (response) {
                return response.json();
            })
                .then(function (rta) {
                var total = rta.data.total;
                console.log(total);
                offset = total - ((total % 20));
                urlToFetch = getParams(offset);
                return fetchMarvel(offset, urlToFetch);
            });
        default:
            offset = 0;
            urlToFetch = getParams(offset);
            return fetchMarvel(offset, urlToFetch);
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
    fetchMarvel(0, getParams(0));
};
searchBtn.addEventListener('click', filter);
//SETEAR PARAMS
var setParams = function () {
    //e.preventDefault();
    params.set('titleStartsWith', searchInput.value);
    params.set('type', searchType.value);
    params.set('orderBy', sortSearch.value);
    params.set('page', '99');
    params.set('offset', offset);
    window.location.href = window.location.pathname + "?" + params.toString();
};
console.log(window.location.href);
//searchBtn.addEventListener('click', setParams)
var getSortValue = function () {
    var sort = sortSearch.value;
    var sortToSearch = '';
    switch (sort) {
        case "orderBy=title":
            sortToSearch = searchType.value === 'comics' ? "orderBy=title" : "orderBy=name";
            return sortToSearch;
        case "orderBy=-title":
            sortToSearch = searchType.value === 'comics' ? "orderBy=-title" : "orderBy=-name";
            return sortToSearch;
        case "orderBy=-onsaleDate":
            sortToSearch = searchType.value === 'comics' ? "orderBy=-onsaleDate" : "orderBy=-modified";
            return sortToSearch;
        case "orderBy=onsaleDate":
            sortToSearch = searchType.value === 'comics' ? "orderBy=onsaleDate" : "orderBy=modified";
        default:
            return sortToSearch;
    }
};
var inputToSearch = function (type, input) {
    var wordToSearch = '';
    if (input) {
        if (type === 'comics') {
            wordToSearch += "&titleStartsWith=" + input;
        }
        else if (type === 'characters') {
            wordToSearch += "&nameStartsWith=" + input;
        }
    }
    return wordToSearch;
};
