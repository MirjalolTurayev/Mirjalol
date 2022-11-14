"use strict";
movies.splice(50);

// ------NORMALIZE ALL MOVIES start-----------//

const allMovies = movies.map((movies) => {
    return {
        title: movies.title,
        year: movies.year,
        lang: movies.language,
        categories: movies.categories,
        id: movies.imdbId,
        time: `${Math.floor(movies.runtime / 60)}h ${movies.runtime % 60}m`,
        summary: movies.summary,
        link: `https://www.youtube.com/embed/${movies.youtubeId}`,
        maxImg: movies.bigThumbnail,
        minImg: movies.smallThumbnail,
        rating: movies.imdbRating,
    };
});
// console.log(allMovies);

// ------NORMALIZE ALL MOVIES end -----------//

// ------RENDER ALL MOVIES start -----------//

function renderAllMovies() {
    allMovies.forEach((el) => {
        // console.log(el);
        const card = document.createElement("div");
        card.classList.add("shadow-lg", "card");
        card.innerHTML = `
        <img src="${el.minImg}" alt="img" class="card-img">
                                <div class="card-body">
                                    <h4 class="card-title">
                                    ${el.title}
                                    </h4>
                                    <ul class="list-unstyled">
                                        <li>
                                            <strong>Year:${el.year} </strong>
                                        </li>
                                        <li>
                                            <strong>Language: ${el.lang} </strong>
                                        </li>
                                        <li>
                                            <strong>Rating:${el.rating} </strong>
                                        </li>
                                        <li>
                                            <strong>Category:${el.categories} </strong>
                                        </li>
                                        <li>
                                            <strong>Runtime:${el.time} </strong>
                                        </li>
                                    </ul>

                                    <div class="social d-flex">
                                        <a href="${el.link}" class="btn btn-primary m-2">
                                            Youtube
                                        </a>
                                        <button class="btn btn-primary m-2">
                                            Trailers
                                        </button>
                                        <button class="btn btn-danger m-2">
                                            Add bookmark
                                        </button>
                                    </div>
                                </div>`;
        $(".wrapper").appendChild(card);
    });
}
renderAllMovies();

// ------RENDER ALL MOVIES end -----------//



//--------find films function start -----------//

const findFilms = (regexp, num) => {
    return allMovies.filter((film) => {
        return film.title.match(regexp) && film.rating >= num;
    });
};
// console.log(findFilms());

//--------find films function end -----------//

//--------find films listener start-----------//

$("#submitForm").addEventListener("submit", (e) => {
    e.preventDefault();
    $(".wrapper").innerHTML = `<span class="loader">Loading</span>`;
    const searchValue = $("#filmName").value;
    const regexp = new RegExp(searchValue, "gi");
    const ratingNumber = $('#filmRating').value
    const searchResult = findFilms(regexp, ratingNumber);
    console.log(ratingNumber);
    setTimeout(() => {
        if (searchResult.length > 0) {
            searchResultsRender(searchResult);
            $(".card-res").classList.remove("d-none");
            $(
                ".card-res"
            ).innerHTML = `<h4 class="text-success"><strong id="strong">${searchResult.length}</strong> ta ma'lumoy topildi</h4>`;
            if (searchValue.length === 0) {
                $(".card-res").classList.add("d-none");
            }
        } else {
            $(".card-res").classList.add("d-none");            
            $(".wrapper").innerHTML = '<h1 class="maltop">MALUMOT TOPILMADI</h1>';
        }
    }, 2000);
    // console.log(searchResult);
});

//--------find films listener end -----------//

// ------ searchResult render start -----------//

// data = [] => defolt parametr yani parametrning bosh qiymati 0 ga teng qachonki unga malumot kelgandan sung qiymatga ega buladi

function searchResultsRender(data = []) {
    $(".wrapper").innerHTML = "";
    data.forEach((el) => {
        // console.log(el);
        const card = document.createElement("div");
        card.classList.add("shadow-lg", "card");
        card.innerHTML = `
        <img src="${el.minImg}" alt="img" class="card-img">
                                <div class="card-body">
                                    <h4 class="card-title">
                                    ${el.title}
                                    </h4>
                                    <ul class="list-unstyled">
                                        <li>
                                            <strong>Year:${el.year} </strong>
                                        </li>
                                        <li>
                                            <strong>Language: ${el.lang} </strong>
                                        </li>
                                        <li>
                                            <strong>Rating:${el.rating} </strong>
                                        </li>
                                        <li>
                                            <strong>Category:${el.categories} </strong>
                                        </li>
                                        <li>
                                            <strong>Runtime:${el.time} </strong>
                                        </li>
                                    </ul>

                                    <div class="social d-flex">
                                        <a href="${el.link}" class="btn btn-primary m-2">
                                            Youtube
                                        </a>
                                        <button class="btn btn-primary m-2">
                                            Trailers
                                        </button>
                                        <button class="btn btn-danger m-2">
                                            Add bookmark
                                        </button>
                                    </div>
                                </div>`;
        $(".wrapper").appendChild(card);
    });
}

// ------ searchResult render end -----------//
