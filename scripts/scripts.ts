
const API_KEY:string = '42ae3fcea4ffd21315989c5e0dee4006';
const BASE_URL: string = 'https://gateway.marvel.com/v1/public';
const HASH:string = '5e2b4e7a9678fe99d5424aad34d696f1'

let offset = 0
let resultCounter = 0

const params = new URLSearchParams(window.location.search);

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


//PAGINACION

const pagination = (e) => {
    
    const selected = e.target
    const page = selected.value
    switch (page) {
        case "start":
            offset = 0;
            urlToFetch = getParams(offset)
            return fetchMarvel(offset, urlToFetch)
        case "previousPage":
            offset -= 20
            urlToFetch = getParams(offset)
            return fetchMarvel(offset, urlToFetch)
        case "nextPage":
            offset += 20
            urlToFetch = getParams(offset)
            return fetchMarvel(offset, urlToFetch)
        case "end":
            return fetch(getParams(0))
                    .then((response) => {
                        return response.json()
                    })
                    .then(rta => {
                        const total = rta.data.total
                        console.log(total)
                        offset = total - ((total % 20))
                        urlToFetch = getParams(offset)
                        return fetchMarvel(offset, urlToFetch)
                    })
        default:
            offset = 0
            urlToFetch = getParams(offset)
            return fetchMarvel(offset, urlToFetch)
            }           
    }    

btnStart.addEventListener('click', pagination)
btnPreviousPage.addEventListener('click', pagination)
btnEnd.addEventListener('click', pagination)
btnNextPage.addEventListener('click', pagination)
searchType.addEventListener('change', pagination)

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

//FILTROS

const filter = () => {
    fetchMarvel(0, getParams(0))
}
   
searchBtn.addEventListener('click', filter)


//SETEAR PARAMS
const setParams = () => {
    //e.preventDefault();

    params.set('titleStartsWith', searchInput.value)
    params.set('type', searchType.value)
    params.set('orderBy', sortSearch.value)
    params.set('page', '99')
    params.set('offset', offset)
    window.location.href = `${window.location.pathname}?${params.toString()}`
    
}

console.log( window.location.href)
//searchBtn.addEventListener('click', setParams)



const getSortValue = () => {

    const sort = sortSearch.value
    let sortToSearch = '' 
    switch (sort) {
        
        case "orderBy=title":
            sortToSearch = searchType.value === 'comics' ? "orderBy=title" : "orderBy=name"
            return sortToSearch
        case "orderBy=-title":
        sortToSearch = searchType.value === 'comics' ? "orderBy=-title" : "orderBy=-name"
            return sortToSearch
        case "orderBy=-onsaleDate":
        sortToSearch = searchType.value === 'comics' ? "orderBy=-onsaleDate" : "orderBy=-modified"
        return sortToSearch
        case "orderBy=onsaleDate":
        sortToSearch = searchType.value === 'comics' ? "orderBy=onsaleDate" : "orderBy=modified"
        default:
            return sortToSearch
    }

}

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