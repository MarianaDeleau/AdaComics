
const API_KEY:string = '42ae3fcea4ffd21315989c5e0dee4006';
const BASE_URL: string = 'https://gateway.marvel.com/v1/public';
const HASH:string = '5e2b4e7a9678fe99d5424aad34d696f1'

let offset = 0
let resultCounter = 0

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('search__input');
const searchType = document.getElementById('search__type');
const sortSearch = document.getElementById('sort__search');

const searchBtn = document.getElementById('search__button')
const btnStart = document.getElementById('btnStart')
const btnPreviousPage = document.getElementById('previousPage')
const btnEnd = document.getElementById('btnEnd')
const btnNextPage = document.getElementById('nextPage')



//FUNCION PARA CREAR NODOS
    const createNode = (tag, attr, ...children) => {
        const elem = document.createElement(tag);
    
        for (const prop in attr) {
            if (prop === "data") {
                for (const dataElement in attr[prop]) {
                		
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

//CONTADOR DE RESULTADOS
const resultsCounter = (total) => {

    const counter = document.getElementById('resultsCounter');

    counter.innerHTML= total

}

//FUNCION PARA DESABILITAR BOTONES DE PAGINADO
const disableButtons = (offset, total) => {

    if (offset === 0) {
        btnStart.disabled = true
        btnStart.style.backgroundColor= 'transparent'
        btnPreviousPage.disabled = true
        btnPreviousPage.style.backgroundColor= 'transparent'
    } else {
        btnStart.disabled = false
        btnStart.style.backgroundColor=  '#FF0000'
        btnPreviousPage.disabled = false
        btnPreviousPage.style.backgroundColor=  '#FF0000'
    }
    if (offset + 20 >= total) {
        btnEnd.disabled = true
        btnEnd.style.backgroundColor= 'transparent'
        btnNextPage.disabled = true
        btnNextPage.style.backgroundColor= 'transparent'
    } else {
        btnEnd.disabled = false
        btnEnd.style.backgroundColor=  '#FF0000'
        btnNextPage.disabled = false
        btnNextPage.style.backgroundColor=  '#FF0000'
    }

}
//CAPTURAR QUERY PARAMS
const getParams =  () => {
    const params = new URLSearchParams(window.location.search)

    let type = params.get('search__type') || 'comics';
    let sort = params.get('sort__search') || '';
    let input = params.get('search__input');
    let page = Number(params.get('page')) || '1'
    let id = params.get('id') //agregado prueba
    return {type, sort, input, page, id}

  }

//PETICION MARVEL
const fetchMarvel = (offset, url, type, id) => {
    fetch(url)
        .then((response) => {
            return response.json()
        })
         .then(rta => {
             const results = rta.data.results
             const total = rta.data.total
             if (!id) {
                if (type === 'comics') {
                    displayComics(results, offset)
                } else if (type === 'characters') {
                    displayCharacters(results, offset)
                }
             } else {
                if (type === 'comic-results-cover') {
                    displaySelectedComic(results)
                } else if (type === 'character-results-picture') {
                    displaySelectedCharacter(results)
                }
             }
             resultsCounter(total)
             disableButtons(offset, total)
           
             const lastButton = document.getElementById("btnEnd");
             lastButton.dataset.lastpage = Math.ceil(total / rta.data.limit).toString();
       
         })
}

//FILTROS A TRAVES DE QUERY PARAMS
const handleSearchSubmit = (event) => {
    //event.preventDefault()
    const form = event.target;

    const params = new URLSearchParams(window.location.search);

    params.set('search__input', form.search__input.value);
    params.set('search__type', form.search__type.value);
    params.set('sort__search', form.sort__search.value);
    params.set('page', '1')

    window.location.href = `${window.location.pathname}?${params.toString()}`
}

//FILTROS A TRAVES DE ID EN QUERY PARAMS
const handleSelectedItem = (event) => {
    
    const itemSelected = event.target;
    const params = new URLSearchParams(window.location.search);

    params.set('id', itemSelected.id);
    params.set('search__type', (itemSelected.getAttribute('class'))  )
    window.location.href = `${window.location.pathname}?${params.toString()}`
    
}


//PAGINADO A TRAVES DE QUERY PARAMS
const handlePaginationClick = (event) => {
    const params = new URLSearchParams(window.location.search);

    let page =  Number(params.get('page'));

    if(!page) {
        params.set('page', '2'); 
    } else {
        switch(event.target.value) {
            case 'start':
                params.set('page', '1');
                break;
            case 'previousPage':
                params.set('page', page - 1)
                break;
            case 'nextPage':
                params.set('page', page + 1)
                break;
            case 'end':
                params.set('page', event.target.dataset.lastpage);
                break;
            default: break;
        }
    }

    window.location.href = `${window.location.pathname}?${params.toString()}`
}

searchForm.addEventListener('submit', handleSearchSubmit);
btnStart.addEventListener('click', handlePaginationClick)
btnPreviousPage.addEventListener('click', handlePaginationClick)
btnEnd.addEventListener('click', handlePaginationClick)
btnNextPage.addEventListener('click', handlePaginationClick)


//FUNCION PARA DEFINIR STRING PARA FETCH SEGUN TIPO
const inputToSearch = (type, input) => {

    let wordToSearch = '' 
    if (input) {
        if (type === 'comics') {
            wordToSearch += `&titleStartsWith=${input}`
        } else if (type === 'characters'){
            wordToSearch += `&nameStartsWith=${input}`
        }
        
    }
    return wordToSearch
}

//FUNCION PARA ACTUALIZAR SELECT SEGUN TIPO 
const changeSelect = () => {
    
    if (searchType.value === 'comics') {
        sortSearch.innerHTML = ''
        const option1 = createNode('option', { value: 'title' }, document.createTextNode('A-Z'))
        const option2 = createNode('option', { value: '-title' }, document.createTextNode('Z-A'))
        const option3 = createNode('option', { value: '-focDate' }, document.createTextNode('Más nuevos'))
        const option4 = createNode('option', { value: 'focDate' }, document.createTextNode('Más viejos'))
        sortSearch.appendChild(option1)
        sortSearch.appendChild(option2)
        sortSearch.appendChild(option3)
        sortSearch.appendChild(option4)
        }
    if (searchType.value === 'characters') {
            sortSearch.innerHTML = ''
            const option1 = createNode('option', { value: 'name' }, document.createTextNode('A-Z'))
            const option2 = createNode('option', { value: '-name' }, document.createTextNode('Z-A'))
            sortSearch.appendChild(option1)
            sortSearch.appendChild(option2)
        }
}

searchType.addEventListener('change', changeSelect)
changeSelect()

//DEFINE EL VALOR DEL SELECT TYPE POR QUERY PARAMS
const setTypeSelectValue = () => {
    const { type } = getParams()
    
    if (type === 'characters') {
        searchType.value='characters'
    } else if (type === 'character-results-picture'){
        searchType.value='characters'
    } else {
        searchType.value='comics'
    }
}
//setTypeSelectValue()

//INICIO PAGINA
const init = () => {   
    const { type, input, sort, page, id } = getParams()
    let url = ''
    offset = page * 20 - 20
    
    if (id) {
console.log(id)
        if (type === 'comic-results-cover') {
            url = `${BASE_URL}/comics/${id}?ts=1&apikey=${API_KEY}&hash=${HASH}`
        } else if (type === 'character-results-picture') {
            url = `${BASE_URL}/characters/${id}?ts=1&apikey=${API_KEY}&hash=${HASH}`
        }
    } else if (!id){
        url = `${BASE_URL}/${type}?ts=1&apikey=${API_KEY}&hash=${HASH}&orderBy=${sort}&offset=${offset}`
    }
     if (input) {
        url += inputToSearch(type, input)
        }
        fetchMarvel(offset, url, type, id)
        setTypeSelectValue()
        changeSelect()
    }        


init();