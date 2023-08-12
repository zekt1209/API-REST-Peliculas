import { popularMovies, pupularSeries, movieCategories, getMoviesByCategory, getMoviesBySearch } from "./main.mjs";
import * as nodes from "./nodes.mjs";


// Eventos que manipulan al DOM para la navegacion

nodes.searchFormBtn.addEventListener("click", () => {
    location.hash = "#search=" + nodes.searchFormInput.value;
});

nodes.trendingBtn.addEventListener("click", () => {
    location.hash = "#trends=";
});

nodes.arrowBtn.addEventListener("click", () => {
    console.log("Click arrow button");
    window.history.back();
});

// Eventos para manipular el DOM al cargar y al cambiar de hash

window.addEventListener("DOMContentLoaded", navigation, false);
window.addEventListener("hashchange", navigation, false);

export default function navigation() {
    // console.log ({location});

    // Sintaxis else if con operadores ternarios
    location.hash.startsWith("#trends")
        ? trendsPage()
        : location.hash.startsWith("#search=")
        ? searchPage()
        : location.hash.startsWith("#movie=")
        ? moviePage()
        : location.hash.startsWith("#category=")
        ? categoryPage()
        : homePage();
    popularMovies();
    pupularSeries();
    movieCategories();
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
/*
        // #search=Spiderman
    const pageHash = location.hash.split("=");
    // ['#search', 'Spiderman']
    const query = pageHash[1];
*/
    const [_, query] = location.hash.split('='); 
    // Le ponemos el titulo buscado
    nodes.headerCategoryTitle.innerHTML = "Se muestran resultados de: " + decodeURI(query);
    getMoviesBySearch(query);
};

const moviePage = () => {
    console.log("Movie!");

    console.log("Categories!");

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
};

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
};

// navigation();
