//FUNCION DISPLAY GRILLA DE PERSONAJES
const characters = document.getElementsByClassName("character__results");
const displayCharacters = (obj, offset) => {

    const resultsGrid = document.getElementById('resultsGrid')
    resultsGrid.innerHTML = " ";

    obj.forEach((item: Character) => {

        const characterPicture = createNode('img', { src: `${item.thumbnail.path}.${item.thumbnail.extension}`, alt: `${item.name}`, id: `${item.id}`, class: "character-results-picture" });
        const divPicture = createNode('div', { class: "character-results-picture" }, characterPicture);
        const characterName = createNode('h3', { class: 'h3' }, document.createTextNode(item.name))
        const divName = createNode('div', { class: "character-results-title" }, characterName);
        const divCharacter = createNode('div', { class: "character__results", href: `./index.html?title=${item.name}&id=${item.id}&offset=${offset}` }, divPicture, divName)
        resultsGrid.appendChild(divCharacter)

        for (let i = 0; i < characters.length; i++) {
            characters[i].addEventListener('click', handleSelectedItem)
        }
    });

}


//FUNCION DISPLAY SECCION PERSONAJE
const displaySelectedCharacter = (obj) => {

    const characterSelected = document.getElementById('characterSelected');
    const comicSelected = document.getElementById('comicSelected')
    const resultsGrid = document.getElementById('resultsGrid')
    comicSelected.innerHTML = ''
    
    obj.forEach((item:Character) => {          
            const characterPicture = createNode('img', { src: `${item.thumbnail.path}.${item.thumbnail.extension}`, alt: `${item.name}`, class:"character__picture"});
            const divPicture = createNode('div', { class: "character__picture" }, characterPicture)
            const characterName = createNode('h2', { class: "character__name" }, document.createTextNode(`${item.name}`))
            const characterDescription = createNode('p', { class: "character__description" }, document.createTextNode(`${item.description}`))
            const characterDetail = createNode('div', { class: "character__detail" },characterName, characterDescription  )
            characterSelected.appendChild(divPicture)
            characterSelected.appendChild(characterDetail)
            
            const urlRelatedInfo =  `${BASE_URL}/characters/${item.id}/comics?ts=1&apikey=${API_KEY}&hash=${HASH}`
                console.log(urlRelatedInfo)
                fetchRelatedInfoComic(urlRelatedInfo, 'characters')
                
        });         
 
           resultsGrid.style.justifyContent = 'start'
}
