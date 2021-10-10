// ============ HTML ELEMENTS ====================== 
var elCardsList = $_(".movies-list");
var elMoviesTemplate = $_("#cards-template").content;
var elFrom = $_(".form");
var elSearchInput = $_(".search-input");

// elCardsList.innerHTML = '';

// =============== FUNCTION ========================
var createMovieElement = function (movie, ) {
  var elNewMovie = elMoviesTemplate.cloneNode(true);

  $_('.card__img-top', elNewMovie).src = movie.ImageUrl;
  $_(".card__title-js", elNewMovie).textContent = movie.title;
  $_(".card__year", elNewMovie).textContent = movie.year;
  $_(".card__categoty", elNewMovie).textContent = movie.categories;
  $_(".summary__title", elNewMovie).textContent = "Summary";
  $_(".summary__text", elNewMovie).textContent = movie.summary;
  $_(".whatch-trailer", elNewMovie).href = `https://www.youtube.com/watch?v=${movie.yuoTubeId}`
  $_(".whatch-trailer", elNewMovie).textContent = "Whatch trailer";

  return elNewMovie;
}

var normilizedMovies = movies.map(function (movie, i) {
  return {
    id: i + 1,
    title: movie.Title.toString(),
    year: movie.movie_year,
    categories: movie.Categories.split('|').join(', '),
    summary: movie.summary,
    ImageUrl: `http://i3.ytimg.com/vi/${movie.ytid}/hqdefault.jpg`,
    imdId: movie.imdb_id,
    imdbRating: movie.imdb_rating,
    runtime: movie.runtime,
    language: movie.language,
    yuoTubeId: movie.ytid
  }
});


var renderMovies = function (normilizedMovies) {
  elCardsList.innerHTML = "";
  var searchResultFragment = document.createDocumentFragment();

  normilizedMovies.forEach(function (mov) {
    searchResultFragment.appendChild(createMovieElement(mov))
  });
  elCardsList.appendChild(searchResultFragment);
}

renderMovies(normilizedMovies.slice(0, 500));

// ================ SEARCH FUNCTION =================
var searchForMovies = function (evt) {
  evt.preventDefault();

  var searchQuery = new RegExp(elSearchInput.value.trim(), "gi");
  elSearchInput.value = null;
  
  var filteredMovies = normilizedMovies.filter(function (movie) {
    return movie.title.match(searchQuery);
  });
  renderMovies(filteredMovies);

}

elFrom.addEventListener('submit', searchForMovies);


var pageLoader = $_(".loader");
window.addEventListener('load', function (evt) {
  pageLoader.remove();
});