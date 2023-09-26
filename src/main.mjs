// import fetch from "node-fetch";
import API_KEY, { ACCESS_TOKEN } from "./secrets.mjs";
import navigation from "./navigation.mjs";
import * as nodes from "./nodes.mjs";
//import {num1} from './nodes.mjs';

// const API_KEY = '17b0beeb5b0f389cd983177de5c30a80';
const API_URL = "https://api.themoviedb.org/3";
const imgUrl = "http://image.tmdb.org/t/p/w300";
const imgUrl500 = "http://image.tmdb.org/t/p/w500";

// Mostrar la pagina 1 por defecto cuando utilicemos paginacion en el infinite scrolling
let page = 1;

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

const posterPorDefecto = "https://media.comicbook.com/files/img/default-movie.png";

const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

        //console.log(entry.target.setAttribute);

        if (entry.isIntersecting) {
            const url = entry.target.getAttribute('data-img');
            // console.log(entry.target);
            entry.target.setAttribute('src', url);
                // const url = movieImg.getAttribute('data-img');
                // movieImg.setAttribute('src', url);
        }
        
        // Dejamos de observar al elemento una vez que ya haya sido cargado
        // lazyLoader.unobserve(entry);

    })
});

const createMovies = (parentContainer, dataResultArray, {lazyLoad = false, clean = true} = {}) => {

        if (clean) {
            // Seleccionamos el container en HTML donde vamos a insertar el componente de peliculas que vamos a maquetar con info de la API
            parentContainer.innerHTML = "";
        }

        // // Hacemos scroll al principio de la lista siempre
        parentContainer.scrollTo(0,0);

        // Limpiamos el contenedor de peliculas
        //nodes.trendingMoviesPreviewList.innerHTML = '';

        dataResultArray.forEach((movie) => {
            const movie_container = document.createElement("div");
            movie_container.classList.add("movie-container");

            const movieImg = document.createElement("img");
            movieImg.classList.add("movie-img");
            movieImg.setAttribute("alt", movie.title);
            //movieImg.setAttribute("custom-attt", 'test');

            // Mi opcion de manejo de error cuando no se encuentra el poster
            /*
            let poster = '';

            if (!movie.poster_path) {
                poster = 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg'
            } else {
                poster = `${imgUrl}${movie.poster_path}`
            }
            */

            // console.log(poster);


            movieImg.setAttribute(
                lazyLoad ? "data-img" : "src", 
                `${imgUrl}${movie.poster_path}`
                );

            // Manejo de error de carga del poster
            movieImg.addEventListener('error', () => {
                movieImg.setAttribute('src', 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg');
            });

            if (lazyLoad) {
                lazyLoader.observe(movieImg);
            }


            movie_container.appendChild(movieImg);
            parentContainer.appendChild(movie_container);

            // eventListener para detalles de una pelicula
            movie_container.addEventListener('click', () => {
                // Sacamos el id
                const movieId = movie.id;

                // Sacamos el name
                let movieName = decodeURI(movie.title);
                movieName = movieName.replaceAll(" ",'-');

                // Asignamos el hash de movieDetails
                location.hash = `movie=${movieId}-${movieName}`;
            })

        });
}

const createSeries = (parentContainer, dataResultArray, lazyLoad = false) => {

        // Limpiamos el contenedor de peliculas
        parentContainer.innerHTML = "";

        // Hacemos scroll al principio de la lista siempre
        parentContainer.scrollTo(0,0);

        dataResultArray.forEach((serie) => {
            const serie_container = document.createElement("div");
            serie_container.classList.add("serie-container");

            const serieImg = document.createElement("img");
            serieImg.classList.add("serie-img");
            serieImg.setAttribute("alt", serie.name);
            serieImg.setAttribute(lazyLoad ? "data-img" : "src", `${imgUrl}${serie.poster_path}`);

            if (lazyLoad) {
                lazyLoader.observe(serieImg);
            }

            serie_container.appendChild(serieImg);
            parentContainer.appendChild(serie_container);

            // eventListener para detalles de una pelicula
            serie_container.addEventListener('click', () => {
                // Sacamos el id
                const serieId = serie.id;

                // Sacamos el name
                let serieName = decodeURI(serie.name);
                serieName = serieName.replaceAll(" ",'-');

                // Asignamos el hash de serieDetails
                location.hash = `serie=${serieId}-${serieName}`;
            })

        });
}

const createCategories = (parentContainer, dataResultArray) => {
            // Seleccionamos el container en HTML donde vamos a insertar el componente de peliculas que vamos a maquetar con info de la API
            parentContainer.innerHTML = "";

            // dataResultArray.forEach(category => {

            //     const categoryId = category.id;
            //     const categoryName = category.name;
    
            //     //const hash = `#category=${category.id}-${category.name}`;
    
            //     parentContainer.insertAdjacentHTML(
            //         "beforeend",
            //         `
            //     <div class="category-container">
            //     <h3 id="id${category.id}" class="category-title">${category.name}</h3>
            //     </div>
            //     `
            //     );
    
            //     // Event that calls the function to load movies by category
            //     const categoryTitle = document.querySelector(`#id${category.id}`);
            //     categoryTitle.addEventListener("click", () => {
            //         console.log(category.id + " " + category.name);
            //         location.hash = `#category=${category.id}-${category.name}`;
            //     });
            // });

            dataResultArray.forEach(category => {  
                const categoryContainer = document.createElement('div');
                categoryContainer.classList.add('category-container');
            
                const categoryTitle = document.createElement('h3');
                categoryTitle.classList.add('category-title');
                categoryTitle.setAttribute('id', 'id' + category.id);
                categoryTitle.addEventListener('click', () => {
                  location.hash = `#category=${category.id}-${category.name}`;
                });
                const categoryTitleText = document.createTextNode(category.name);
            
                categoryTitle.appendChild(categoryTitleText);
                categoryContainer.appendChild(categoryTitle);
                parentContainer.appendChild(categoryContainer);
              });
}



// Llamados a la API


// *** GET para obtener las peliculas en Tendencia preview***

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
//         nodes.errorSpan.innerText = "Oooops! Algo fallo al cargar las Peliculas :( , Mensaje para el developer: " + error;
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
        // console.log(movies);

        createMovies(nodes.trendingMoviesPreviewList, movies, {lazyLoad: true, clean: true});
    } catch (error) {
        nodes.errorSpan.innerText = "Oooops! Algo fallo al cargar las Peliculas :( , Mensaje para el developer: " + error;
        console.log(error);
    }
};

