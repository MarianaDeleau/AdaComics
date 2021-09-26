//FUNCION DISPLAY GRILLA DE COMICS
const comics = document.getElementsByClassName("comic__results");

const displayComics = (obj, offset) => {

    const resultsGrid = document.getElementById('resultsGrid')
    resultsGrid.innerHTML = " ";
    
    obj.forEach((item: Comic) => {
        
        const comicCover = createNode('img', { src: `${item.thumbnail.path}.${item.thumbnail.extension}`, alt: `${item.title}`, class: "comic-results-cover" , id: `${item.id}`});
        const divCover = createNode('div', { class: "comic-results-cover" }, comicCover)
        const comicTitle = createNode('h3', { class: 'h3' }, document.createTextNode(item.title))
        const divTitle = createNode('div', { class: "comic-results-title" }, comicTitle)
        const divComic = createNode('div', { class: "comic__results", href: `./index.html?title=${item.title}&id=${item.id}&offset=${offset}` }, divCover, divTitle)
        resultsGrid.appendChild(divComic)
        for (let i = 0; i < comics.length; i++) {
            comics[i].addEventListener('click', displaySelectedComic)
            //comics[i].addEventListener('click', handleSelectedItem)
        }
        
    });  

}

//FUNCION DISPLAY COMIC SELECCIONADO
const displaySelectedComic = async (e) => {
    // const params = new URLSearchParams(window.location.search)
    // const id = params.get('id')

    const comicSelectedId = e.target.id
    const comicSelected = document.getElementById('comicSelected')
    const resultsGrid = document.getElementById('resultsGrid')
   
    await fetch(`${BASE_URL}/comics/${comicSelectedId}?ts=1&apikey=${API_KEY}&hash=${HASH}`)
    .then((response) => {
    
    return response.json()
    
    })
        .then(rta => {
    
        const selectedComic: Comic = rta.data.results[0]
            
        const comicCover = createNode('img', { src: `${selectedComic.thumbnail.path}.${selectedComic.thumbnail.extension}`, alt: `${selectedComic.title}`, class:"comic__cover" });
        const divCover = createNode('div', { class: "comic__cover" }, comicCover)
        const comicTitle = createNode('h2', { class: "comic__title" }, document.createTextNode(`${selectedComic.title}`))
        const publishedTitle = createNode('h3', { class: "h3" }, document.createTextNode('Publicado:'))
        const date = new Intl.DateTimeFormat('es-AR').format(
        new Date(parseInt(selectedComic.dates.find(date => date.type === 'onsaleDate').date)));
        const publishedDate = createNode('p', { class: "comic__published" }, document.createTextNode(date))
        const writersTitle = createNode('h3', { class: "h3" }, document.createTextNode('Guionistas:'))
        let writers=[]
        for (const prop in selectedComic.creators.items) {
            writers.push(selectedComic.creators.items[prop].name)
            }
        let comicWriters = createNode('p', { class: "comic__writers" }, document.createTextNode(writers.toString()))
        const descriptionTitle = createNode('h3', { class: "h3" }, document.createTextNode('Descripción:'))
        const comicDescription = createNode('p', { class: "comic__description" }, document.createTextNode(`${selectedComic.description || ""}`))
        const comicDetail = createNode('div', { class: "comic__detail" }, comicTitle, publishedTitle, publishedDate, writersTitle, comicWriters, descriptionTitle, comicDescription )
        comicSelected.appendChild(divCover)
        comicSelected.appendChild(comicDetail)
            
        const urlRelatedInfo = `${BASE_URL}/comics/${comicSelectedId}/characters?ts=1&apikey=${API_KEY}&hash=${HASH}`
           
        fetchRelatedInfoComic(urlRelatedInfo, 'comics')
            
            })        
    resultsGrid.style.justifyContent = 'start'
    
}

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



// window.onload = function () {
//     displaySelectedComic()
//     fetchRelatedInfoComic()
// }