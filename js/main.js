// ============ HTML ELEMENTS ====================== 
var elCardsList = $_(".movies-list");
var elMoviesTemplate = $_("#cards-template").content;

// =============== FUNCTION ========================
var createMovieElement = function (movie) {
  var elNewMovie = elMoviesTemplate.cloneNode(true);

  // elNewMovie.querySelector(".card-img-top").src = movie.ImageURL;
  // elNewMovie.querySelector(".card-img-top").alt = movie.Title;
  elNewMovie.querySelector(".card-title-js").textContent = movie.Title;
  elNewMovie.querySelector(".card-year").textContent = movie.movie_year;
  elNewMovie.querySelector(".card-categoty").textContent = movie.Categories.split("|").join(', ');
  elNewMovie.querySelector(".whatch-trailer").textContent = "Whatch trailer";
  elNewMovie.querySelector(".whatch-trailer").href = `https://www.youtube.com/watch?v=${movie.ytid}`

  return elNewMovie;
}

movies.forEach(function (movie) {
  elCardsList.appendChild(createMovieElement(movie));
})

var pageLoader = $_(".loader");
window.addEventListener('load', function (evt) {
  pageLoader.remove();
})