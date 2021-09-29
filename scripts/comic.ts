//FUNCION DISPLAY GRILLA DE COMICS
const comics = document.getElementsByClassName("comic__results");

const displayComics = (obj, offset) => {
    const resultsGrid = document.getElementById('resultsGrid')
    resultsGrid.innerHTML = " ";
    
    obj.forEach((item: Comic) => {
        
        const comicCover = createNode('img', { src: `${item.thumbnail.path}.${item.thumbnail.extension}`, alt: `${item.title}`, class: "comics" , id: `${item.id}`});
        const divCover = createNode('div', { class: "comics" }, comicCover)
        const comicTitle = createNode('h3', { class: 'h3' }, document.createTextNode(item.title))
        const divTitle = createNode('div', { class: "comic-results-title" }, comicTitle)
        const divComic = createNode('div', { class: "comic__results", href: `./index.html?title=${item.title}&id=${item.id}&offset=${offset}` }, divCover, divTitle)
        resultsGrid.appendChild(divComic)
        
        for (let i = 0; i < comics.length; i++) {
            comics[i].addEventListener('click', handleSelectedItem)
        
        }
        
    });  

}

//FUNCION DISPLAY COMIC SELECCIONADO
const displaySelectedComic = () => {
    const { id, type } = getParams()
    const resultsGrid = document.getElementById('resultsGrid')
    const comicSelected = document.getElementById('comicSelected')
    const characterSelected = document.getElementById('characterSelected');
    comicSelected.innerHTML = ''
    characterSelected.innerHTML = ''

    fetch(`${BASE_URL}/${type}/${id}?ts=1&apikey=${API_KEY}&hash=${HASH}`)
    .then((response) => {    
    return response.json()    
    })
        .then(rta => {    
        const item: Comic = rta.data.results[0]
           
        const comicCover = createNode('img', { src: `${item.thumbnail.path}.${item.thumbnail.extension}`, alt: `${item.title}`, class:"comic__cover" });
        const divCover = createNode('div', { class: "comic__cover" }, comicCover)
        const comicTitle = createNode('h2', { class: "comic__title" }, document.createTextNode(`${item.title}`))
        const publishedTitle = createNode('h3', { class: "h3" }, document.createTextNode('Publicado:'))
        const date = new Intl.DateTimeFormat('es-AR').format(
        new Date(parseInt(item.dates.find(date => date.type === 'onsaleDate').date)));
        const publishedDate = createNode('p', { class: "comic__published" }, document.createTextNode(date))
        const writersTitle = createNode('h3', { class: "h3" }, document.createTextNode('Guionistas:'))
        let writers=[]
        for (const prop in item.creators.items) {
            writers.push(item.creators.items[prop].name)
            }
        let comicWriters = createNode('p', { class: "comic__writers" }, document.createTextNode(writers.toString()))
        const descriptionTitle = createNode('h3', { class: "h3" }, document.createTextNode('Descripción:'))
        const comicDescription = createNode('p', { class: "comic__description" }, document.createTextNode(`${item.description || ""}`))
        const comicDetail = createNode('div', { class: "comic__detail" }, comicTitle, publishedTitle, publishedDate, writersTitle, comicWriters, descriptionTitle, comicDescription )
        comicSelected.appendChild(divCover)
        comicSelected.appendChild(comicDetail)
      
    });  
        resultsGrid.style.justifyContent = 'start'
}

