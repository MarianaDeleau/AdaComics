
const API_KEY:string = '42ae3fcea4ffd21315989c5e0dee4006';
const BASE_URL: string = 'https://gateway.marvel.com/v1/public';
const HASH:string = '5e2b4e7a9678fe99d5424aad34d696f1'

let offset = 0
let resultCounter = 0

//const params = new URLSearchParams(window.location.search);

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

const btnStart = document.getElementById('btnStart')
const previousPage = document.getElementById('previousPage')
const btnEnd = document.getElementById('btnEnd')
const nextPage = document.getElementById('nextPage')

// const pagination = (e) => {
        
//     const selected = e.target
//     const page = selected.value

//     switch (page) {        
//         case "start":
//                 console.log('start');
//                 offset = 0;
//                 return fetch(`${BASE_URL}/comics?ts=1&apikey=${API_KEY}&hash=${HASH}&offset=${offset}`)
//                 .then((response) => {               
//                     return response.json()               
//                 })
//                 .then(rta => {
//                     const results = rta.data.results
//                     const total = rta.data.total
//                     const offset = rta.data.offset
//                     displayComics(results, offset)
//                     resultsCounter(total)                   
//                 });
//         case "backward1":
//                 console.log('backward1');
//                 offset-=20
//                 return fetch(`${BASE_URL}/comics?ts=1&apikey=${API_KEY}&hash=${HASH}&offset=${offset}`)
//                 .then((response) => {
//                     return response.json()
//                 })
//                 .then(rta => {
//                     const results = rta.data.results
//                     const total = rta.data.total
//                     const offset = rta.data.offset
//                     displayComics(results, offset)
//                     resultsCounter(total)                  
//                 });
//         case "forward1":
//                 console.log('forward1');
//                 offset+=20
//                 return fetch(`${BASE_URL}/comics?ts=1&apikey=${API_KEY}&hash=${HASH}&offset=${offset}`)
//                 .then((response) => {               
//                 return response.json()               
//                 })
//                 .then(rta => {
//                     const results = rta.data.results
//                     const total = rta.data.total
//                     const offset = rta.data.offset
//                     displayComics(results, offset)
//                     resultsCounter(total)     
//                 });
//         case "end":
//                 console.log('end');
//                 return fetch(`${BASE_URL}/comics?ts=1&apikey=${API_KEY}&hash=${HASH}`)
//                 .then((response) => {
//                     return response.json()
//                 })
//                 .then(rta => {
//                     const total = rta.data.total
//                     offset = total - ((total % 20))
//                     return fetch(`${BASE_URL}/comics?ts=1&apikey=${API_KEY}&hash=${HASH}&offset=${offset}`)
//                 })
//                 .then((response) => {
//                     return response.json()
//                     })
//                 .then(data => {
//                     const results = data.data.results
//                     displayComics(results, offset)
//                     //resultsCounter(data)       
//                 })
//         default:
//             console.log("default");
//         }

// }

const pagination = (e) => {
        
    const selected = e.target
    const page = selected.value

    switch (page) {        
        case "start":
                offset = 0;        
                return fetchComics(offset)
        case "previousPage":
                offset-=20
                return fetchComics(offset)
        case "nextPage":
                offset+=20
                return fetchComics(offset)
        case "end":
                return fetch(`${BASE_URL}/comics?ts=1&apikey=${API_KEY}&hash=${HASH}`)
                .then((response) => {
                    return response.json()
                })
                .then(rta => {
                    const total = rta.data.total
                    offset = total - ((total % 20))
                    return fetchComics(offset)  
                })
        default:
            console.log("default");
        }
}


btnStart.addEventListener('click', pagination)
previousPage.addEventListener('click', pagination)
btnEnd.addEventListener('click', pagination)
nextPage.addEventListener('click', pagination)