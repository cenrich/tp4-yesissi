const api_key = 'd25219b09e23f4a8cbeed6c5ebe7ac2a'
let lastRequest;

//const img = document.getElementById('holi') 
/* const popularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`
const topRatedMovies = `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}`
const upcomingMovies = `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}`
const nowPlayingMovies = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}` */


const onLoad = () => {
   // search();
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
};

console.log(search()) */


const img = document.createElement('img')
    
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


//INFORMACION DE LA PELICULA
/* const showTitle = arr => (arr.map(e => e.title))
const showId = arr => console.log(arr.map(e => e.id))
const showImg = (arr, img) => {
    arr.map(e => img.src = `https://image.tmdb.org/t/p/w500/${e.poster_path}`)
    }  */
/* const overview
const genero
const release */
   
/* const infoToShow = (title, img) => {
     title = e.title
     img = e.img
}

const popularMovies = getData('popular'); */


const printResults = (param) => {
    let containerPopular = document.getElementById('movies');
    containerPopular.innerHTML = '';

    param.forEach((e) => {
    let movie = document.createElement('a');
    let image = document.createElement('img');
    image.innerText = `${e.img}`
    movie.innerText = `${e.title}`;
    image.src = `${e.img}`;
    movie.href = '#';
   // movie.onclick = 
    containerPopular.appendChild(image);
    containerPopular.appendChild(movie);
    });
}


 

