import {popularMovies, pupularSeries, movieCategories} from "./main.mjs";
import * as nodes from "./nodes.mjs";

window.addEventListener('DOMContentLoaded', navigation, false);
window.addEventListener('hashchange', navigation, false);


export default function navigation() {
    // console.log ({location});

    if (location.hash.startsWith("#trends")) {
        trendsPage();
    }
    else if (location.hash.startsWith("#search=")) {
        searchPage();
    }
    else if (location.hash.startsWith("#movie=")) {
        moviePage();
    }
    else if (location.hash.startsWith("#category=")) {
        categoryPage();
    } else {
        homePage();
        nodes.headerSection.classList.remove('header-container--long');
        nodes.headerSection.style.background = '';
        nodes.arrowBtn.classList.add('inactive');
        nodes.headerTitle.classList.remove('inactive');
        nodes.headerCategoryTitle.classList.add('inactive');
        nodes.searchForm.classList.remove('inactive');

        nodes.trendingPreviewSection.classList.remove('inactive');
        nodes.categoriesPreviewSection.classList.remove('inactive');
        nodes.genericSection.classList.add('inactive');
        nodes.movieDetailSection.classList.add('inactive');
        

        popularMovies();
        pupularSeries();
        movieCategories();
    }
    
}

function homePage() {
    console.log("Home!")
}

const trendsPage = () => {
    console.log("Trends!");
}

const searchPage = () => {
    console.log("Search!");
}
 
const moviePage = () => {
    console.log("Movie!");
}

const categoryPage = () => {
    console.log("Categories!");
}

// navigation();