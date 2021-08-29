const API_KEY:string = '42ae3fcea4ffd21315989c5e0dee4006';
const BASE_URL: string = 'https://gateway.marvel.com/v1/public';
const HASH:string = '5e2b4e7a9678fe99d5424aad34d696f1'

type Comic = {
    id: number;
    thumbnail: string;
    title: string;
    //published: Date;
    //writers: string[];
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
       console.log(comics)
        const table = document.getElementById('movies');
    
        const tbody = table.getElementsByTagName('tbody')[0];
      
      
        comics.forEach((comic) => {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            const td2 = document.createElement('td');
            const td3 = document.createElement('td');
            const td4 = document.createElement('td');
            const td5 = document.createElement('td');
            const text = document.createTextNode(comic.title);
            const text2 = document.createTextNode(comic.id);
            const text4 = document.createTextNode(comic.description);
            
            for (const item of comic.characters.items) {
                const text5 = document.createTextNode(`${item.name}, `)
                td5.appendChild(text5);
            }

            const cover = document.createElement('img');
            cover.setAttribute('src', `${comic.thumbnail.path}.${comic.thumbnail.extension}`);
            cover.style.width = '50px';
            
            tr.appendChild(td);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            td.appendChild(text);
            td2.appendChild(text2);
            td3.appendChild(cover)
            td4.appendChild(text4);
            tbody.appendChild(tr);


           });
      
     })
     
   