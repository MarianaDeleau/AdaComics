//PETICION PERSONAJES

const urlCharacter: string = `${BASE_URL}/characters?ts=1&apikey=${API_KEY}&hash=${HASH}`


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
            characters[i].addEventListener('click', displaySelectedCharacter)
        }
    });

}


//FUNCION DISPLAY SECCION PERSONAJE

const displaySelectedCharacter = (e) => {

    const characterSelectedId = e.target.id
    const characterSelected = document.getElementById('characterSelected');
    const resultsSection = document.getElementById('resultsSection')
    console.log(characterSelectedId)

    setTimeout(() => {
        
        fetch(`${BASE_URL}/characters/${characterSelectedId}?ts=1&apikey=${API_KEY}&hash=${HASH}`)

            .then((response) => {
       
                return response.json()
            })
            .then(rta => {
  
            const selectedCharacter: Character = rta.data.results[0]
                
            const characterPicture = createNode('img', { src: `${selectedCharacter.thumbnail.path}.${selectedCharacter.thumbnail.extension}`, alt: `${selectedCharacter.name}`, class:"character__picture"});
            const divPicture = createNode('div', { class: "character__picture" }, characterPicture)
            const characterName = createNode('h2', { class: "character__name" }, document.createTextNode(`${selectedCharacter.name}`))
            const characterDescription = createNode('p', { class: "character__description" }, document.createTextNode(`${selectedCharacter.description}`))
            const characterDetail = createNode('div', { class: "character__detail" },characterName, characterDescription  )
            characterSelected.appendChild(divPicture)
            characterSelected.appendChild(characterDetail)
            })
        
            resultsSection.setAttribute('hidden', 'true')
    }, 2000)
    
}



