//CAPTURAR QUERY PARAMS
const getParams =  () => {
    const params = new URLSearchParams(window.location.search)

    let type = params.get('search__type') || 'comics';
    let sort = params.get('sort__search') || '';
    let input = params.get('search__input');
    let page = Number(params.get('page')) || '1'
   
    return {type, sort, input, page}

  }

  //PETICION MARVEL
const fetchMarvel = (offset, url, type) => {
    fetch(url)
        .then((response) => {
            return response.json()
        })
         .then(rta => {
             const results = rta.data.results
             const total = rta.data.total
             if (type === 'comics') {
                displayComics(results, offset)
             } else if (type === 'characters') {
                displayCharacters(results, offset)
             }
             resultsCounter(total)
             disableButtons(offset, total)
             
             const lastButton = document.getElementById("btnEnd");
             lastButton.dataset.lastpage = Math.round(total / rta.data.limit).toString();
       
         })
}

//INCIO PAGINA
const init = () => {   
    const { type, input, sort, page } = getParams()
    
    offset = page * 20 - 20
    
    let url = `${BASE_URL}/${type}?ts=1&apikey=${API_KEY}&hash=${HASH}&orderBy=${sort}&offset=${offset}`

    if (input) {
        url += inputToSearch(type, input)
    }
    fetchMarvel(offset, url, type)
    changeSelect()
}

init();


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

//FUNCION DISPLAY COMIC SELECCIONADO
const displaySelectedComic = async (e) => {
    
    const comicSelectedId = e.target.id
    const comicSelected = document.getElementById('comicSelected')
    const resultsSection = document.getElementById('resultsSection')
    console.log(comicSelectedId)

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
            })        
    resultsSection.setAttribute('hidden', 'true')
    
}



