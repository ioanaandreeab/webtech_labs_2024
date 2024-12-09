// atasarea unui handler ce va apela metoda loadMovies cand pagina va fi incarcata
window.onload = () => loadMovies();

// atasarea unui handler ce va apela metoda addMovie in momentul in care formularul "addMovieForm" va intercepta evenimentul de submit
// browserele definesc un comportament standard in cazul anumitor evenimente, cum este evenimentul de submit, cum ar fi executarea unui call automat si reincarcarea paginii
// pentru ca in acest exemplu implementarea call-ului este realizata separat, event.preventDefault() ne va permite sa oprim browserul din a executa comportamentul standard
document.getElementById("addMovieForm").addEventListener('submit', (event) => {
    event.preventDefault();
    addMovie()
});

// metoda de incarcare a filmelor ce poate primi ca parametru un titlu
// daca un titlu este primit, se construieste un obiect URLSearchParams folosit pentru atasarea unor parametri de tip query URL-ului pe care il folosim in cadrul apelului
// daca niciun titlu nu este primit, atunci apelul va returna toate filmele
function loadMovies(title) {
    const queryParams = new URLSearchParams();

    if(title) {
        queryParams.append("title", title);
    }

    // utilizarea fetch pentru a realiza apelul catre back-end
    fetch("http://localhost:8080/movies?" + queryParams)
        .then(response => response.json())
        .then(data => data.movies)
        .then(movies => {
            const moviesList = document.getElementById("moviesContainer");
            // modificarea continutului HTML al unui element
            moviesList.innerHTML = "";

            // pentru fiecare film se construiesc dinamic elementele HTML care trebuie afisate 
            movies.forEach(movie => {
                const movieItem = document.createElement("div");
                // aplicarea unui stil asupra unui component
                movieItem.classList.add("movie-container");

                const movieInfoContainer = document.createElement("div");
                movieInfoContainer.classList.add("movie-info-container");

                const movieHeader = document.createElement("div");
                movieHeader.classList.add("movie-header");

                const movieTitle = document.createElement("h4");
                // modificarea continutului text al unui element
                movieTitle.innerText = `${movie.title} (${movie.year})`;

                const movieDeleteBtn = document.createElement("button");
                movieDeleteBtn.classList.add("remove-btn");
                movieDeleteBtn.innerText = "X";
                // adaugarea unui event handler pentru evenimentele de tip 'click'
                movieDeleteBtn.addEventListener("click", () => removeMovie(movie));

                const movieSpecs = document.createElement("div");
                movieSpecs.classList.add("movie-specs");
                movieSpecs.innerText = `${movie.genre} • ${movie.duration} minutes • ${movie.director}`;

                movieHeader.appendChild(movieTitle);
                movieHeader.appendChild(movieDeleteBtn);

                const movieSynopsis = document.createElement("div");
                movieSynopsis.classList.add("movie-synopsis");
                movieSynopsis.innerText = movie.synopsis;

                movieInfoContainer.appendChild(movieHeader);
                movieInfoContainer.appendChild(movieSpecs);
                movieInfoContainer.appendChild(movieSynopsis);

                const moviePoster = document.createElement("img");
                // setarea unui atribut
                moviePoster.setAttribute("src", movie.poster);
                moviePoster.classList.add("poster-container");

                // atasarea unor elemente unui element ce va deveni parinte (sau container)
                movieItem.appendChild(moviePoster);
                movieItem.appendChild(movieInfoContainer);

                moviesList.appendChild(movieItem);
            })
        }
    )
}

// metoda de stergere a unui film
function removeMovie(movie) {
    fetch(`http://localhost:8080/movies/${movie.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => {
        loadMovies();
    })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// metoda de cautare a unui film ce va utiliza valoarea introdusa in input-ul de cautare
// si va apela metoda loadMovies definita anterior
function searchMovie() {
    const title = document.getElementById("search").value;
    loadMovies(title);
}

// metoda de adaugare a unui film
function addMovie() {
    // extragerea datelor introduse in formular si crearea unui obiect ce va fi trimis catre back-end
    const formData = {
        title: document.getElementById('title').value,
        year: parseInt(document.getElementById('year').value),
        director: document.getElementById('director').value,
        genre: document.getElementById('genre').value,
        synopsis: document.getElementById('synopsis').value,
        duration: parseInt(document.getElementById('duration').value),
        poster: document.getElementById('poster').value,
    };

    fetch('http://localhost:8080/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then(response => {
            // stergerea datelor introduse in formular dupa introducerea cu succes a unui film
            document.getElementById("addMovieForm").reset();
            // reincarcarea filmelor afisate
            loadMovies();
            // inchiderea modalei de adaugare a unui film
            closeModal();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// metoda de afisare a modalei
function openModal() {
    document.getElementById("addMovieModal").show();
}

// metoda de ascundere a modalei
function closeModal() {
    document.getElementById("addMovieModal").close();
}