const API_KEY:string = '42ae3fcea4ffd21315989c5e0dee4006';
const BASE_URL: string = 'https://gateway.marvel.com/v1/public';
const HASH:string = '5e2b4e7a9678fe99d5424aad34d696f1'

type Comic = {
    id: number;
    thumbnail: string;
    title: string;
    //published: Date;
    writers: string[];
    description: string;
    characters: Character[];    
}
 
type Character = {
    id: number;
    image: string;
    name: string;
    description: string;
    comics: Comic[]
}

const urlComic: string = `${BASE_URL}/comics?ts=1&apikey=${API_KEY}&hash=${HASH}`
//console.log(url)

fetch(urlComic)
   .then((response) => {
      return response.json()
   })
    .then(rta => {
        const comics = rta.data.results
        displayComics(comics)
        //console.log(comics)
        // const table = document.getElementById('movies');
    
        // const tbody = table.getElementsByTagName('tbody')[0];
      
      
        // comics.forEach((comic) => {
        //     const tr = document.createElement('tr');
        //     const td = document.createElement('td');
        //     const td2 = document.createElement('td');
        //     const td3 = document.createElement('td');
        //     const td4 = document.createElement('td');
        //     const td5 = document.createElement('td');
        //     const td6 = document.createElement('td');
        //     const text = document.createTextNode(comic.title);
        //     const text2 = document.createTextNode(comic.id);
        //     const text4 = document.createTextNode(comic.description);
            
        //     for (const item of comic.characters.items) {
        //         const text5 = document.createTextNode(`${item.name}, `)
        //         td5.appendChild(text5);
        //     }
        //     for (const item of comic.creators.items) {
        //         const text6 = document.createTextNode(`${item.name}, `)
        //         td6.appendChild(text6);
        //     }

        //     const cover = document.createElement('img');
        //     cover.setAttribute('src', `${comic.thumbnail.path}.${comic.thumbnail.extension}`);
        //     cover.style.width = '50px';
            
        //     tr.appendChild(td);
        //     tr.appendChild(td2);
        //     tr.appendChild(td3);
        //     tr.appendChild(td4);
        //     tr.appendChild(td5);
        //     tr.appendChild(td6)
        //     td.appendChild(text);
        //     td2.appendChild(text2);
        //     td3.appendChild(cover)
        //     td4.appendChild(text4);
        //     tbody.appendChild(tr);


        //    });
      
     })
     
const urlCharacter: string = `${BASE_URL}/characters?ts=1&apikey=${API_KEY}&hash=${HASH}`
     

fetch(urlCharacter)
   .then((response) => {
      return response.json()
   })
    .then(rta => {
        const characters = rta.data.results

        displayCharacters(characters)
       // console.log(characters)
    //     const table = document.getElementById('character');
    
    //     const tbody = document.getElementById('character__table');
      
    //   table.appendChild(tbody)

    //     characters.forEach((character) => {
    //         const tr = document.createElement('tr');
    //         const td = document.createElement('td');
    //         const td2 = document.createElement('td');
    //         const td3 = document.createElement('td');
    //         const td4 = document.createElement('td');
    //         const td5 = document.createElement('td');
    //         const text = document.createTextNode(character.name);
    //         const text2 = document.createTextNode(character.id);
    //         const text4 = document.createTextNode(character.description);
                        
    //         for (const comic of character.comics.items) {
    //             const text5 = document.createTextNode(`${comic.name}, `)
    //             td5.appendChild(text5);
    //         }            

    //         const picture = document.createElement('img');
    //         picture.setAttribute('src', `${character.thumbnail.path}.${character.thumbnail.extension}`);
    //         picture.style.width = '50px';
            
    //         tr.appendChild(td);
    //         tr.appendChild(td2);
    //         tr.appendChild(td3);
    //         tr.appendChild(td4);
    //         tr.appendChild(td5);
    //         td.appendChild(text);
    //         td2.appendChild(text2);
    //         td3.appendChild(picture)
    //         td4.appendChild(text4);
    //         tbody.appendChild(tr);


    //       });
      
    })
     
    const createNode = (tag, attr, ...children) => {
        const elem = document.createElement(tag);
    
        for (const prop in attr) {
            if (prop === "data") {
                for (const dataElement in attr[prop]) {
                 //console.log({dataElement, tag, prop})			
            elem.dataset[dataElement] = attr[prop][dataElement];
                }
            } else {
                elem.setAttribute(prop, attr[prop]);
            }
        }
        for (const child of children) {
            elem.appendChild(child);
        }
    
        return elem;
};
    
const displaySelectedComic = (obj) => {

    const comicSection = document.getElementById('comicSection')
    
    for (const item of obj) {
        const comicCover = createNode('img', { src: `${item.thumbnail.path}.${item.thumbnail.extension}`, alt: `${item.title}`, class:"comic__cover"});
        const divCover = createNode('div', { class:"comic__cover" }, comicCover )
        comicSection.appendChild(divCover)
}    
    
}


const displayComics = (obj) => {

    const resultsGrid = document.getElementById('resultsGrid')
    
    for (const item of obj) {
        const comicCover = createNode('img', { src: `${item.thumbnail.path}.${item.thumbnail.extension}`, alt: `${item.title}`, class:"comic-results-cover"});
        const divCover = createNode('div', { class: "comic-results-cover" }, comicCover)
        const comicTitle = createNode('h3', { class: 'h3' } , document.createTextNode(item.title))
        const divTitle = createNode('div', { class: "comic-results-title" }, comicTitle)
        const divComic = createNode('div', { class: "comic__results" }, divCover, divTitle)
        resultsGrid.appendChild(divComic)
}   
    
}

const displayCharacters = (obj) => {

    const resultsGrid = document.getElementById('resultsGrid')

    for (const item of obj) {

        const characterPicture = createNode('img', { src: `${item.thumbnail.path}.${item.thumbnail.extension}`, class: "character-results-picture" });
        const divPicture = createNode('div', { class: "character-results-picture" }, characterPicture);
        const characterName = createNode('h3', { class: 'h3' }, document.createTextNode(item.name))
        const divName = createNode('div', { class: "character-results-title" }, characterName);
        const divCharacter = createNode('div', { class: "character__results" }, divPicture, divName)
        resultsGrid.appendChild(divCharacter)
    }

}