
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

//FILTROS A TRAVES DE QUERY PARAMS
const handleSearchSubmit = (event) => {
    event.preventDefault()
    const form = event.target;

    const params = new URLSearchParams(window.location.search);

    params.set('search__input', form.search__input.value);
    params.set('search__type', form.search__type.value);
    params.set('sort__search', form.sort__search.value);
    params.set('page', '1')

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
//   #### MEJORAR CON CREATE NODE ###
const changeSelect = () => {
    
        if (searchType.value === 'comics') {
            sortSearch.innerHTML = `                  
            <option value="title">A-Z</option>
            <option value="-title">Z-A</option>
            <option value="-focDate">Más nuevos</option>
            <option value="focDate">Más viejos</option>`
        }
        if (searchType.value === 'characters') {
            sortSearch.innerHTML = `                  
            <option value="name">A-Z</option>
            <option value="-name">Z-A</option> `
        }
}
      
searchType.addEventListener('change', changeSelect)
