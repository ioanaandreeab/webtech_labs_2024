function loadMovies() {
    // apelarea endpoint-ului de listare a filmelor
    fetch("http://localhost:8080/movies")
    .then(response => response.json())
    .then(data => data.records)
    .then(movies => {
        // selectarea unui element din pagină pe baza ID-ului
        const moviesList = document.getElementById("moviesContainer");
        // ștergerea conținutului 
        moviesList.innerHTML = "";

        // pentru fiecare film returnat, o serie nouă de elemente HTML sunt generate, populate cu date și, la final, adăugate în pagină prin intermediul elementului moviesList
        for(let movie of movies) {
            // crearea unui nou element HTML
            const item = document.createElement("div");
            // adăugarea unei clase CSS pe un element
            item.classList.add("movie-container");
            // atașarea unui event handler ce va fi apelat atunci când elementul va înregistra un eveniment de tipul click
            item.addEventListener("click", () => onMovieClick(movie));

            const movieName = document.createElement("p");
            // actualizarea textului afișat în interiorul componentei
            movieName.innerText = movie.title + " (" + movie.year + ")";

            const moviePoster = document.createElement("img");
            // setarea unui atribut
            moviePoster.setAttribute("src", movie.poster);
            moviePoster.classList.add("poster-container");

            // atașarea elementelor nou create la elementul părinte nou creat
            item.appendChild(movieName);
            item.appendChild(moviePoster);

            // atașarea elementului părinte nou creat la elementul existent în pagină
            moviesList.appendChild(item);
        }
    });
}

function onMovieClick(movie) {
    // afișarea unui mesaj sub formă de alertă
    alert("Directed by " + movie.director);
}

function addMovie() {
    // extragerea datelor din campurile formularului
    const formData = {
        title: document.getElementById('title').value,
        year: parseInt(document.getElementById('year').value),
        director: document.getElementById('director').value,
        genre: document.getElementById('genre').value,
        synopsis: document.getElementById('synopsis').value,
        duration: parseInt(document.getElementById('duration').value),
        poster: document.getElementById('poster').value,
    };

    // apelarea endpoint-ului de creare a unui nou film
    fetch('http://localhost:8080/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    // dupa adaugarea cu succes a unui nou film, lista de filme de la nivelul front-end-ului este reincarcata
    .then(response => loadMovies())
    .catch((error) => {
        console.error('Error:', error);
    });
}