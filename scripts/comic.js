var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
//CAPTURAR QUERY PARAMS
var getParams = function () {
    var params = new URLSearchParams(window.location.search);
    var type = params.get('search__type') || 'comics';
    var sort = params.get('sort__search') || '';
    var input = params.get('search__input');
    var page = Number(params.get('page')) || '1';
    return { type: type, sort: sort, input: input, page: page };
};
//PETICION MARVEL
var fetchMarvel = function (offset, url, type) {
    fetch(url)
        .then(function (response) {
        return response.json();
    })
        .then(function (rta) {
        var results = rta.data.results;
        var total = rta.data.total;
        if (type === 'comics') {
            displayComics(results, offset);
        }
        else if (type === 'characters') {
            displayCharacters(results, offset);
        }
        resultsCounter(total);
        disableButtons(offset, total);
        var lastButton = document.getElementById("btnEnd");
        lastButton.dataset.lastpage = Math.round(total / rta.data.limit).toString();
    });
};
//INCIO PAGINA
var init = function () {
    var _a = getParams(), type = _a.type, input = _a.input, sort = _a.sort, page = _a.page;
    offset = page * 20 - 20;
    var url = BASE_URL + "/" + type + "?ts=1&apikey=" + API_KEY + "&hash=" + HASH + "&orderBy=" + sort + "&offset=" + offset;
    if (input) {
        url += inputToSearch(type, input);
    }
    fetchMarvel(offset, url, type);
    changeSelect();
};
init();
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
var displaySelectedComic = function (e) { return __awaiter(_this, void 0, void 0, function () {
    var comicSelectedId, comicSelected, resultsSection;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                comicSelectedId = e.target.id;
                comicSelected = document.getElementById('comicSelected');
                resultsSection = document.getElementById('resultsSection');
                console.log(comicSelectedId);
                return [4 /*yield*/, fetch(BASE_URL + "/comics/" + comicSelectedId + "?ts=1&apikey=" + API_KEY + "&hash=" + HASH)
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
                    })];
            case 1:
                _a.sent();
                resultsSection.setAttribute('hidden', 'true');
                return [2 /*return*/];
        }
    });
}); };
