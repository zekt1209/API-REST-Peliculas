// import fetch from "node-fetch";
import API_KEY, { ACCESS_TOKEN } from "./secrets.mjs";
import navigation from "./navigation.mjs";
import * as nodes from "./nodes.mjs";
//import {num1} from './nodes.mjs';

// const API_KEY = '17b0beeb5b0f389cd983177de5c30a80';
const API_URL = "https://api.themoviedb.org/3";
const imgUrl = "http://image.tmdb.org/t/p/w300";
const imgUrl500 = "http://image.tmdb.org/t/p/w500";
const errorSpan = document.querySelector(".errorSpan");

// Migracion a Axios
const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    params: { api_key: API_KEY, language: "es-MX" },
});

const axiosBearer = axios.create({
    method: "get",
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        "Content-Type": "application/json;charset=utf-8,",
        Authorization: "Bearer " + ACCESS_TOKEN,
    },
});

// Utils

const createMovies = (parentContainer, dataResultArray) => {
        // Seleccionamos el container en HTML donde vamos a insertar el componente de peliculas que vamos a maquetar con info de la API
        parentContainer.innerHTML = "";

        // Limpiamos el contenedor de peliculas
        //nodes.trendingMoviesPreviewList.innerHTML = '';

        dataResultArray.forEach((movie) => {
            const movie_container = document.createElement("div");
            movie_container.classList.add("movie-container");

            const movieImg = document.createElement("img");
            movieImg.classList.add("movie-img");
            movieImg.setAttribute("alt", movie.original_title);
            movieImg.setAttribute("src", `${imgUrl}${movie.poster_path}`);

            movie_container.appendChild(movieImg);
            parentContainer.appendChild(movie_container);

            // eventListener para detalles de una pelicula
            movie_container.addEventListener('click', () => {
                // Sacamos el id
                const movieId = movie.id;

                // Sacamos el name
                let movieName = decodeURI(movie.original_title);
                movieName = movieName.replaceAll(" ",'-');

                // Asignamos el hash de movieDetails
                location.hash = `movie=${movieId}-${movieName}`;
            })

        });
}



// Llamados a la API

// *** GET para obtener las peliculas en Tendencia ***

// --- Fetch ---
// const popularMovies = async (apiUrl) => {
//     try {
//         const response = await fetch(`${apiUrl}/trending/movie/day?language=es&api_key=${API_KEY}`);

//         if (response.status != "200") {
//             console.error("Error en status de response de la funcion popularMovies, status: " + response.status);
//         }

//         const data = await response.json()

//         //console.log(data.results.length);
//         //console.log(data.results);

//         const movies = data.results;

//         // Seleccionamos el container en HTML donde vamos a insertar el componente de peliculas que vamos a maquetar con info de la API
//         const nodes.trendingMoviesPreviewList = document.querySelector('#trendingPreview .trendingPreview-movieList');
//         // Limpiamos el contenedor de peliculas
//         //nodes.trendingMoviesPreviewList.innerHTML = '';

//         movies.forEach(movie => {

//             const movie_container = document.createElement('div');
//             movie_container.classList.add('movie-container');

//             const movieImg = document.createElement('img');
//             movieImg.classList.add('movie-img');
//             movieImg.setAttribute('alt', movie.original_title);
//             movieImg.setAttribute('src', `${imgUrl}${movie.poster_path}`);

//             movie_container.appendChild(movieImg);
//             nodes.trendingMoviesPreviewList.appendChild(movie_container);
//         });

//     } catch (error) {
//         errorSpan.innerText = "Oooops! Algo fallo al cargar las Peliculas :( , Mensaje para el developer: " + error;
//         console.log(error);
//     }
// }

// --- Axios ---
const popularMovies = async () => {
    try {
        const { data, status, statusText, headers, config, request } = await api(`/trending/movie/day?language=es`);

        if (status != "200") {
            console.error("Error en status de response de la funcion popularMovies, status: " + status);
        }

        // console.log(data);
        // console.log(status);
        // console.log(statusText);
        // console.log(headers);
        // console.log(config);
        // console.log(request);

        const movies = data.results;

        createMovies(nodes.trendingMoviesPreviewList, movies);
    } catch (error) {
        errorSpan.innerText = "Oooops! Algo fallo al cargar las Peliculas :( , Mensaje para el developer: " + error;
        console.log(error);
    }
};

// GET para obtener las series en Tendencia

// --- Fetch ---
// const pupularSeries = async (apiUrl) => {
//     try {
//         const res = await fetch(`${apiUrl}//trending/tv/day?api_key=${API_KEY}&language=es`);

