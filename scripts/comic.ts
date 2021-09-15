//PETICION COMICS

const urlComic: string = `${BASE_URL}/comics?ts=1&apikey=${API_KEY}&hash=${HASH}`

// fetch(urlComic)
//     .then((response) => {
       
//        return response.json()
       
//    })
//     .then(rta => {
//         const comics = rta.data.results
//         console.log(comics)
//         displayComics(comics)
//         resultsCounter(rta)
//         //displaySelectedComic(comics)
            
//     })
     

//PETICION COMICS
const fetchComics = (offset) => {

    fetch(`${BASE_URL}/comics?ts=1&apikey=${API_KEY}&hash=${HASH}&offset=${offset}`)
    .then((response) => {
       
       return response.json()
       
   })
    .then(rta => {
        const comics = rta.data.results
        const total = rta.data.total
        // displayComics(comics, offset)
        // resultsCounter(total)
        // disableButtons(offset, total)
    
    })

}

//fetchComics(0)

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
//FUNCION DISPLAY SECCION COMIC

// setTimeout(() => {

//     console.log(comics.length)
//     console.log(comics)
  

// }, 2000)


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
        //console.log(rta)
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



// const displaySelectedComic = (obj) => {
    
//     const comicSelected = document.getElementById('comicSelected')

//     obj.forEach((item: Comic) => {
//         const comicCover = createNode('img', { src: `${item.thumbnail.path}.${item.thumbnail.extension}`, alt: `${item.title}`, class:"comic__cover" });
//         const divCover = createNode('div', { class: "comic__cover" }, comicCover)
//         const comicTitle = createNode('h2', { class: "comic__title" }, document.createTextNode(`${item.title}`))
//         const publishedTitle = createNode('h3', { class: "h3" }, document.createTextNode('Publicado:'))
//         const date = new Intl.DateTimeFormat('es-AR').format(
//             new Date(item.dates.find(date => date.type === 'onsaleDate').date)
//             )            
//         const publishedDate = createNode('p', { class: "comic__published" }, document.createTextNode(date))
//         const writersTitle = createNode('h3', { class: "h3" }, document.createTextNode('Guionistas:'))
//         let writers=[]
//         for (const prop in item.creators.items) {
//             writers.push(item.creators.items[prop].name)
//             }
//         let comicWriters = createNode('p', { class: "comic__writers" }, document.createTextNode(writers.toString()))
//         const descriptionTitle = createNode('h3', { class: "h3" }, document.createTextNode('Descripción:'))
//         const comicDescription = createNode('p', { class: "comic__description" }, document.createTextNode(`${item.description}`))
//         const comicDetail = createNode('div', { class: "comic__detail" }, comicTitle, publishedTitle, publishedDate, writersTitle, comicWriters, descriptionTitle, comicDescription )
//         comicSelected.appendChild(divCover)
//         comicSelected.appendChild(comicDetail)
//     }); 
   
// }


//PETICION PARA TABLA DE COMICS
// fetch(urlComic)
//    .then((response) => {
//       return response.json()
//    })
//     .then(rta => {
//         const comics = rta.data.results
//         displayComics(comics)
//         console.log(comics)
//         const table = document.getElementById('movies');
    
//         const tbody = table.getElementsByTagName('tbody')[0];
      
      
//         comics.forEach((comic) => {
//             const tr = document.createElement('tr');
//             const td = document.createElement('td');
//             const td2 = document.createElement('td');
//             const td3 = document.createElement('td');
//             const td4 = document.createElement('td');
//             const td5 = document.createElement('td');
//             const td6 = document.createElement('td');
//             const text = document.createTextNode(comic.title);
//             const text2 = document.createTextNode(comic.id);
//             const text4 = document.createTextNode(comic.description);
            
//             for (const item of comic.characters.items) {
//                 const text5 = document.createTextNode(`${item.name}, `)
//                 td5.appendChild(text5);
//             }
//             for (const item of comic.creators.items) {
//                 const text6 = document.createTextNode(`${item.name}, `)
//                 td6.appendChild(text6);
//             }

//             const cover = document.createElement('img');
//             cover.setAttribute('src', `${comic.thumbnail.path}.${comic.thumbnail.extension}`);
//             cover.style.width = '50px';
            
//             tr.appendChild(td);
//             tr.appendChild(td2);
//             tr.appendChild(td3);
//             tr.appendChild(td4);
//             tr.appendChild(td5);
//             tr.appendChild(td6)
//             td.appendChild(text);
//             td2.appendChild(text2);
//             td3.appendChild(cover)
//             td4.appendChild(text4);
//             tbody.appendChild(tr);


//            });
      
//      })
