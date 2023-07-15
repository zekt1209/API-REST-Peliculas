//import fetch from "node-fetch";
import API_KEY from "./secrets.mjs";

//const API_KEY = '17b0beeb5b0f389cd983177de5c30a80';
const API_URL = 'https://api.themoviedb.org/3'; 
const imgUrl = 'http://image.tmdb.org/t/p/w300'

console.log('Hola Mundo');

const popularMovies = async (apiUrl) => {
    try {
        const response = await fetch(`${apiUrl}/movie/popular?api_key=${API_KEY}`);

        if (response.status != "200") {
            console.log("Error en status de response, status: " + response.status);
        } 

        const data = await response.json()
    
        console.log(data.results.length);
        console.log(data.results);

        const movies = data.results;

        
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
        console.log(error);
    }
}

popularMovies(API_URL);

