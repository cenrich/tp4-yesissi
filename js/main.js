const api_key = 'd25219b09e23f4a8cbeed6c5ebe7ac2a'
let searchInput = ''
//const img = document.getElementById('holi') 
/* const popularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`
const topRatedMovies = `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}`
const upcomingMovies = `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}`
const nowPlayingMovies = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}` */


const onLoad = () => {
 } 


/* const keyPress = event => {
    if (event.code === 'Enter') {    
    }
} */

    //Search
 /*   fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchInput}`)
    .then(response =>  response.json())
    .then( resSearch => console.log(resSearch.results))*/



    
//FUNCION QUE TRAE INFO DE LAS APIS Y LAS FILTRA POR LA INFO A MOSTRAR
const getData = category => {
    fetch (`https://api.themoviedb.org/3/movie/${category}?api_key=${api_key}`)
    .then (response => response.json())
    .then (resData => {
        let {results} = resData
        let movies = (e) => results.map(e => apiMovieToMovie(e))
        printResults(movies)
    })
};


//TRAE LOS OBJETOS Y LOS FILTRO CON LA INFO QUE QUIERO MOSTRAR
const apiMovieToMovie = apiMovie => {
    let {title, poster_path} = apiMovie
    let movie = {
        title: title, 
        img: `https://image.tmdb.org/t/p/w500/${poster_path}`
    }
    return movie
}

//mostrar los resultados en pantalla: crear un nodo con la seccion/crear un elemento 'a'/ apendear mi resultado al nodo (necesito pasarle un parámetro para que tome 'movies' de get data y que ese sea mi resultado a mostrar)

//INFORMACION DE LA PELICULA
/* const showTitle = arr => (arr.map(e => e.title))
const showId = arr => console.log(arr.map(e => e.id))
const showImg = (arr, img) => {
    arr.map(e => img.src = `https://image.tmdb.org/t/p/w500/${e.poster_path}`)
    }  */
/* const descripcion
const genero
const release */
   
/* const infoToShow = (title, img) => {
     title = e.title
     img = e.img
}*/

const popularMovies = getData('popular'); 


const printResults = (param) => {
    let containerPopular = document.getElementById('popular-movies');
    containerPopular.innerHTML = '';
    let movie= document.createElement('li');
    movie.innerText = param;
    containerPopular.appendChild(movie);
}




 

