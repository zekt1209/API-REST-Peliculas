import {popularMovies, pupularSeries, movieCategories} from "./main.mjs";

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