const api_key = 'd25219b09e23f4a8cbeed6c5ebe7ac2a'
let lastRequest;
let i = []

const onLoad = () => {
    homePage();
    getHome();
    getData();
}

//HOME 

const getHome = (category) => {
    fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${api_key}`)
        .then(response => response.json())
        .then(resData => {
            let { results } = resData
            resData.filter
            let movies = results.map(e => apiMovieToMovie(e))
            printHome(movies.filter((e, i) => i < 5))
        });

};


const printHome = (param) => {
    /* let home = document.getElementById('home') */
    // let homePopular = document.getElementById('homePopular')
    let homeTopRated = document.getElementById('homeTopRated')
 /*    let homeUpcoming = document.getElementById('homeUpcoming')
    let homeNowPlaying = document.getElementById('homeNowPlaying') */
    param.forEach((e) => {
        let li = document.createElement('li');
        let movie = document.createElement('a');
        let image = document.createElement('img');
        image.innerText = `${e.img}`
        movie.innerText = `${e.title}`;
        image.src = `${e.img}`;
        li.onclick = () => toggleFunction()
        //homePopular.appendChild(li);
        homeTopRated.appendChild(li);
        li.appendChild(image);
        li.appendChild(movie);
    });
/*     home.appendChild(homePopular)
    home.appendChild(homeTopRated)
    home.appendChild(homeUpcoming)
    home.appendChild(homeNowPlaying)
    homeNowPlaying.appendChild(param) */
}
console.log(getHome('popular'))

const homePage = () => {
    getHome('popular')
    getHome('top_rated')
    getHome('upcoming')
    getHome('now_playing')
}


//llama a popular / toprated / now playing / popular / upcoming

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 

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

const clearAll = () => {
    document.getElementById("view-all").classList.add("hide")
    document.getElementById("view-all").classList.remove("display")
    document.getElementById("resultsContainer").classList.add("hide")
    document.getElementById("resultsContainer").classList.remove("display")
}

const addList = (arrayOfMovies, container) => {
    arrayOfMovies.forEach((e, { poster_path }) => {
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
    if (query.length >= 3 || (event.keyCode === 13 && query !== lastRequest)) {
        lastRequest = query
        fetch(`https://api.themoviedb.org/3/search/movie?${api_key}&query=${query}`)
            .then(res => res.json())
            .then(res => printSearch(res.results, query, res.total_results))
    }
}

const printSearch = (movies, query) => {
    clearAll()
    const resultsContainer = document.getElementById("resultsContainer")
    resultsContainer.innerHTML = ""
    resultsContainer.classList.add("display")
    resultsContainer.classList.remove("hide")
    const results = document.createElement("ul")
    results.classList.add("search-results")
    results.id = "results"
    addList(movies, results)
    resultsContainer.appendChild(results)
    moreBtn(results, query)
}


const moreBtn = (container, category) => {
    let currentPage = 2
    const loadMoreNode = document.createElement("button")
    loadMoreNode.innerText = "Más resultados"
    loadMoreNode.onclick = () => {
        loadMore(category, currentPage)
        currentPage++
        return currentPage
    }
    container.parentNode.appendChild(loadMoreNode)
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 

//FUNCION QUE TRAE INFO DE LAS APIS Y LAS FILTRA POR LA INFO A MOSTRAR
const getData = category => {

    fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${api_key}`)
        .then(response => response.json())
        .then(resData => {
            let { results } = resData
            let movies = results.map(e => apiMovieToMovie(e))
            printResults(movies)

        });
    
};

/* getData('popular')
getData('top_rated')
getData('upcoming')
getData('now_playing')
 */

//TRAE LOS OBJETOS Y LOS FILTRO CON LA INFO QUE QUIERO MOSTRAR
const apiMovieToMovie = apiMovie => {
    let { title, poster_path, id } = apiMovie
    let movie = {
        id: id,
        title: title,
        img: `https://image.tmdb.org/t/p/w500/${poster_path}`
    }
    return movie
}


//FUNCIÓN QUE IMPRIME LOS RESULTADOS DE TODAS LAS CATEGORÍAS 
const printResults = (param) => {
    clearAll()
    const homeContainer = document.getElementById("view-all")
    homeContainer.classList.add("display")
    homeContainer.classList.remove("hide")
    let containerPopular = document.getElementById('movies');
    containerPopular.innerHTML = '';

    param.forEach((e) => {
        let li = document.createElement('li');
        let movie = document.createElement('a');
        let image = document.createElement('img');
        li.onclick = () => toggleFunction() //definir el id con los results para info modal y pasarlo como parametro de esta funcion
        image.innerText = `${e.img}`
        movie.innerText = `${e.title}`;
        image.src = `${e.img}`;
        containerPopular.appendChild(li);
        li.appendChild(image);
        li.appendChild(movie);
    });
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//LOAD MORE BUTTON
const loadMore = (query, currentPage) => {
    const container = document.getElementById("results")
    let url
    query === "popular" || query === "top_rated" || query === "upcoming" || query === "now_playing"
        ? url = `https://api.themoviedb.org/3/movie/${query}?api_key=${api_key}&page=${currentPage}`
        : url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}&page=${currentPage}`
    fetch(url)
        .then(response => response.json())
        .then(res => addList(res.results, container))
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//MODAL
const loadModal = (movieId) => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}`)
        .then(response => response.json())
        .then(res => {
            const mainTitleNode = document.getElementById("mainTitle")
            mainTitleNode.innerText = res.title
            document.getElementById("img-modal").src = `https://image.tmdb.org/t/p/w500${res.poster_path}`
            const descriptionNode = document.getElementById("movieDescription")
            descriptionNode.innerText = res.overview
            const genreNode = document.getElementById("genre")
            const genreList = []
            res.genres.forEach(({
                name
            }) => genreList.push(name))
            genreNode.innerText = genreList.join(", ")
            const releaseDateNode = document.getElementById("releaseDate")
            releaseDateNode.innerText = res.release_date
        })

}
const toggleFunction = (movieId) => {
    var modal = document.getElementById("modalContainer");
    if (modal.style.display === "none") {
        loadModal(movieId)
        modal.style.display = "block";
    } else {
        modal.style.display = "none";
    }
}


// const apiMovieToModal = apiModal => {
//     let { id, title, img, overview, genre_ids, release_date } = apiModal
//     let modal = {
//         id: id,
//         title: title,
//         img: `https://image.tmdb.org/t/p/w500/${poster_path}`,
//         overview: overview,
//         genre: gendre_ids,
//         release: release_date,
//     }
//     return modal
// }


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//TOGGLE HAMBURGER
function toggleMenu() {
    var element = document.getElementById("hamburger");
    element.classList.toggle("hamburger-active");
    var element = document.getElementById("nav");
    element.classList.toggle("nav-mobile");
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
