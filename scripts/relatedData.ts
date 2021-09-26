// const fetchRelatedInfo = (url, type) => {
//     fetch(url)
//         .then((response) => {
//             return response.json()
//         })
//          .then(rta => {
//              const results = rta.data.results
//              const total = rta.data.total
//              if (type === 'comics') {
//                 displayComics(results, offset)
//              } else if (type === 'characters') {
//                 displayCharacters(results, offset)
//              }
//              resultsCounter(total)
//              disableButtons(offset, total)
             
//              const lastButton = document.getElementById("btnEnd");
//              lastButton.dataset.lastpage = Math.ceil(total / rta.data.limit).toString();
       
//          })
// }
