var fetchRelatedInfoComic = function (url, type, offset) {
    fetch(url)
        .then(function (response) {
        return response.json();
    })
        .then(function (rta) {
        var results = rta.data.results;
        var total = rta.data.total;
        if (type === 'comics') {
            displayCharacters(results, offset);
        }
        else if (type === 'characters') {
            displayComics(results, offset);
        }
        resultsCounter(total);
        disableButtons(offset, total);
        var lastButton = document.getElementById("btnEnd");
        lastButton.dataset.lastpage = Math.ceil(total / rta.data.limit).toString();
    });
};
