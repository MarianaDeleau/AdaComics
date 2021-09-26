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
//FUNCION DISPLAY GRILLA DE PERSONAJES
var characters = document.getElementsByClassName("character__results");
var displayCharacters = function (obj, offset) {
    var resultsGrid = document.getElementById('resultsGrid');
    resultsGrid.innerHTML = " ";
    obj.forEach(function (item) {
        var characterPicture = createNode('img', { src: item.thumbnail.path + "." + item.thumbnail.extension, alt: "" + item.name, id: "" + item.id, "class": "character-results-picture" });
        var divPicture = createNode('div', { "class": "character-results-picture" }, characterPicture);
        var characterName = createNode('h3', { "class": 'h3' }, document.createTextNode(item.name));
        var divName = createNode('div', { "class": "character-results-title" }, characterName);
        var divCharacter = createNode('div', { "class": "character__results", href: "./index.html?title=" + item.name + "&id=" + item.id + "&offset=" + offset }, divPicture, divName);
        resultsGrid.appendChild(divCharacter);
        for (var i = 0; i < characters.length; i++) {
            characters[i].addEventListener('click', displaySelectedCharacter);
        }
    });
};
//FUNCION DISPLAY SECCION PERSONAJE
var displaySelectedCharacter = function (e) { return __awaiter(_this, void 0, void 0, function () {
    var characterSelectedId, characterSelected, resultsSection;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                characterSelectedId = e.target.id;
                characterSelected = document.getElementById('characterSelected');
                resultsSection = document.getElementById('resultsSection');
                console.log(characterSelectedId);
                return [4 /*yield*/, fetch(BASE_URL + "/characters/" + characterSelectedId + "?ts=1&apikey=" + API_KEY + "&hash=" + HASH)
                        .then(function (response) {
                        return response.json();
                    })
                        .then(function (rta) {
                        var selectedCharacter = rta.data.results[0];
                        var characterPicture = createNode('img', { src: selectedCharacter.thumbnail.path + "." + selectedCharacter.thumbnail.extension, alt: "" + selectedCharacter.name, "class": "character__picture" });
                        var divPicture = createNode('div', { "class": "character__picture" }, characterPicture);
                        var characterName = createNode('h2', { "class": "character__name" }, document.createTextNode("" + selectedCharacter.name));
                        var characterDescription = createNode('p', { "class": "character__description" }, document.createTextNode("" + selectedCharacter.description));
                        var characterDetail = createNode('div', { "class": "character__detail" }, characterName, characterDescription);
                        characterSelected.appendChild(divPicture);
                        characterSelected.appendChild(characterDetail);
                        var urlRelatedInfo = selectedCharacter.comics.collectionURI;
                        urlRelatedInfo += "?apikey=" + API_KEY;
                        console.log(urlRelatedInfo);
                        fetchRelatedInfoCharacter(urlRelatedInfo, 'character');
                    })
                    // resultsSection.setAttribute('hidden', 'true')
                ];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var fetchRelatedInfoCharacter = function (url) {
    fetch(url)
        .then(function (response) {
        return response.json();
    })
        .then(function (rta) {
        var results = rta.data.results;
        var total = rta.data.total;
        displayComics(results, offset);
        resultsCounter(total);
        disableButtons(offset, total);
        var lastButton = document.getElementById("btnEnd");
        lastButton.dataset.lastpage = Math.ceil(total / rta.data.limit).toString();
    });
};
