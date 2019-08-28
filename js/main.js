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
    fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${api_key}`)
        .then(response => response.json())
        .then(resData => {
            let { results } = resData
            resData.filter
            let movies = results.map(e => apiMovieToMovie(e))
            printHome(movies.filter((e, i) => i < 5))
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
    fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${api_key}`)
        .then(response => response.json())
        .then(resData => {
            let { results } = resData
            let movies = results.map(e => apiMovieToMovie(e))
            printResults(movies)
        });
};

getData('popular')


//TRAE LOS OBJETOS Y LOS FILTRO CON LA INFO QUE QUIERO MOSTRAR
const apiMovieToMovie = apiMovie => {
    let { title, poster_path } = apiMovie
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
    li.onclick = () => toggleFunction() //definir el id con los results para info modal y pasarlo como parametro de esta funcion
    image.innerText = `${e.img}`
    movie.innerText = `${e.title}`;
    image.src = `${e.img}`;
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
        li.onclick = () => toggleFunction()
        containerPopular.appendChild(li);
        li.appendChild(image);
        li.appendChild(movie);
    });

}

// modal
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


// Toggle hamburger
function toggleMenu() {
    var element = document.getElementById("hamburger");
    element.classList.toggle("hamburger-active");
    var element = document.getElementById("nav");
    element.classList.toggle("nav-mobile");
}
