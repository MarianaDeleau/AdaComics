var API_KEY = '42ae3fcea4ffd21315989c5e0dee4006';
var BASE_URL = 'https://gateway.marvel.com/v1/public';
var HASH = '5e2b4e7a9678fe99d5424aad34d696f1';
var offset = 0;
var resultCounter = 0;
var params = new URLSearchParams(window.location.search);
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
var btnStart = document.getElementById('btnStart');
var btnPreviousPage = document.getElementById('previousPage');
var btnEnd = document.getElementById('btnEnd');
var btnNextPage = document.getElementById('nextPage');
// const pagination = (e) => {
//     const selected = e.target
//     const page = selected.value
//     switch (page) {        
//         case "start":
//                 offset = 0;        
//                 console.log(offset)
//             return fetchComics(offset)
//             //return fetchCharacter(offset)
//         case "previousPage":
//                 offset -= 20
//                 console.log(offset)
//                 return fetchComics(offset)
//                 //return fetchCharacter(offset)
//         case "nextPage":
//                 offset += 20
//                 console.log(offset)
//                 return fetchComics(offset)
//                 //return fetchCharacter(offset)
//         case "end":
//             return fetch(`${BASE_URL}/comics?ts=1&apikey=${API_KEY}&hash=${HASH}`)
//             //return fetch(`${BASE_URL}/characters?ts=1&apikey=${API_KEY}&hash=${HASH}`)
//                 .then((response) => {
//                     return response.json()
//                 })
//                 .then(rta => {
//                     const total = rta.data.total
//                     offset = total - ((total % 20))
//                     console.log(offset)
//                     return fetchComics(offset)  
//                     //return fetchCharacter(offset)
//                 })
//         default:
//             console.log("default");
//     }
// }
var searchType = document.getElementById('search__type');
var pagination = function (e) {
    var selected = e.target;
    var page = selected.value;
    var typeValue = searchType.value;
    console.log(typeValue);
    if (typeValue === 'comics') {
        switch (page) {
            case "start":
                offset = 0;
                return fetchComics(offset);
            case "previousPage":
                offset -= 20;
                return fetchComics(offset);
            case "nextPage":
                offset += 20;
                return fetchComics(offset);
            case "end":
                return fetch(BASE_URL + "/comics?ts=1&apikey=" + API_KEY + "&hash=" + HASH)
                    .then(function (response) {
                    return response.json();
                })
                    .then(function (rta) {
                    var total = rta.data.total;
                    offset = total - ((total % 20));
                    return fetchComics(offset);
                });
            default:
                offset = 0;
                return fetchComics(offset);
        }
    }
    else if (typeValue === 'personajes') {
        switch (page) {
            case "start":
                offset = 0;
                return fetchCharacter(offset);
            case "previousPage":
                offset -= 20;
                return fetchCharacter(offset);
            case "nextPage":
                offset += 20;
                return fetchCharacter(offset);
            case "end":
                return fetch(BASE_URL + "/characters?ts=1&apikey=" + API_KEY + "&hash=" + HASH)
                    .then(function (response) {
                    return response.json();
                })
                    .then(function (rta) {
                    var total = rta.data.total;
                    offset = total - ((total % 20));
                    return fetchCharacter(offset);
                });
            default:
                offset = 0;
                return fetchCharacter(offset);
        }
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
//const searchForm = document.getElementById('searchForm')
var searchBtn = document.getElementById('search__button');
var setHomeParams = function (e) {
    e.preventDefault();
    // const searchInput = document.getElementById('search__input');
    // const searchType = document.getElementById('search__type');
    // const sortSearch = document.getElementById('sort__search');
    // // params.set('search', searchInput.value)
    // // params.set('type', searchType.value)
    // // params.set('sort', sortSearch.value)
    // console.log(params)
    window.location.href = window.location.pathname + "?" + params.toString();
};
searchBtn.addEventListener('submit', setHomeParams);