// GET para obtener las series en Tendencia preview

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
//         nodes.errorSpan.innerText = "Oooops! Algo fallo al cargar las Series :( , Mensaje para el developer: " + error;
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
        // console.log(series);        

        // Vieja estructura
        /*
        nodes.trendingSeriePreviewList.innerHTML = "";

        series.forEach((serie) => {
            const serie_container = document.createElement("div");
            serie_container.classList.add("serie-container");

            const serieImg = document.createElement("img");
            serieImg.classList.add("serie-img");
            serieImg.setAttribute("alt", serie.original_name);
            serieImg.setAttribute("src", `${imgUrl}${serie.poster_path}`);

            // serie_container.addEventListener('click', () => {

            // });

            serie_container.appendChild(serieImg);
            nodes.trendingSeriePreviewList.appendChild(serie_container);
        });
        */

        // Nueva estructura escalable
        createSeries(nodes.trendingSeriePreviewList, series, true);

    } catch (error) {
        nodes.errorSpan.innerText = "Oooops! Algo fallo al cargar las Series :( , Mensaje para el developer: " + error;
        console.log("Error en funcion pupularSeries: " + error);
    }
};

// GET para la vista de peliculas en Tendencia
const getTrendingMovies = async () => {
    const {data, status} = await api(`/trending/movie/day`);

    if (status != '200') {
        console.log('Error en el STATUS: ' + status);
    }

    const movies = data.results;

    console.log(data);
    console.log(movies);
    // console.log()

    createMovies(nodes.genericSection, movies, {lazyLoad:true, clean:true});

    // const btnLoadMore = document.createElement('button');
    // btnLoadMore.innerText = 'Cargar mas';

    // btnLoadMore.addEventListener('click', () => {
    //     btnLoadMore.style.display = 'none';
    //     getPaginatedTrendingMovies();
    // });

    
    // nodes.genericSection.appendChild(btnLoadMore);
    
    window.addEventListener('scroll', () => {
        getPaginatedTrendingMovies();
    });
};

