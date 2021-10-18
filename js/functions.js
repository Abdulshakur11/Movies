// ========== FUNCTION TO RENDER MOVIES ===========
let renderMovies = (normalizedMovies) => {
  elCradList.innerHTML = "";
  let fragment = document.createDocumentFragment();

  normalizedMovies.forEach(element => {
    fragment.appendChild(createMovieElement(element));
  });
  elCradList.appendChild(fragment);
}
renderMovies(normalizedMovies.slice(0, 20));


// =========== SEARCH FUNCTION =========
let searchForMovies = () => {
  let searchQuery = new RegExp(elSearchInput.value.trim(), "gi");

  let filteredMovies = normalizedMovies.filter((movie) => {
    return movie.title.match(searchQuery);
  });
  renderMovies(filteredMovies);
}

// CATEGORY BY GENRE
let category = (moviesArr) => {
  let readyMovies = [];
  let searchInput = elSearchInput.value.trim();
// ========= MOVIE SEARCH ============
  if (searchInput !== null && searchInput !== "") {
    let searchRegEx = new RegExp(searchInput, "gi");
    readyMovies = moviesArr.filter((movie) => {
      return movie.title.match(searchRegEx);
    });
  } else {
    readyMovies = moviesArr;
  }

  //====================
  if (elSelectCategories.value !== 'all') {
    let searchCategoy = new RegExp(elSelectCategories.value, "gi");

    readyMovies = readyMovies.filter((movie) => {
      return movie.categories.join(" ").match(searchCategoy);
    });
    renderMovies(readyMovies);
  }
}

// ============== SORT CATEGORIES FUNCTION =============
let ceateGenreCategoriesOptions = () => {
  let movieCtegories = [];

  normalizedMovies.forEach((movie) => {
    movie.categories.forEach((category) => {
      if (!movieCtegories.includes(category)) {
        movieCtegories.push(category);
      }
    });
  });
  movieCtegories.sort();

  let elOptionsFragment = document.createDocumentFragment();

  // ============= RENDER OPTIONS TO SELECT ============= 
  movieCtegories.forEach(category => {
    let newCategoryOption = createElement("option", "", category);
    newCategoryOption.value = category.toLowerCase();
    elOptionsFragment.appendChild(newCategoryOption)
  });
  elSelectCategories.appendChild(elOptionsFragment)
}
ceateGenreCategoriesOptions();


// ========= FUNCTION FOR SEARCH ========== 
elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  searchForMovies();
  category(normalizedMovies);
});


// ============= SORT FUNCTION ============
let sortMovie = normalizedMovies.slice();

elSelect.addEventListener("change", () => {

  sortMovie.sort((a, b) => {
    if (elSelect.value === "A-z") {
      return a.title < b.title ? -1 : b.title > a.title ? 1 : 0;
    } else if (elSelect.value === "Z-a") {
      return a.title > b.title ? -1 : b.title < a.title ? 1 : 0;
    }
  });

  sortMovie.sort((a, b) => {
    if (elSelect.value === "high-rating") {
      return a.raiting > b.raiting ? -1 : b.raiting < a.raiting ? 1 : 0;
    } else if (elSelect.value === "lower-raiting") {
      return b.raiting > a.raiting ? -1 : a.raiting < b.raiting ? 1 : 0;
    }
  });

  sortMovie.sort((a, b) => {
    if (elSelect.value === "new-old") {
      return a.year > b.year ? -1 : b.title < a.title ? 1 : 0;
    } else if (elSelect.value === "old-new") {
      return a.year < b.year ? -1 : b.year > a.year ? 1 : 0;
    }
  });

  renderMovies(sortMovie)
});