//         if (res.status != "200") {
//             console.log("Error en status de peticion de la funcion pupularSeries, status: " + res.status);
//         }

//         const data = await res.json();
//         // console.log(data);

//         const series = data.results;
//         // console.log(series.length);
//         // console.log(series);

//         const nodes.trendingSeriePreviewList = document.querySelector('#trendingPreview .trendingPreview-serieList');

//         series.forEach(serie => {
//             const serie_container = document.createElement('div');
//             serie_container.classList.add('serie-container');

//             const serieImg = document.createElement('img');
//             serieImg.classList.add('serie-img');
//             serieImg.setAttribute('alt', serie.original_name);
//             serieImg.setAttribute('src', `${imgUrl}${serie.poster_path}`);

//             serie_container.appendChild(serieImg);
//             nodes.trendingSeriePreviewList.appendChild(serie_container);
//         });

//     } catch (error) {
//         errorSpan.innerText = "Oooops! Algo fallo al cargar las Series :( , Mensaje para el developer: " + error;
//         console.log("Error en funcion pupularSeries: " + error);
//     }
// }

// --- Axios ---
const pupularSeries = async () => {
    try {
        const { data, status } = await api(`/trending/tv/day?language=es`);

        if (status != "200") {
            console.log("Error en status de peticion de la funcion pupularSeries, status: " + status);
        }

        const series = data.results;        

        nodes.trendingSeriePreviewList.innerHTML = "";

        series.forEach((serie) => {
            const serie_container = document.createElement("div");
            serie_container.classList.add("serie-container");

            const serieImg = document.createElement("img");
            serieImg.classList.add("serie-img");
            serieImg.setAttribute("alt", serie.original_name);
            serieImg.setAttribute("src", `${imgUrl}${serie.poster_path}`);

            serie_container.appendChild(serieImg);
            nodes.trendingSeriePreviewList.appendChild(serie_container);
        });

    } catch (error) {
        errorSpan.innerText = "Oooops! Algo fallo al cargar las Series :( , Mensaje para el developer: " + error;
        console.log("Error en funcion pupularSeries: " + error);
    }
};

// GET para obtener las series en Tendencia

// --- Fetch ---
// const movieCategories = async (apiUrl) => {
//     try {
//         // console.log(ACCESS_TOKEN);
//         const res = await fetch(`${apiUrl}/genre/movie/list?language=es`, {
//             method: 'GET',
//             headers: {
//                 'accept': 'application/json',
//                 'Authorization': "Bearer " + ACCESS_TOKEN,
//             }
//         })

//         // Operador terneario para validar el status de la peticion
//         // res.status != "200"
//         // ? console.log("Error en el status en la funcion movieCategories, status: " + res.status)
//         // : console.log("todo chido con el status en movieCategories, status: " + res.status);

//         if (res.status != "200") {
//             console.log("Error en el status en la funcion movieCategories, status: " + res.status)
//         }

//         const data = await res.json();

//         const categories = data.genres;
//         // console.log(categories);

//         const categoriesArray = [];
//         const categoriesPreviewList = document.querySelector('#categoriesPreview .categoriesPreview-list');

//         categories.forEach(category => {
//             // console.log(category.name);

//             const categoryItem = `
//             <div class="category-container">
//             <h3 id="${"id"+category.id}" class="category-title">${category.name}</h3>
//           </div>
//             `

//             categoriesArray.push(categoryItem);
//         })

//         // console.log(categoriesArray);

//         const finalCategoriesElement = categoriesArray.join('');

//         // console.log(finalCategoriesElement);

//         categoriesPreviewList.innerHTML = finalCategoriesElement;

//     } catch (error) {
//         errorSpan.innerText = "Oooops, algo fallo al cargar las categorias :( , Mensaje para el Developer: " + error;
//         console.error(error);
//     }