const getPaginatedTrendingMovies = async () => {

    // let scrollTop = document.documentElement.scrollTop;
    // let clientHeight = document.documentElement.clientHeight;
    // let scrollHeight = document.documentElement.scrollHeight;

    const {scrollTop, 
        clientHeight, 
        scrollHeight} = document.documentElement;

    if ((scrollTop + clientHeight) >= (scrollHeight - 139)) {
        
        page ++;
        
        try {
            const {data, status} = await api('/trending/movie/day', {
                params: {
                    page,
                }
            });
            
            if (status != '200') {
                console.warn("Status error: " + error);
            }
            
            const movies = data.results;
            console.log("Hey, new page has loaded: " + page);
            console.log(movies);
        
            createMovies(nodes.genericSection, movies, {lazyLoad: true, clean: false});
    
            // const btnLoadMore = document.createElement('button');
            // btnLoadMore.innerText = 'Cargar mas';
        
            // btnLoadMore.addEventListener('click', () => {
            //     btnLoadMore.style.display = 'none';
            //     getPaginatedTrendingMovies();
            // });
    
        
            // nodes.genericSection.appendChild(btnLoadMore);

        } catch (e) {
            nodes.errorSpan.innerText = 'Ooops, algo fallo en la funcion getPaginatedTrendingMovies, error: ' + e;
            console.warn("Error en la funcion getPaginatedTrendingMovies: " + e);
        }
    }








}

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
//         nodes.errorSpan.innerText = "Oooops, algo fallo al cargar las categorias :( , Mensaje para el Developer: " + error;
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

        /*

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

        */

        createCategories(nodes.categoriesPreviewList, categories);

        // console.log(categoriesArray);

        //const finalCategoriesElement = categoriesArray.join("");

        // console.log(finalCategoriesElement);

        //categoriesPreviewList.innerHTML = finalCategoriesElement;
    } catch (error) {
        nodes.errorSpan.innerText = "Oooops, algo fallo al cargar las categorias :( , Mensaje para el Developer: " + error;
        console.warn("Error toJSON(): ");
        //console.error(error.toJSON());
    }
};

const getMoviesByCategory = async (id, moviesByCategoryPage = 1) => {
    try {
        // Set the page we will show at the beginning in 1

        let { data, status } = await api("/discover/movie", {
            params: {
                with_genres: id,
                language: 'es-MX',
                page: moviesByCategoryPage,
            },
        });

        if ((status = !200)) {
            console.log("Error en status de peticion, status: " + status);
        }

        const movies = data.results;

        createMovies(nodes.genericSection, movies, {lazyLoad:true, clean: moviesByCategoryPage == 1}); // Seteamos que solo limpie si es la primera pagina

        const btnLoadMore = document.createElement('button');
        btnLoadMore.innerText = 'Cargar mas';

        btnLoadMore.addEventListener('click', () => {
            getMoviesByCategory(id, moviesByCategoryPage + 1)
            btnLoadMore.remove();
        });

        nodes.genericSection.appendChild(btnLoadMore);
        
        //console.log(data.results);
    } catch (error) {
        console.error("Oooops, hubo un error al cargar esta categoria, mensaje para el desarrollador: Error en funcion getMoviesByCategory: " + error);
        nodes.errorSpan.innerText = "Oooops, hubo un error al cargar esta categoria, mensaje para el desarrollador: Error en funcion getMoviesByCategory: " + error;
    }
};

