// import fetch from "node-fetch";
import API_KEY from "./secrets.mjs";

//const API_KEY = '17b0beeb5b0f389cd983177de5c30a80';
const API_URL = 'https://api.themoviedb.org/3'; 
const imgUrl = 'http://image.tmdb.org/t/p/w300'
const errorSpan = document.querySelector('.errorSpan');


// GET para obtener las peliculas en Tendencia
const popularMovies = async (apiUrl) => {
    try {
        const response = await fetch(`${apiUrl}/trending/movie/day?language=es&api_key=${API_KEY}`);

        if (response.status != "200") {
            console.error("Error en status de response de la funcion popularMovies, status: " + response.status);
        } 

        const data = await response.json()
    
        //console.log(data.results.length);
        //console.log(data.results);

        const movies = data.results;

        // Seleccionamos el container en HTML donde vamos a insertar el componente de peliculas que vamos a maquetar con info de la API
        const trendingMoviesArticleContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');
        // Limpiamos el contenedor de peliculas
        //trendingMoviesArticleContainer.innerHTML = '';

        movies.forEach(movie => {

            const movie_container = document.createElement('div');
            movie_container.classList.add('movie-container');

            const movieImg = document.createElement('img');
            movieImg.classList.add('movie-img');
            movieImg.setAttribute('alt', movie.original_title);
            movieImg.setAttribute('src', `${imgUrl}${movie.poster_path}`);

            movie_container.appendChild(movieImg);
            trendingMoviesArticleContainer.appendChild(movie_container);
        });



    } catch (error) {
        errorSpan.innerText = "Oooops! Algo fallo al cargar las Peliculas :( , Mensaje para el developer: " + error;
        console.log(error);
    }
}

// GET para obtener las series en Tendencia
const pupularSeries = async (apiUrl) => {
    try {
        const res = await fetch(`${apiUrl}//trending/tv/day?api_key=${API_KEY}&language=es`);

        if (res.status != "200") {
            console.log("Error en status de peticion de la funcion pupularSeries, status: " + res.status);
        }

        const data = await res.json();
        // console.log(data);

        const series = data.results;
        // console.log(series.length);
        // console.log(series);

        const trendingPreview_serieList_Article = document.querySelector('#trendingPreview .trendingPreview-serieList');

        series.forEach(serie => {
            const serie_container = document.createElement('div');
            serie_container.classList.add('serie-container');

            const serieImg = document.createElement('img');
            serieImg.classList.add('serie-img');
            serieImg.setAttribute('alt', serie.original_name);
            serieImg.setAttribute('src', `${imgUrl}${serie.poster_path}`);

            serie_container.appendChild(serieImg);
            trendingPreview_serieList_Article.appendChild(serie_container);
        });

    } catch (error) {
        errorSpan.innerText = "Oooops! Algo fallo al cargar las Series :( , Mensaje para el developer: " + error;
        console.log("Error en funcion pupularSeries: " + error);
    }
}


popularMovies(API_URL);
pupularSeries(API_URL);

