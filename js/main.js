// ============== HTML ELEMENTS ============
const elForm = $_(".form");
const elCradList = $_(".movies-list");
const elSearchInput = $_(".search-input-js");
const elSelect = $_(".select-js");
const elSelectCategories = $_(".js-genre-select");
const elCradTemlate = $_("#cards-template").content;

// =============== NORMALIZED MOVIES ================
let normalizedMovies = movies.map((movie, i) => {
  return {
    id: i + 1,
    title: movie.Title.toString(),
    year: movie.movie_year,
    categories: movie.Categories.split("|"),
    ImageUrl: getYoutubeThumbnail(movie.ytid),
    raiting: movie.imdb_rating,
    language: movie.language,
    youTubeId: getYoutubeVideoLink(movie.ytid), 
  }
});

// ========= ELEMENTS CALLED FROM TAMPALTE TO FUNCTION ===========
let createMovieElement = (movie) => {
  let newMovie = elCradTemlate.cloneNode(true);

  $_(".card__img-top", newMovie).src = movie.ImageUrl;
  $_(".card__title-js", newMovie).textContent = movie.title;
  $_(".card__year", newMovie).textContent = movie.year;
  $_(".card__raiting", newMovie).textContent = movie.raiting;
  $_(".card__categoty", newMovie).textContent = movie.categories;
  $_(".whatch-trailer", newMovie).tectContent = "Whatch thriller.";
  $_(".whatch-trailer", newMovie).href = `https://www.youtube.com/watch?v=${movie.youTubeId}`;
  return newMovie;
}

