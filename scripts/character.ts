//FUNCION DISPLAY GRILLA DE PERSONAJES
const characters = document.getElementsByClassName("character__results");
const displayCharacters = (obj, offset) => {

    const resultsGrid = document.getElementById('resultsGrid')
    resultsGrid.innerHTML = " ";

    obj.forEach((item: Character) => {

        const characterPicture = createNode('img', { src: `${item.thumbnail.path}.${item.thumbnail.extension}`, alt: `${item.name}`, id: `${item.id}`, class: "characters" });
        const divPicture = createNode('div', { class: "characters" }, characterPicture);
        const characterName = createNode('h3', { class: 'h3' }, document.createTextNode(item.name))
        const divName = createNode('div', { class: "character-results-title" }, characterName);
        const divCharacter = createNode('div', { class: "character__results" }, divPicture, divName)
        resultsGrid.appendChild(divCharacter)

        for (let i = 0; i < characters.length; i++) {
            characters[i].addEventListener('click', handleSelectedItem)
        }
    });

}


//FUNCION DISPLAY SECCION PERSONAJE
const displaySelectedCharacter = () => {
    const { id, type } = getParams()
    const characterSelected = document.getElementById('characterSelected');
    const comicSelected = document.getElementById('comicSelected')
    const resultsGrid = document.getElementById('resultsGrid')
    comicSelected.innerHTML = ''
    characterSelected.innerHTML = ''

    fetch(`${BASE_URL}/${type}/${id}?ts=1&apikey=${API_KEY}&hash=${HASH}`)
    .then((response) => {    
        return response.json()    
    })
        .then(rta => {
            const item: Character = rta.data.results[0]
            
            const characterPicture = createNode('img', { src: `${item.thumbnail.path}.${item.thumbnail.extension}`, alt: `${item.name}`, class:"character__picture"});
            const divPicture = createNode('div', { class: "character__picture" }, characterPicture)
            const characterName = createNode('h2', { class: "character__name" }, document.createTextNode(`${item.name}`))
            const characterDescription = createNode('p', { class: "character__description" }, document.createTextNode(`${item.description}`))
            const characterDetail = createNode('div', { class: "character__detail" },characterName, characterDescription  )
            characterSelected.appendChild(divPicture)
            characterSelected.appendChild(characterDetail)
                            
        });         
           resultsGrid.style.justifyContent = 'start'
}
