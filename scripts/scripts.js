var API_KEY = '42ae3fcea4ffd21315989c5e0dee4006';
var BASE_URL = 'https://gateway.marvel.com/v1/public';
var HASH = '5e2b4e7a9678fe99d5424aad34d696f1';
var offset = 0;
var resultCounter = 0;
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
var resultsCounter = function (obj) {
    var counter = document.getElementById('resultsCounter');
    counter.innerHTML = "" + obj.data.total;
};
//PAGINACION
var btnStart = document.getElementById('btnStart');
var btnBackward1 = document.getElementById('btnBackward1');
var btnEnd = document.getElementById('btnEnd');
var btnForward1 = document.getElementById('btnForward1');
var pagination = function (e) {
    var selected = e.target;
    var page = selected.value;
    switch (page) {
        case "start":
            console.log('start');
            offset = 0;
            return fetch(BASE_URL + "/comics?ts=1&apikey=" + API_KEY + "&hash=" + HASH + "&offset=" + offset)
                .then(function (response) {
                return response.json();
            })
                .then(function (rta) {
                var results = rta.data.results;
                displayComics(results);
                resultsCounter(rta);
                //displaySelectedComic(comics)                    
            });
        case "backward1":
            console.log('backward1');
            offset -= 20;
            return fetch(BASE_URL + "/comics?ts=1&apikey=" + API_KEY + "&hash=" + HASH + "&offset=" + offset)
                .then(function (response) {
                return response.json();
            })
                .then(function (rta) {
                var results = rta.data.results;
                displayComics(results);
                resultsCounter(rta);
                //displaySelectedComic(comics)                    
            });
        case "forward1":
            console.log('forward1');
            offset += 20;
            return fetch(BASE_URL + "/comics?ts=1&apikey=" + API_KEY + "&hash=" + HASH + "&offset=" + offset)
                .then(function (response) {
                return response.json();
            })
                .then(function (rta) {
                var results = rta.data.results;
                displayComics(results);
                resultsCounter(rta);
                //displaySelectedComic(comics)
            });
        case "end":
            console.log('end');
            offset -= 20;
            return fetch(BASE_URL + "/comics?ts=1&apikey=" + API_KEY + "&hash=" + HASH + "&offset=" + offset)
                .then(function (response) {
                return response.json();
            })
                .then(function (rta) {
                var results = rta.data.results;
                displayComics(results);
                resultsCounter(rta);
                //displaySelectedComic(comics)                    
            });
        default:
            console.log("default");
    }
};
btnStart.addEventListener('click', pagination);
btnBackward1.addEventListener('click', pagination);
btnEnd.addEventListener('click', pagination);
btnForward1.addEventListener('click', pagination);
