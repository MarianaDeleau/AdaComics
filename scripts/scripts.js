var API_KEY = '42ae3fcea4ffd21315989c5e0dee4006';
var BASE_URL = 'https://gateway.marvel.com/v1/public';
var HASH = '5e2b4e7a9678fe99d5424aad34d696f1';
var offset = 0;
var resultCounter = 0;
//const params = new URLSearchParams(window.location.search);
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
var previousPage = document.getElementById('previousPage');
var btnEnd = document.getElementById('btnEnd');
var nextPage = document.getElementById('nextPage');
// const pagination = (e) => {
//     const selected = e.target
//     const page = selected.value
//     switch (page) {        
//         case "start":
//                 console.log('start');
//                 offset = 0;
//                 return fetch(`${BASE_URL}/comics?ts=1&apikey=${API_KEY}&hash=${HASH}&offset=${offset}`)
//                 .then((response) => {               
//                     return response.json()               
//                 })
//                 .then(rta => {
//                     const results = rta.data.results
//                     const total = rta.data.total
//                     const offset = rta.data.offset
//                     displayComics(results, offset)
//                     resultsCounter(total)                   
//                 });
//         case "backward1":
//                 console.log('backward1');
//                 offset-=20
//                 return fetch(`${BASE_URL}/comics?ts=1&apikey=${API_KEY}&hash=${HASH}&offset=${offset}`)
//                 .then((response) => {
//                     return response.json()
//                 })
//                 .then(rta => {
//                     const results = rta.data.results
//                     const total = rta.data.total
//                     const offset = rta.data.offset
//                     displayComics(results, offset)
//                     resultsCounter(total)                  
//                 });
//         case "forward1":
//                 console.log('forward1');
//                 offset+=20
//                 return fetch(`${BASE_URL}/comics?ts=1&apikey=${API_KEY}&hash=${HASH}&offset=${offset}`)
//                 .then((response) => {               
//                 return response.json()               
//                 })
//                 .then(rta => {
//                     const results = rta.data.results
//                     const total = rta.data.total
//                     const offset = rta.data.offset
//                     displayComics(results, offset)
//                     resultsCounter(total)     
//                 });
//         case "end":
//                 console.log('end');
//                 return fetch(`${BASE_URL}/comics?ts=1&apikey=${API_KEY}&hash=${HASH}`)
//                 .then((response) => {
//                     return response.json()
//                 })
//                 .then(rta => {
//                     const total = rta.data.total
//                     offset = total - ((total % 20))
//                     return fetch(`${BASE_URL}/comics?ts=1&apikey=${API_KEY}&hash=${HASH}&offset=${offset}`)
//                 })
//                 .then((response) => {
//                     return response.json()
//                     })
//                 .then(data => {
//                     const results = data.data.results
//                     displayComics(results, offset)
//                     //resultsCounter(data)       
//                 })
//         default:
//             console.log("default");
//         }
// }
var pagination = function (e) {
    var selected = e.target;
    var page = selected.value;
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
            console.log("default");
    }
};
btnStart.addEventListener('click', pagination);
previousPage.addEventListener('click', pagination);
btnEnd.addEventListener('click', pagination);
nextPage.addEventListener('click', pagination);
