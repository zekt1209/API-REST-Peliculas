import { popularMovies, pupularSeries, movieCategories } from "./main.mjs";
import * as nodes from "./nodes.mjs";

nodes.searchFormBtn.addEventListener("click", () => {
    location.hash = "#search=";
});

nodes.trendingBtn.addEventListener("click", () => {
    location.hash = "#trends=";
});

nodes.arrowBtn.addEventListener("click", () => {
    location.hash = "#home";
});

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

// navigation();
