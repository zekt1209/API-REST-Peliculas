<<<<<<< HEAD
import { popularMovies, pupularSeries, movieCategories, getMoviesByCategory, getMoviesBySearch, trendingMovies } from "./main.mjs";
=======
import { popularMovies, pupularSeries, getTrendingMovies, movieCategories, getMoviesByCategory, getMoviesBySearch, getMovieDetailsById, getSerieDetailsById, getPaginatedTrendingMovies, getPaginatedMoviesBySearch, getPaginatedMoviesByCategory, getFavoriteMoviesFromLS } from "./main.mjs";
>>>>>>> 83dfdfc4813f98c0e24d5b21a76525a09be2289f
import * as nodes from "./nodes.mjs";

// Mostrar la pagina 1 por defecto cuando utilicemos paginacion en el infinite scrolling
let page = 1;

// Funcion para incrementar la pagina, llamarla desde main.js en ves de poner page++ alla, ya que cuando exportas una variable, del otro lado se recibe como const, no imprta como fue declarada, es por eso que aqui mismo hacemos la operacion que tengamos que hacer con la variable y la encapsulamos en una funcion
const incPage = () => {
    page++;
}

// Esta variable va a cambiar por el nombre de la funcion de paginacion dependiendo de la pagina donde estemos p.e. getPaginatedTrendingMovies
let infiniteScrolling;


// Eventos que manipulan al DOM para la navegacion

nodes.searchFormBtn.addEventListener("click", () => {
    location.hash = "#search=" + nodes.searchFormInput.value;
});

nodes.trendingBtn.addEventListener("click", () => {
    location.hash = "#trends=";
});

nodes.arrowBtn.addEventListener("click", () => {
    console.log("Click arrow button");
<<<<<<< HEAD
    nodes.errorSpan.innerHTML = "";
    window.history.back();
=======
    window.history.go(-1);
>>>>>>> 83dfdfc4813f98c0e24d5b21a76525a09be2289f
});

// Eventos para manipular el DOM al cargar y al cambiar de hash

window.addEventListener("DOMContentLoaded", navigation, false);
window.addEventListener("hashchange", navigation, false);
window.addEventListener("scroll", infiniteScrolling, false);

export default function navigation() {
    console.log ({location});

    // Removemos el eventLintener de la funcion paginadora y limpiamos la variable para que despues de la navegacion, la asigne en caso de que esa pagina necesita paginacion (Mas ababo en esta funcion la volvemos a asignar)
    if (infiniteScrolling) {
        window.removeEventListener("scroll", infiniteScrolling, {passive: false});
        infiniteScrolling = undefined;
    }

    // Sintaxis else if con operadores ternarios
    /*
    location.hash.startsWith("#trends")
        ? trendsPage()
        : location.hash.startsWith("#search=")
        ? searchPage()
        : location.hash.startsWith("#movie=")
        ? movieDetailsPage()
        : location.hash.startsWith("#category=")
        ? categoryPage()
        : homePage();
        */

        if (location.hash.startsWith("#trends")) {
            trendsPage();
        } 
        else if (location.hash.startsWith("#search=")) {
            searchPage();
        } 
        else if (location.hash.startsWith("#movie=")) {
            movieDetailsPage();
        } 
        else if (location.hash.startsWith("#serie=")) {
            serieDetailsPage();
        } 
        else if (location.hash.startsWith("#category=")) {
            categoryPage();
        } 
        else {
            homePage();
        }

        if (infiniteScrolling) {
            window.addEventListener("scroll", infiniteScrolling, {passive: false});
        }
        
}

function homePage() {
    console.log("Home!");

    nodes.headerSection.classList.remove("header-container--long");
    nodes.headerSection.style.background = "";
    nodes.arrowBtn.classList.add("inactive");
    nodes.arrowBtn.classList.remove("header-arrow--white");
    nodes.headerTitle.classList.remove("inactive");
    nodes.headerCategoryTitle.classList.add("inactive");
    nodes.searchForm.classList.remove("inactive");

    nodes.trendingPreviewSection.classList.remove("inactive");
    nodes.categoriesPreviewSection.classList.remove("inactive");
    nodes.genericSection.classList.add("inactive");
    nodes.movieDetailSection.classList.add("inactive");
    nodes.likedMoviesSection.classList.remove("inactive");

    popularMovies();
    pupularSeries();
    movieCategories();
    getFavoriteMoviesFromLS();
}

const trendsPage = () => {
    console.log("Trends!");

    nodes.headerSection.classList.remove("header-container--long");
    nodes.headerSection.style.background = "";
    nodes.arrowBtn.classList.remove("inactive");
    nodes.arrowBtn.classList.remove("header-arrow--white");
    nodes.headerTitle.classList.add("inactive");
    nodes.headerCategoryTitle.classList.remove("inactive");
    nodes.searchForm.classList.add("inactive");

    nodes.trendingPreviewSection.classList.add("inactive");
    nodes.categoriesPreviewSection.classList.add("inactive");
    nodes.genericSection.classList.remove("inactive");
    nodes.movieDetailSection.classList.add("inactive");
<<<<<<< HEAD

    nodes.headerCategoryTitle.innerHTML = "Peliculas en Tendencias";

    trendingMovies();
=======
    nodes.likedMoviesSection.classList.add("inactive");

    // Le ponemos el titulo a la vista de Tendencias
    nodes.headerCategoryTitle.innerText = 'Tendencias';

    getTrendingMovies();

    infiniteScrolling = getPaginatedTrendingMovies;
>>>>>>> 83dfdfc4813f98c0e24d5b21a76525a09be2289f
};

