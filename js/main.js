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

const clearAll = () => {
    document.getElementById("mainContainer").classList.add("hide")
    document.getElementById("resultsContainer").classList.add("hide")
}

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
getData('top_rated')
getData('upcoming')
getData('now_playing')



//TRAE LOS OBJETOS Y LOS FILTRO CON LA INFO QUE QUIERO MOSTRAR
const apiMovieToMovie = apiMovie => {
    let {title, poster_path} = apiMovie
    let movie = {
        title: title, 
        img: `https://image.tmdb.org/t/p/w500/${poster_path}`
    }
    return movie
}

//FUNCIÓN QUE IMPRIME LOS RESULTADOS DE TODAS LAS CATEGORÍAS EN VIEW ALL Y NAV
// const printResults = (param) => {
//     // let containerPopular = document.createElement('li');
//     // containerPopular.id('movies')
//     // let li = document.createElement('li')
//     // li.appendChild(containerPopular);
//     containerPopular= document.getElementById('')
//     containerPopular.innerHTML = '';

//     param.forEach((e) => {
//     // let li = document.createElement('li');
//     // li.appendChild(containerPopular)
//     var element1 = document.createElement("li");
//     let movie = document.createElement('a');
//     let image = document.createElement('img');
//     image.innerText = `${e.img}`
//     movie.innerText = `${e.title}`;
//     image.src = `${e.img}`;
//     movie.href = '#';
//     containerPopular.appendChild(element1);
//     element1.appendChild(image);
//     element1.appendChild(movie);
//     });

// }


//FUNCIONES QUE IMPRIMEN LAS CATEGORIAS EN EL HOME
const printPopular = (param) => {
    containerPopular= document.getElementById('popular-movies')
    containerPopular.innerHTML = '';

    param.forEach((e) => {
    var element1 = document.createElement("li");
    let movie = document.createElement('a');
    let image = document.createElement('img');
    image.innerText = `${e.img}`;
    movie.innerText = `${e.title}`;
    image.src = `${e.img}`;
    movie.href = '#';
    containerPopular.appendChild(element1);
    element1.appendChild(image);
    element1.appendChild(movie);
    });
}

const printTop = (param) => {
    containerPopular= document.getElementById('top-movies')
    containerPopular.innerHTML = '';

    param.forEach((e) => {
    var element1 = document.createElement("li");
    let movie = document.createElement('a');
    let image = document.createElement('img');
    image.innerText = `${e.img}`;
    movie.innerText = `${e.title}`;
    image.src = `${e.img}`;
    movie.href = '#';
    containerPopular.appendChild(element1);
    element1.appendChild(image);
    element1.appendChild(movie);
    });
}

const printUpcoming = (param) => {
    containerPopular= document.getElementById('upcoming-movies')
    containerPopular.innerHTML = '';

    param.forEach((e) => {
    var element1 = document.createElement("li");
    let movie = document.createElement('a');
    let image = document.createElement('img');
    image.innerText = `${e.img}`;
    movie.innerText = `${e.title}`;
    image.src = `${e.img}`;
    movie.href = '#';
    containerPopular.appendChild(element1);
    element1.appendChild(image);
    element1.appendChild(movie);
    });
}

const printPlaying = (param) => {
    containerPopular= document.getElementById('playing-movies')
    containerPopular.innerHTML = '';

    param.forEach((e) => {
    var element1 = document.createElement("li");
    let movie = document.createElement('a');
    let image = document.createElement('img');
    image.innerText = `${e.img}`;
    movie.innerText = `${e.title}`;
    image.src = `${e.img}`;
    movie.href = '#';
    containerPopular.appendChild(element1);
    element1.appendChild(image);
    element1.appendChild(movie);
    });
}

const addList = (arrayOfMovies,container) =>{
    arrayOfMovies.forEach((e, {poster_path})=>{
        const element2 = document.createElement("li")
        let movie = document.createElement('a');
        const image = document.createElement("img")
        image.innerText = `${e.img}`;
        movie.innerText = `${e.title}`;
        poster_path
            image.src = `${e.img}`
        container.appendChild(element2)
        element2.appendChild(image);
        element2.appendChild(movie);
    })
}

const searchFunction = () => {
    let query = event.target.value
    if (query.length>=3 || (event.keyCode===13 && query!==lastRequest)) {
        lastRequest=query
        fetch (`https://api.themoviedb.org/3/search/movie?${api_key}&query=${query}`)
            .then(res=>res.json())
            .then(res=>printSearch(res.results,query,res.total_results))
    }
}

const printSearch = (movies,query) => {
    clearAll()
    const resultsContainer = document.getElementById("resultsContainer")
    resultsContainer.innerHTML=""
    resultsContainer.classList.add("display")
    resultsContainer.classList.remove("hide")
    const results = document.createElement("ul")
    results.classList.add("search-results")
    results.id="results"
    addList(movies,results)
    resultsContainer.appendChild(results)    
    moreBtn(results,query)
}


const moreBtn = (container,category) => {
    let currentPage = 2
    const loadMoreNode = document.createElement("button")
    loadMoreNode.innerText="Más resultados"
    loadMoreNode.onclick=()=>{
        loadMore(category,currentPage)
        currentPage++
        return currentPage
    }
    container.parentNode.appendChild(loadMoreNode)
}

const loadMore = (query,currentPage) => {
    const container = document.getElementById("results")
    let url
    query === "popular"||query==="top_rated"||query==="upcoming"||query==="now_playing"
        ?url=`https://api.themoviedb.org/3/movie/${query}?api_key=${api_key}&page=${currentPage}`
        :url=`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}&page=${currentPage}`
    fetch(url)
        .then(response => response.json())
        .then(res => addList(res.results,container))
}


// FALTANTES

// - En el home mostrar primeros 5 resultados de las categorias
// - En el home que los botones view all y los botones del nav te muestren todos los resultados de las categorias
// - En el search que muestre las imágenes
// - Modal
// - Mobile

const printHome = (param, category) => {
    let containerPopular = document.getElementById('popular-movies');
    containerPopular.innerHTML = '';

    param.forEach((e) => {

    var element1 = document.createElement("li");
    let movie = document.createElement('a');
    let image = document.createElement('img');
    image.innerText = `${e.img}`;
    movie.innerText = `${e.title}`;
    image.src = `${e.img}`;
    movie.href = '#';
    containerPopular.appendChild(element1);
    element1.appendChild(image);
    element1.appendChild(movie);
    
    });
}
