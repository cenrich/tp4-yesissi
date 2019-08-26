const api_key = 'd25219b09e23f4a8cbeed6c5ebe7ac2a'
let lastRequest;

const onLoad = () => {
   searchMovie();
    getData();
 } 


//FUNCION DE BUSCAR 
/* const search = () => {
    let searchInput = event.target.value;
    if (searchInput.length >=3 || (event.keyCode === 13 && searchInput !== lastRequest)) {
        lastRequest = searchInput;
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchInput}`)
        .then(response =>  response.json())
        .then( resSearch => console.log(resSearch.results));
    }
}; */

    
//FUNCION QUE TRAE INFO DE LAS APIS Y LAS FILTRA POR LA INFO A MOSTRAR
const getData = category => {
    fetch (`https://api.themoviedb.org/3/movie/${category}?api_key=${api_key}`)
    .then (response => response.json())
    .then (resData => {
        let {results} = resData
        let movies = results.map(e => apiMovieToMovie(e))
        printResults(movies)
    })
};

getData('popular')

//TRAE LOS OBJETOS Y LOS FILTRO CON LA INFO QUE QUIERO MOSTRAR
const apiMovieToMovie = apiMovie => {
    let {title, poster_path} = apiMovie
    let movie = {
        title: title, 
        img: `https://image.tmdb.org/t/p/w500/${poster_path}`
    }
    return movie
}

/* const apiMovieToModal = apiMovie => {
    let {id, title, img, overview, genre_ids, release_date} = apiMovie
    let modal = {
        id: id,
        title: title, 
        img: `https://image.tmdb.org/t/p/w500/${poster_path}`
        overview: overview, 
        genre: gendre_ids[],
        release: release_date, 
} */

//FUNCIÓN QUE IMPRIME LOS RESULTADOS DE TODAS LAS CATEGORÍAS 
const printResults = (param) => {
    // let containerPopular = document.createElement('li');
    // containerPopular.id('movies')
    // let li = document.createElement('li')
    // li.appendChild(containerPopular);
    containerPopular= document.getElementById('popular-movies')
    containerPopular.innerHTML = '';

    param.forEach((e) => {
    // let li = document.createElement('li');
    // li.appendChild(containerPopular)
    var element1 = document.createElement("li");
    let movie = document.createElement('a');
    let image = document.createElement('img');
    image.innerText = `${e.img}`
    movie.innerText = `${e.title}`;
    image.src = `${e.img}`;
    movie.href = '#';
    containerPopular.appendChild(element1);
    element1.appendChild(image);
    element1.appendChild(movie);
    });

}

const searchMovie = () => {
    let input = document.getElementById('search')
    let content = input.value
    if (content !== ''){
        input.value = ''
        getData()
    }
}

var keyPress=function(event){
    event.keyCode === 13 ? searchMovie() : false
}



 