const searchPage = () => {
    console.log("Search!");

    nodes.headerSection.classList.remove("header-container--long");
    nodes.headerSection.style.background = "";
    nodes.arrowBtn.classList.remove("inactive");
    nodes.arrowBtn.classList.remove("header-arrow--white");
    nodes.headerTitle.classList.add("inactive");
    nodes.headerCategoryTitle.classList.remove("inactive");
    nodes.searchForm.classList.remove("inactive");

    nodes.trendingPreviewSection.classList.add("inactive");
    nodes.categoriesPreviewSection.classList.add("inactive");
    nodes.genericSection.classList.remove("inactive");
    nodes.movieDetailSection.classList.add("inactive");
    nodes.likedMoviesSection.classList.add("inactive");

/*
        // #search=Spiderman
    const pageHash = location.hash.split("=");
    // ['#search', 'Spiderman']
    const query = pageHash[1];
*/
    const [_, query] = location.hash.split('='); 
    const queryDecoded = decodeURI(query);
    // Le ponemos el titulo buscado
<<<<<<< HEAD
    nodes.headerCategoryTitle.innerHTML = "Se muestran resultados de: " + queryDecoded;
    getMoviesBySearch(queryDecoded);
=======
    nodes.headerCategoryTitle.innerHTML = "Se muestran resultados de: " + decodeURI(query);

    // Llamamos a la funcion que se encarga de hacer el llamado a la API
    getMoviesBySearch(query);

    // Le asignamos a la variable infiniteScrolling el nombre de la funcion que se va a ejecutar para la paginacion
    infiniteScrolling = getPaginatedMoviesBySearch(query);
>>>>>>> 83dfdfc4813f98c0e24d5b21a76525a09be2289f
};

const movieDetailsPage = () => {
    console.log("Movie details!");

    //console.log("Categories!");

    window.scrollTo(0, 0);

    nodes.headerSection.classList.add("header-container--long");
    // nodes.headerSection.style.background = "";
    nodes.arrowBtn.classList.remove("inactive");
    nodes.arrowBtn.classList.add("header-arrow--white");
    nodes.headerTitle.classList.add("inactive");
    nodes.headerCategoryTitle.classList.add("inactive");
    nodes.searchForm.classList.add("inactive");

    nodes.trendingPreviewSection.classList.add("inactive");
    nodes.categoriesPreviewSection.classList.add("inactive");
    nodes.genericSection.classList.add("inactive");
    nodes.movieDetailSection.classList.remove("inactive");
    nodes.likedMoviesSection.classList.add("inactive");
    
    const pageHash = location.hash.split("="); // -> ['#movie=', '569094-Spider-Man']
    const hashContent = pageHash[1].split("-"); // -> ['569094', 'Spider', 'Man']
    const movieId = hashContent[0]; // -> ['569094']

    getMovieDetailsById(movieId);

};

const serieDetailsPage = () => {
    console.log("Serie Details!");

    //console.log("Categories!");

    window.scrollTo(0, 0);

    nodes.headerSection.classList.add("header-container--long");
    // nodes.headerSection.style.background = "";
    nodes.arrowBtn.classList.remove("inactive");
    nodes.arrowBtn.classList.add("header-arrow--white");
    nodes.headerTitle.classList.add("inactive");
    nodes.headerCategoryTitle.classList.add("inactive");
    nodes.searchForm.classList.add("inactive");

    nodes.trendingPreviewSection.classList.add("inactive");
    nodes.categoriesPreviewSection.classList.add("inactive");
    nodes.genericSection.classList.add("inactive");
    nodes.movieDetailSection.classList.remove("inactive");
    nodes.likedMoviesSection.classList.add("inactive");
    
    const pageHash = location.hash.split("="); // -> ['#movie=', '569094-Spider-Man']
    const hashContent = pageHash[1].split("-"); // -> ['569094', 'Spider', 'Man']
    const serieId = hashContent[0]; // -> ['569094']

    getSerieDetailsById(serieId);

}

const categoryPage = () => {
    console.log("Categories!");
    window.scrollTo(0,0);

    nodes.headerSection.classList.remove("header-container--long");
    nodes.headerSection.style.background = "";
    nodes.arrowBtn.classList.remove("inactive");
    nodes.arrowBtn.classList.remove("header-arrow--white");
    nodes.headerTitle.classList.add("inactive");
    nodes.headerCategoryTitle.classList.remove("inactive");
    nodes.searchForm.classList.add("inactive");

    nodes.trendingPreviewSection.classList.add("inactive");
    nodes.categoriesPreviewSection.classList.add("inactive");
    nodes.genericSection.classList.remove("inactive");
    nodes.movieDetailSection.classList.add("inactive");
    nodes.likedMoviesSection.classList.add("inactive");

    // #category=27-Terror
    const pageHash = location.hash.split("=");
    // ['#category', '27-Terror']
    const hashContent = pageHash[1].split("-");
    // ['27', 'Terror']
    const categoryId = hashContent[0];
    const categoryTitle = decodeURI(hashContent[1]);

    console.log(pageHash);
    console.log(hashContent);
    console.log(categoryId);

    nodes.headerCategoryTitle.innerHTML = categoryTitle;

    getMoviesByCategory(categoryId);

    infiniteScrolling = getPaginatedMoviesByCategory(categoryId)
};

// navigation();

export {page, incPage, homePage};