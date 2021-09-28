var API_KEY = '42ae3fcea4ffd21315989c5e0dee4006';
var BASE_URL = 'https://gateway.marvel.com/v1/public';
var HASH = '5e2b4e7a9678fe99d5424aad34d696f1';
var offset = 0;
var resultCounter = 0;
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
//CAPTURAR QUERY PARAMS
var getParams = function () {
    var params = new URLSearchParams(window.location.search);
    var type = params.get('search__type') || 'comics';
    var sort = params.get('sort__search') || '';
    var input = params.get('search__input');
    var page = Number(params.get('page')) || '1';
    var id = params.get('id'); //agregado prueba
    return { type: type, sort: sort, input: input, page: page, id: id };
};
//PETICION MARVEL
var fetchMarvel = function (offset, url, type, id) {
    fetch(url)
        .then(function (response) {
        return response.json();
    })
        .then(function (rta) {
        var results = rta.data.results;
        var total = rta.data.total;
        if (!id) {
            if (type === 'comics') {
                displayComics(results, offset);
            }
            else if (type === 'characters') {
                displayCharacters(results, offset);
            }
        }
        else {
            if (type === 'comics') {
                displayCharacters(results, offset);
                //displaySelectedComic(results)
            }
            else if (type === 'characters') {
                displayComics(results, offset);
                // displaySelectedCharacter(results)
            }
        }
        resultsCounter(total);
        disableButtons(offset, total);
        var lastButton = document.getElementById("btnEnd");
        lastButton.dataset.lastpage = Math.ceil(total / rta.data.limit).toString();
    });
};
//FILTROS A TRAVES DE QUERY PARAMS
var handleSearchSubmit = function (event) {
    //event.preventDefault()
    var form = event.target;
    var params = new URLSearchParams(window.location.search);
    params.set('search__input', form.search__input.value);
    params.set('search__type', form.search__type.value);
    params.set('sort__search', form.sort__search.value);
    params.set('page', '1');
    window.location.href = window.location.pathname + "?" + params.toString();
};
//FILTROS A TRAVES DE ID EN QUERY PARAMS
var handleSelectedItem = function (event) {
    var itemSelected = event.target;
    var params = new URLSearchParams(window.location.search);
    params.set('id', itemSelected.id);
    params.set('search__type', (itemSelected.getAttribute('class')));
    //  params.set('sort__search', sortSearch.value)
    params.set('search__input', "");
    params.set('page', '1');
    window.location.href = window.location.pathname + "?" + params.toString();
};
//FILTROS A TRAVES DE ID EN QUERY PARAMS
var handleSelectedItemInfo = function () {
    var params = new URLSearchParams(window.location.search);
    var id = params.get('id');
    params.set('id', id);
    params.set('search__type', searchType.value);
    params.set('sort__search', sortSearch.value);
    params.set('page', '1');
    window.location.href = window.location.pathname + "?" + params.toString();
};
//PAGINADO A TRAVES DE QUERY PARAMS
var handlePaginationClick = function (event) {
    var params = new URLSearchParams(window.location.search);
    var page = Number(params.get('page'));
    if (!page) {
        params.set('page', '2');
    }
    else {
        switch (event.target.value) {
            case 'start':
                params.set('page', '1');
                break;
            case 'previousPage':
                params.set('page', page - 1);
                break;
            case 'nextPage':
                params.set('page', page + 1);
                break;
            case 'end':
                params.set('page', event.target.dataset.lastpage);
                break;
            default: break;
        }
    }
    window.location.href = window.location.pathname + "?" + params.toString();
};
searchForm.addEventListener('submit', handleSearchSubmit);
btnStart.addEventListener('click', handlePaginationClick);
btnPreviousPage.addEventListener('click', handlePaginationClick);
btnEnd.addEventListener('click', handlePaginationClick);
btnNextPage.addEventListener('click', handlePaginationClick);
//FUNCION PARA DEFINIR STRING PARA FETCH SEGUN TIPO
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
//FUNCION PARA ACTUALIZAR SELECT SEGUN TIPO 
var changeSelect = function () {
    if (searchType.value === 'comics') {
        sortSearch.innerHTML = '';
        var option1 = createNode('option', { value: 'title' }, document.createTextNode('A-Z'));
        var option2 = createNode('option', { value: '-title' }, document.createTextNode('Z-A'));
        var option3 = createNode('option', { value: '-focDate' }, document.createTextNode('Más nuevos'));
        var option4 = createNode('option', { value: 'focDate' }, document.createTextNode('Más viejos'));
        sortSearch.appendChild(option1);
        sortSearch.appendChild(option2);
        sortSearch.appendChild(option3);
        sortSearch.appendChild(option4);
    }
    if (searchType.value === 'characters') {
        sortSearch.innerHTML = '';
        var option1 = createNode('option', { value: 'name' }, document.createTextNode('A-Z'));
        var option2 = createNode('option', { value: '-name' }, document.createTextNode('Z-A'));
        sortSearch.appendChild(option1);
        sortSearch.appendChild(option2);
    }
};
searchType.addEventListener('change', changeSelect);
changeSelect();
//DEFINE EL VALOR DEL SELECT TYPE POR QUERY PARAMS
var setTypeSelectValue = function () {
    var type = getParams().type;
    if (type === 'characters') {
        searchType.value = 'characters';
    }
    else if (type === 'character-results-picture') {
        searchType.value = 'characters';
    }
    else {
        searchType.value = 'comics';
    }
};
//setTypeSelectValue()
//INICIO PAGINA
var init = function () {
    var _a = getParams(), type = _a.type, input = _a.input, sort = _a.sort, page = _a.page, id = _a.id;
    var url = '';
    offset = page * 20 - 20;
    if (id) {
        if (type === 'comics') {
            url = BASE_URL + "/comics/" + id + "/characters?ts=1&apikey=" + API_KEY + "&hash=" + HASH + "&orderBy=name&offset=" + offset;
        }
        else if (type === 'characters') {
            url = BASE_URL + "/characters/" + id + "/comics?ts=1&apikey=" + API_KEY + "&hash=" + HASH + "&orderBy=title&offset=" + offset;
        }
    }
    else if (!id) {
        url = BASE_URL + "/" + type + "?ts=1&apikey=" + API_KEY + "&hash=" + HASH + "&orderBy=" + sort + "&offset=" + offset;
    }
    if (input) {
        url += inputToSearch(type, input);
    }
    fetchMarvel(offset, url, type, id);
    setTypeSelectValue();
    changeSelect();
};
init();
