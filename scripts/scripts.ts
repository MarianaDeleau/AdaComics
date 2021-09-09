
const API_KEY:string = '42ae3fcea4ffd21315989c5e0dee4006';
const BASE_URL: string = 'https://gateway.marvel.com/v1/public';
const HASH:string = '5e2b4e7a9678fe99d5424aad34d696f1'

let offset = 0
let resultCounter = 0


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

const resultsCounter = (obj) => {

    const counter = document.getElementById('resultsCounter');

    counter.innerHTML= `${obj.data.total}`

}


//PAGINACION

const btnStart = document.getElementById('btnStart')
const btnBackward1 = document.getElementById('btnBackward1')
const btnEnd = document.getElementById('btnEnd')
const btnForward1 = document.getElementById('btnForward1')

const pagination = (e) => {
        
    const selected = e.target
    const page = selected.value

    switch (page) {        
        case "start":
            offset = 0;
            return fetch(`${BASE_URL}/comics?ts=1&apikey=${API_KEY}&hash=${HASH}&offset=${offset}`)
                .then((response) => {               
                    return response.json()               
                })
                .then(rta => {
                    const results = rta.data.results
                    displayComics(results)
                    resultsCounter(rta)
                    //displaySelectedComic(comics)                    
                });
        case "backward1":
            console.log('backward1');
            offset-=20
            return fetch(`${BASE_URL}/comics?ts=1&apikey=${API_KEY}&hash=${HASH}&offset=${offset}`)
                .then((response) => {
                    return response.json()
                })
                .then(rta => {
                    const results = rta.data.results
                    displayComics(results)
                    resultsCounter(rta)
                    //displaySelectedComic(comics)                    
                });
        case "end":
            console.log('end');
            offset-=20
            return fetch(`${BASE_URL}/comics?ts=1&apikey=${API_KEY}&hash=${HASH}&offset=${offset}`)
            .then((response) => {
                return response.json()
            })
            .then(rta => {
                const results = rta.data.results
                displayComics(results)
                resultsCounter(rta)
                //displaySelectedComic(comics)                    
            })
        case "forward1":
            console.log('forward1');
            offset+=20
            return fetch(`${BASE_URL}/comics?ts=1&apikey=${API_KEY}&hash=${HASH}&offset=${offset}`)
                .then((response) => {               
                    return response.json()               
                })
                .then(rta => {
                    const results = rta.data.results
                    displayComics(results)
                    resultsCounter(rta)
                    //displaySelectedComic(comics)
                    
                });
        default:
            console.log("default");
        }

}

btnStart.addEventListener('click', pagination)
btnBackward1.addEventListener('click', pagination)
btnEnd.addEventListener('click', pagination)
btnForward1.addEventListener('click', pagination)