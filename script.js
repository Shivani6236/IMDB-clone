const apiKey = "9ee11b42";
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const movieContainer = document.getElementById("movieContainer");

searchButton.addEventListener("click", searchMovies);

async function searchMovies() {
  const searchTerm = searchInput.value;
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.Search) {
      displayMovies(data.Search);
    } else {
      movieContainer.innerHTML = "<p>No results found.</p>";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayMovies(movies) {
  movieContainer.innerHTML = "";

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("col-md-4", "mb-4");
    movieCard.innerHTML = `
            <div class="card">
                <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
                <div class="card-body">
                    <h5 class="card-title">${movie.Title}</h5>
                    <p class="card-text">${movie.Year}</p>
                </div>
            </div>
        `;
    movieContainer.appendChild(movieCard);
  });
}
