const api_key = 'd25219b09e23f4a8cbeed6c5ebe7ac2a'
let lastRequest;
let i = []

const onLoad = () => {
    homePage();
    getHome();
    getData();
 }

//HOME 

const getHome = category => {
    fetch (`https://api.themoviedb.org/3/movie/${category}?api_key=${api_key}`)
    .then (response => response.json())
    .then (resData => {
        let {results} = resData
        resData.filter
        let movies = results.map(e=> apiMovieToMovie(e))
        printHome(movies.filter((e,i)=>i<5)) 
        console.log(movies)
    });
};

const homePage = () => {
    getHome('popular')
    getHome('top_rated')
    getHome('upcoming')
    getHome('now_playing')
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

//FUNCION IMPRIMIR RESULTADO DE SEARCH EN EL HOME




    
//FUNCION QUE TRAE INFO DE LAS APIS Y LAS FILTRA POR LA INFO A MOSTRAR
const getData = category => {
    fetch (`https://api.themoviedb.org/3/movie/${category}?api_key=${api_key}`)
    .then (response => response.json())
    .then (resData => {
        let {results} = resData
        let movies = results.map(e => apiMovieToMovie(e))
        printResults(movies)
    });
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
    let containerPopular = document.getElementById('movies');
    containerPopular.innerHTML = '';

    param.forEach((e) => {
    let li = document.createElement('li');
    let movie = document.createElement('a');
    let image = document.createElement('img');
    image.innerText = `${e.img}`
    movie.innerText = `${e.title}`;
    image.src = `${e.img}`;
    movie.href = '#';
    containerPopular.appendChild(li);
    li.appendChild(image);
    li.appendChild(movie);
    });
}



const printHome = (param) => {
    let homePopular = document.getElementById('homePopular');
    homePopular.innerHTML = '';
    let homeTopRated = document.getElementById('homeTopRated');
    homeTopRated.innerHTML = '';

    param.forEach((e) => {
        let li = document.createElement('li');
        let movie = document.createElement('a');
        let image = document.createElement('img');
        image.innerText = `${e.img}`
        movie.innerText = `${e.title}`;
        image.src = `${e.img}`;
        movie.href = '#';
        containerPopular.appendChild(li);
        li.appendChild(image);
        li.appendChild(movie);
    });

}