// }
// --- Axios ---
const movieCategories = async () => {
    try {
        const { data, status } = await axiosBearer(`/genre/movie/list`, {
            params: {
                language: 'es-MX',
            }
        });

        // Operador terneario para validar el status de la peticion
        // res.status != "200"
        // ? console.log("Error en el status en la funcion movieCategories, status: " + res.status)
        // : console.log("todo chido con el status en movieCategories, status: " + res.status);

        if (status != "200") {
            console.log("Error en el status en la funcion movieCategories, status: " + status);
        }

        const categories = data.genres;
        // console.log(categories);

        const categoriesPreviewList = document.querySelector("#categoriesPreview .categoriesPreview-list");



        categoriesPreviewList.innerHTML = "";

        categories.forEach((category) => {

            const categoryId = category.id;
            const categoryName = category.name;

            const hash = `#category=${categoryId}-${categoryName}`;

            categoriesPreviewList.insertAdjacentHTML(
                "beforeend",
                `
            <div class="category-container">
            <h3 id="id${category.id}" class="category-title">${category.name}</h3>
            </div>
            `
            );

            // Event that calls the function to load movies by category
            const categoryTitle = document.querySelector(`#id${categoryId}`);
            categoryTitle.addEventListener("click", () => {
                console.log(category.id + " " + category.name);
                location.hash = hash;
            });
        });

        // console.log(categoriesArray);

        //const finalCategoriesElement = categoriesArray.join("");

        // console.log(finalCategoriesElement);

        //categoriesPreviewList.innerHTML = finalCategoriesElement;
    } catch (error) {
        errorSpan.innerText = "Oooops, algo fallo al cargar las categorias :( , Mensaje para el Developer: " + error;
        console.warn("Error toJSON(): ");
        //console.error(error.toJSON());
    }
};

const getMoviesByCategory = async (id) => {
    try {
        let { data, status } = await api("/discover/movie", {
            params: {
                with_genres: id,
                language: 'es-MX',
            },
        });

        if ((status = !200)) {
            console.log("Error en status de peticion, status: " + status);
        }

        const movies = data.results;

        createMovies(nodes.genericSection, movies);
        
        console.log(data.results);
    } catch (error) {
        console.error("Oooops, hubo un error al cargar esta categoria, mensaje para el desarrollador: Error en funcion getMoviesByCategory: " + error);
        errorSpan.innerText = "Oooops, hubo un error al cargar esta categoria, mensaje para el desarrollador: Error en funcion getMoviesByCategory: " + error;
    }
};

const getMoviesBySearch = async (query) => {
    try {
        let { data, status } = await api("/search/movie", {
            params: {
                query,
                language: 'es-MX',
            },
        });

        if ((status = !200)) {
            console.log("Error en status de peticion, status: " + status);
        }

        const movies = data.results;

        // Checamos si no se encontro ningun resultado
        if (movies.length == 0) {
            nodes.genericSection.innerHTML = "Ooops, no se encontraron resultados!, Intenta buscarlo con otro nombre";
        } else {
            createMovies(nodes.genericSection, movies);
        }

        
        console.log(data.results);
    } catch (error) {
        console.error("Oooops, hubo un error al cargar esta categoria, mensaje para el desarrollador: Error en funcion getMoviesByCategory: " + error);
        errorSpan.innerText = "Oooops, hubo un error al cargar esta categoria, mensaje para el desarrollador: Error en funcion getMoviesByCategory: " + error;
    }
}

const getMovieDetailsById = async (movieId) => {
    try {
        const {data, status} = await api(`/movie/${movieId}`);

        // console.log("MovieId: " + movieId);
    
        if (status != '200') {
            console.error("Error en status de getMovieDetailsById, status: " + status);
        }
    
        const movie = data;

        // Generamos el link de la imagen que pondremos con el formato de theMovieDB
        const movieImgUrl = imgUrl500 + movie.poster_path;
        console.log(movieImgUrl);

        // Ponemos la imagen de fondo de movieDetails
        nodes.headerSection.style.background = `
        linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),

        url(${movieImgUrl})
        `;

        // Titulo, descripcion, reviewAverage
        nodes.movieDetailTitle.innerText = movie.original_title;
        nodes.movieDetailDescription.innerText = movie.overview;
        nodes.movieDetailScore.innerText = movie.vote_average.toFixed(1);
        
        // Obtenemos las categorias de la pelicula
        const movieCategories = data.genres;
        console.log(movieCategories);

        
        // Limpiamos contenedor para evitar duplicidad
        nodes.movieDetailCategoriesList.innerHTML = "";

        // Maquetamos las categorias
        movieCategories.forEach(element => {
            nodes.movieDetailCategoriesList.insertAdjacentHTML(
                'beforeend',
                `
                <div class="category-container">
                <h3
                    id="id${element.id}"
                    class="category-title"
                >
                    ${element.name}
                </h3>
                </div>
                `
            );
        })


        // console.log(data);
        console.log('Title: ' + movie.original_title);
    } catch (error) {
        console.error("Error en funcion getMovieDetailsById, mensaje para el dev: " + error);
    }
}



// --- Fetch ---
// popularMovies(API_URL);
// pupularSeries(API_URL);
// movieCategories(API_URL);

// --- Axios ---
// Las llamamos en el archivo navigation.js
// popularMovies();
// pupularSeries();
// movieCategories();

export { popularMovies, pupularSeries, movieCategories, getMoviesByCategory, getMoviesBySearch, getMovieDetailsById };

// Test comment git
