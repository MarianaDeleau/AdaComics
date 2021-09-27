const fetchRelatedInfoComic = (url, type) => {
    fetch(url)
      .then((response) => {
          return response.json()
      })
       .then(rta => {
           const results = rta.data.results
           const total = rta.data.total
           if (type === 'comics') {
              displayCharacters(results, offset)
           } else if (type === 'characters') {
              displayComics(results, offset)
           }
           resultsCounter(total)
           disableButtons(offset, total)
           const lastButton = document.getElementById("btnEnd");
           lastButton.dataset.lastpage = Math.ceil(total / rta.data.limit).toString();
     
       })
}