const getMoviesBySearch = async (query, page = 1) => {
    // on theMovieDB > SEARCH > Movies
    try {
        let { data, status } = await api("/search/movie", {
            params: {
                query,
                language: 'es-MX',
                page,
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
            createMovies(nodes.genericSection, movies, {lazyLoad:true, clean: page == 1});
        }

        const btnLoadMore = document.createElement('button');
        btnLoadMore.innerText = "Cargar mas";

        btnLoadMore.addEventListener('click', () => {
            getMoviesBySearch(query, page + 1);
            btnLoadMore.remove();
        });

        nodes.genericSection.appendChild(btnLoadMore);
        
        //console.log(data.results);
    } catch (error) {
        console.error("Oooops, hubo un error al cargar esta categoria, mensaje para el desarrollador: Error en funcion getMoviesByCategory: " + error);
        nodes.errorSpan.innerText = "Oooops, hubo un error al cargar esta categoria, mensaje para el desarrollador: Error en funcion getMoviesByCategory: " + error;
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
        //console.log(movieImgUrl);

        console.log("POSTER_PATH: " + movie.poster_path);

        // Validamos que el poster de fondo exista, sino ponemos una imagen por defecto
        if (movie.poster_path) {

            // Ponemos la imagen de fondo de movieDetails
            nodes.headerSection.style.background = `
            linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
    
            url(${movieImgUrl})
            `;

        } else {
            
            // console.log("ERROR CON EL POSTER !!! ");

            nodes.headerSection.style.background = `
            linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
    
            url(${posterPorDefecto})
            `;
    
        }



        
        // Titulo, descripcion, reviewAverage
        nodes.movieDetailTitle.innerText = movie.title;
        nodes.movieDetailDescription.innerText = movie.overview;
        nodes.movieDetailScore.innerText = movie.vote_average.toFixed(1);
        
        // Obtenemos las categorias de la pelicula
        //const movieCategories = data.genres;
        //console.log(movieCategories);

        createCategories(nodes.movieDetailCategoriesList, movie.genres);


        /*
        // Limpiamos contenedor para evitar duplicidad
        nodes.movieDetailCategoriesList.innerHTML = "";

        // Maquetamos las categorias
        movieCategories.forEach((category) => {

            const categoryId = category.id;
            const categoryName = category.name;

            const hash = `#category=${categoryId}-${categoryName}`;

            nodes.movieDetailCategoriesList.insertAdjacentHTML(
                'beforeend',
                `
                <div class="category-container">
                <h3
                    id="id${category.id}"
                    class="category-title"
                >
                    ${category.name}
                </h3>
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
*/


        // Agregar peliculas similares
        getRelatedMoviesFromMovieDetails(movieId);


        // console.log(data);
        console.log('Title: ' + movie.original_title);
    } catch (error) {
        console.error("Error en funcion getMovieDetailsById, mensaje para el dev: " + error);
    }
}

const getSerieDetailsById = async (serieId) => {
    try {
        const {data, status} = await api(`/tv/${serieId}`, {
            params: {
            language: 'es-MX'
        }
    });

        // console.log("MovieId: " + movieId);
    
        if (status != '200') {
            console.error("Error en status de getSerieDetailsById, status: " + status);
        }
    
        const serie = data;

        // console.log(serie)

        // Generamos el link de la imagen que pondremos con el formato de theMovieDB
        const serieImgUrl = imgUrl500 + serie.poster_path;
        //console.log(serieImgUrl);

        if (serie.poster_path) {

            // Ponemos la imagen de fondo de serieDetails
            nodes.headerSection.style.background = `
            linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
    
            url(${serieImgUrl})
            `;

        } else {

            // Ponemos la imagen de fondo de serieDetails
            nodes.headerSection.style.background = `
            linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
    
            url(${posterPorDefecto})
            `;

        }


        // Titulo, descripcion, reviewAverage
        nodes.movieDetailTitle.innerText = serie.name;
        nodes.movieDetailDescription.innerText = serie.overview;
        nodes.movieDetailScore.innerText = serie.vote_average.toFixed(1);
        
        // Obtenemos las categorias de la pelicula
        //const serieCategories = serie.genres;
        //console.log(serieCategories);

        createCategories(nodes.movieDetailCategoriesList, serie.genres);

        /*
        // Limpiamos contenedor para evitar duplicidad
        nodes.movieDetailCategoriesList.innerHTML = "";

        // Maquetamos las categorias
        movieCategories.forEach((category) => {

            const categoryId = category.id;
            const categoryName = category.name;

            const hash = `#category=${categoryId}-${categoryName}`;

            nodes.movieDetailCategoriesList.insertAdjacentHTML(
                'beforeend',
                `
                <div class="category-container">
                <h3
                    id="id${category.id}"
                    class="category-title"
                >
                    ${category.name}
                </h3>
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
*/

        // Agregar Series similares
        getRelatedSeriesFromMovieDetails(serieId);


        // console.log(data);
        //console.log('Name: ' + serie.name);
    } catch (error) {
        console.error("Error en funcion getSerieDetailsById, mensaje para el dev: " + error);
    }
}




const getRelatedMoviesFromMovieDetails = async (movieId) => {
    const {data, status} = await api(`/movie/${movieId}/similar`);

    if (status != '200') {
        console.warn(`Status: ${status} en funcion getRelatedMoviesFromMovieDetails`);
    }

    const relatedMovies = data.results;

    console.log(relatedMovies);
    console.log(data.results[19].poster_path);

    // Estructura vieja
    /*

    // Limpiamos el contenedor para evitar duplicidad
    nodes.relatedMoviesContainer.innerHTML = "";
    //console.log(relatedMovies);

    // Hacemos scroll al principio de la lista siempre
    nodes.relatedMoviesContainer.scrollTo(0,0);

    relatedMovies.forEach(movie => {
        nodes.relatedMoviesContainer.insertAdjacentHTML('beforeend',
        `
        <div id="id${movie.id}" class="movie-container">
            <img
                src="${imgUrl}${movie.poster_path}"
                class="movie-img"
                alt="${movie.title}"
            />
        </div>
        `
        );

        // Evento al clickear a la pelicula similar
        const movieContainer = document.querySelector(`#id${movie.id}`);
        movieContainer.addEventListener('click', () => {
            // Sacamos el id
            const movieId = movie.id;

            // Sacamos el name
            let movieName = decodeURI(movie.title);
            movieName = movieName.replaceAll(" ",'-');

            // Asignamos el hash de movieDetails
            location.hash = `movie=${movieId}-${movieName}`;
        })

    });

    */

    // Estructura nueva
    createMovies(nodes.relatedMoviesContainer, relatedMovies, {lazyLoad:true, clean:true});

}

const getRelatedSeriesFromMovieDetails = async (serieId) => {

    try {

        const {data, status} = await api(`/tv/${serieId}/similar`);
    
        if (status != '200') {
            console.warn(`Status: ${status} en funcion getRelatedSeriesFromSerieDetails`);
        }
    
        const relatedSeries = data.results;
    
        // Estructura vieja
        /*
        
        // Limpiamos el contenedor para evitar duplicidad
        nodes.relatedMoviesContainer.innerHTML = "";
        //console.log(relatedMovies);
    
        // Hacemos scroll al principio de la lista siempre
        nodes.relatedMoviesContainer.scrollTo(0,0);
    
        relatedSeries.forEach(serie => {
            nodes.relatedMoviesContainer.insertAdjacentHTML('beforeend',
            `
            <div id="id${movie.id}" class="movie-container">
                <img
                    src="${imgUrl}${movie.poster_path}"
                    class="movie-img"
                    alt="${movie.title}"
                />
            </div>
            `
            );
    
            
    
            // Evento al clickear a la pelicula similar
            const movieContainer = document.querySelector(`#id${movie.id}`);
            movieContainer.addEventListener('click', () => {
                // Sacamos el id
                const movieId = movie.id;
    
                // Sacamos el name
                let movieName = decodeURI(movie.title);
                movieName = movieName.replaceAll(" ",'-');
    
                // Asignamos el hash de movieDetails
                location.hash = `movie=${movieId}-${movieName}`;
            })
    
    
    
        });
    
        */
    
        // Estructura nueva
        createMovies(nodes.relatedMoviesContainer ,relatedSeries, {lazyLoad:true, clean:true});

    } catch (e) {
        console.log('Error en funcion getRelatedSeriesFromMovieDetails: ' + e);
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

export { popularMovies, pupularSeries, getTrendingMovies, movieCategories, getMoviesByCategory, getMoviesBySearch, getMovieDetailsById, getSerieDetailsById};

// Test comment git
