//PETICION COMICS

const urlComic: string = `${BASE_URL}/comics?ts=1&apikey=${API_KEY}&hash=${HASH}`

//PETICION COMICS
// const fetchComics = (offset) => {

//     fetch(`${BASE_URL}/comics?ts=1&apikey=${API_KEY}&hash=${HASH}&offset=${offset}`)
//     .then((response) => {
       
//        return response.json()
       
//    })
//     .then(rta => {
//         const comics = rta.data.results
//         const total = rta.data.total
//         displayComics(comics, offset)
//         resultsCounter(total)
//         disableButtons(offset, total)
    
//     })

// }

const fetchMarvel = (offset) => {

    const type = searchType.value
    const sort = sortSsearch.value
    if (type === 'comics') {
        fetch(`${BASE_URL}/${type}?ts=1&apikey=${API_KEY}&hash=${HASH}&offset=${offset}&${sort}`)
        .then((response) => {
            return response.json()
        })
         .then(rta => {
             const results = rta.data.results
             const total = rta.data.total
             displayComics(results, offset)
             resultsCounter(total)
             disableButtons(offset, total)
         })
        
    } else if (type === 'characters') {
        fetch(`${BASE_URL}/${type}?ts=1&apikey=${API_KEY}&hash=${HASH}&offset=${offset}`)
    .then((response) => {
       return response.json()
   })
    .then(rta => {
        const results = rta.data.results
        const total = rta.data.total
        displayCharacters(results, offset)
        resultsCounter(total)
        disableButtons(offset, total)
    })
}
}

fetchMarvel(0)

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
        }
        
    });  
     
  
}

const displaySelectedComic = (e) => {
    
    const comicSelectedId = e.target.id
    const comicSelected = document.getElementById('comicSelected')
    const resultsSection = document.getElementById('resultsSection')
    console.log(comicSelectedId)

    setTimeout(() => {
        
        fetch(`${BASE_URL}/comics/${comicSelectedId}?ts=1&apikey=${API_KEY}&hash=${HASH}`)
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
            })        
    resultsSection.setAttribute('hidden', 'true')
    }, 2000)
    
}




