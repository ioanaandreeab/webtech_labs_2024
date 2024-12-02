# Seminar 10 - Utilizarea CSS pentru implementarea interfețelor grafice

### Conținut

1. [Desenarea elementelor în pagină](#1-desenarea-elementelor-%C3%AEn-pagin%C4%83)

2. [Poziționarea elementelor](#2-pozi%C8%9Bionarea-elementelor)

    2.1 [Modalități de poziționare de bază](#21-modalit%C4%83%C8%9Bi-de-pozi%C8%9Bionare-de-baz%C4%83)

    2.2 [Flexbox](#22-flexbox)

    2.3 [Grid](#23-grid)

3. [Adaptarea interfețelor la dimensiunile dispozitivelor (responsiveness)](#3-adaptarea-interfe%C8%9Belor-la-dimensiunile-dispozitivelor-responsiveness)

4. [Aplicarea stilurilor externe](#4-aplicarea-stilurilor-externe)

5. [Implementarea unui layout](#5-implementarea-unui-layout)

6. [Lucru individual](#6-lucru-individual)

7. [Extra practice](#7-extra-practice)

## 1. Desenarea elementelor în pagină

- În momentul în care se realizează translatarea unui fișier HTML în pagina web, engine-ul asociază fiecărui element specificat un dreptunghi (_box_), conform unui concept numit **box model**

    - CSS determină mărimea, poziționarea și proprietățile fiecărui _box_

- Box model este alcătuit din **4 componente**:

    - **conținutul** (_content_) - conținutul propriu-zis al elementului (ex: text, imagine etc)
    - **marginea internă** (_padding_) - spațiul dintre conținut și bordura elementului
    - **bordura**(_border_) - o linie care delimitează padding-ul
    - **marginea externă** (_margin_) - spațiul între bordura elementului și alte elemente din jurul său
        - utilă pentru a controla spațiile dintre elementele dintr-o pagină

- Pentru a putea observa modul în care un element este desenat de către browser, poți deschide prin _click dreapta_ pe orice pagină web opțiunea _Inspect / Inspect element_

- La selectarea oricărui element din pagină, vei putea observa ceva similar în partea dreaptă a inspectorului:

![box model](https://www.simplilearn.com/ice9/free_resources_article_thumb/CSS-Box-Model.png)

- Așadar, box model este _esențial_ pentru a controla și manipula elementele individuale,layout-ul și aspectul paginilor web în mod eficient

## 2. Poziționarea elementelor

- Pentru a facilita interacțiunea utilizatorului cu interfețele grafice, elementele componente trebuie să fie aranjate într-un fel în care conținutul să fie _ușor de accesat și înțeles_

- Acest lucru este realizat în primul rând prin _poziționarea elementelor_ în cadrul unui layout care să aibă sens pentru pagina respectivă

### 2.1 Modalități de poziționare de bază

- Proprietatea de bază expusă de CSS pentru controlarea poziției unui element în pagină este **position**, ce permite _scoaterea elementelor din flow-ul predefinit de afișare_, pentru a putea defini diferite layouturi

💡 Poți consulta [aici](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning) întreaga documentație pentru proprietatea position

![positioning](https://internetingishard.netlify.app/css-positioning-schemes-790d5b.3d581d20.png)

- Cele mai comune valori pe care le poate lua proprietatea sunt:

    - **static** - _poziționarea implicită a elementelor_, acestea fiind plasate în _fluxul normal al documentului_
    ```css
    .element {
        position: static;
    }
    ```
    
    - **relative** - elementul e poziționat _relativ_ față de poziția sa normală
        - alte elemente din fluxul normal se comportă ca și cum elementul nu a fost mutat
    ```css
    .element {
        position: relative;
        top: 10px;
        left: 20px;
    }
    ```

    - **absolute** - elementul e _eliminat din fluxul normal_ și poziționat _relativ_ la cel mai apropiat element _părinte_ care are o poziție relativă
        - dacă nu există un astfel de element părinte, poziționarea se face relativ la _document_
    ```css
    .element {
        position: absolute;
        top: 30px;
        left: 50px;
    }
    ```

    - **fixed** - elementul este eliminat din fluxul normal și _poziționat relativ la fereastra browser-ului_
        - elementul va rămâne la aceeași poziție chiar dacă utilizatorul va scrolla pagina
    ```css
    .element {
        position: fixed;
        top: 0;
        right: 0;
    }
    ```

### 2.2 Flexbox

- **Flexbox** (abreviere pentru Flexible Box) este un model de layout în CSS care facilitează _aranjarea și alinierea_ elementelor într-un un container

- Ideea principală în layout-ul definit utilizând flexbox este de a da containerului **abilitatea de a altera dimensiunile** (și, după caz, ordinea) **elementelor copil** pentru a ocupa spațiul disponibil în mod optim

- În acest sens, un container flex va **expanda** elementele componente pentru a ocupa spațiul disponibil, ori le va **micșora** pentru a preveni depășirea acestuia(_overflow_)

💡 Poți parcurge [aici](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) un **ghid comprehensiv cu proprietățile asociate Flexbox**

- Pentru a utiliza Flexbox, setează proprietatea _display_ a containerului cu valoarea **flex** sau **inline-flex**
```css
.container {
    display: flex;
    /* sau display: inline-flex; pentru a crea un container flex inline */
}
```

- Flexbox expune proprietăți pentru definirea comportamentelor specifice părintelui ori copiilor săi prin care pot fi stabilite

    - **aranjarea** elemetelor
        - aranjarea elementelor pe axa principală și secundară folosind proprietățile _flex-direction_, _justify-content_ și _align-items_

    - **alinierea** elementelor
        - alinierea elementelor în interiorul containerului pe axa principală și secundară (ex. _align-self_)

    - **ordinea** elementelor

- O reprezentare grafică a proprietăților principale _flexbox_ este:

![Flexbox](https://i.redd.it/rofzm44oka091.png)

### 2.3 Grid

- **CSS Grid Layout** (ori _Grid_ sau _CSS Grid_) este un model de layout în CSS care permite dezvoltatorilor să creeze **layout-uri bidimensionale** (alcătuite din _rânduri și coloane_) complexe și flexibile

💡 Poți parcurge [aici](https://css-tricks.com/snippets/css/complete-guide-grid/) un **ghid comprehensiv cu proprietățile asociate CSS Grid**

- Similar cu Flexbox, Pentru a utiliza Grid Layout, setează proprietatea _display_ a containerului cu valoarea **grid**

```css
.container {
    display: grid;
}
```

- Cea mai importantă proprietate a CSS Grid este cea care permite definirea layoutului din punct de vedere al rândurilor și coloanelor ce îl vor compune
```css
.container {
    display: grid;
    grid-template-columns: 100px 200px 100px; /* Trei coloane cu dimensiuni fixe */
    grid-template-rows: 50px 100px; /* Două rânduri cu dimensiuni fixe */
}

```

![CSS grid](https://www.freecodecamp.org/news/content/images/2022/05/CSS-GRID-3.png)

- Precum în cazul Flexbox, există anumite _proprietăți_ ce pot fi definite pentru containerul _părinte_, și altele pentru _copiii_ din cadrul acestuia

## 3. Adaptarea interfețelor la dimensiunile dispozitivelor (responsiveness)

- **Responsiveness-ul** se referă la capacitatea unei pagini web de a se _adapta la diferite dimensiuni de ecrane și dispozitive_, astfel încât să ofere o experiență de utilizare optimă pe orice dispozitiv, de la desktop-uri și laptopuri la tablete și telefoane mobile, ori chiar smart watch-uri

![responsiveness](https://mir-s3-cdn-cf.behance.net/project_modules/hd/35d0ca41474775.57a7e879592f8.gif)

- Pentru a realiza acest lucru, CSS pune _nativ_ la dispoziție opțiunea de **media query** prin intermediul căreia pot fi definite stiluri specifice pentru o anumită rezoluție

```css
/* Stiluri generale pentru ecrane mari */
.element {
  width: 70%;
}

/* Stiluri specifice pentru ecrane mai mici (de exemplu, tablete și telefoane) */
@media screen and (max-width: 600px) {
  .element {
    width: 100%;
  }
}
```

- De asemenea, **flex** și **grid**, despre care am discutat în secțiunile anterioare, sunt utile pentru ajustarea alinierii elementelor în funcție de dimensiunea ecranului

- Alte elemente ajutătoare în acest scop pot fi:
    - utilizarea **unităților relative** (_%, vh, em_)
    - utilizarea unor **dimensiuni maxime ori minime** (_max-width, min-width_)

## 4. Aplicarea stilurilor externe

- Pe lângă stilizarea definită în fișierele locale cu ajutorul utilizării explicite a proprietăților CSS există și posibilitatea **importării unor biblioteci de stil**

- În cazul utilizării acestor biblioteci, adesea, dezvoltatorul folosește clasele exportate de biblioteca respectiv, ce definesc anumite reguli de stil

- Cele mai populare biblioteci de stilizare sunt
    - [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
    
    - [Material UI (MUI)](https://www.muicss.com/)

    - [Tailwind CSS](https://tailwindcss.com/)

- Aceste biblioteci sunt utile deoarece _reduc din complexitatea definirii stilurilor de bază_ pentru o aplicație și asigură o _coerență și uniformitate_ între elementele folosite în diferite zone ale website-ului/aplicației web

## 5. Implementarea unui layout

- Vom încerca să conferim aplicației noastre pentru gestionarea colecțiilor de filme un aspect cât mai plăcut pentru a fi atractivă și ușor de folosit pentru utilizatori

- Vom consulta [acest design figma](https://www.figma.com/proto/21qlpOtyB9pGFLxq8V48vO/Movies-app?type=design&node-id=4-38&t=Dq2zH1sbRLLhDDP6-1&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=4%3A38) (ne vom referi la el utilizând termenul _mock-up_) pentru pagina de filme, care conține 
    - lista de filme

    - formularul de adăugare a unui film nou

- Pornind de la **[forma actuală a aplicației](../app/front-end/)**, vom încerca să adăugăm stilizarea necesară pentru elemente, layout-ul paginii și poziționarea elementelor în pagină pentru a obține un rezultat cât mai apropiat de cel din mockup

- Începem prin a modifica structura aplicației, deci fișierul _index.html_, modificând tag-urile astfel încât să reflecte elementele din mock-up

```html
<html>
<head>
    <title>action!</title>
    <!-- includerea stilului definit local in fisierul style.css -->
    <link rel="stylesheet" href="style.css" />
    <!-- includerea unui font diferit dintr-o sursa externa -->
    <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
</head>
<body>
    <!-- element nativ dialog utilizat pentru definirea unei ferestre modale ce va fi vizibila doar in momentul activarii -->
    <!-- in mod predefinit, un element de tip dialog va avea pozitionare absolute, fiind in afara flow-ului normal de afisare -->
    <!-- din acest motiv, cat timp este definita in acelasi parinte, modala poate fi plasata oriunde -->
    <dialog id="addMovieModal" class="modal">
        <!-- continutul modalei -->
        <div class="modal-content">
            <div class="modal-header">
                <h2>Add movie</h2>
                <!-- buton ce va apela, la click, o metoda ce va ascunde modala -->
                <span class="modal-close" onclick="closeModal()">&times;</span>
            </div>
            <!-- formular pentru introducerea unui nou film -->
            <form id="addMovieForm" class="create-form">
                <!-- definirea unor label-uri asociate input-urilor -->
                <label for="title">Title:</label>
                <!-- atasarea unor clase pentru stilizarea tuturor componentelor selectate -->
                <!-- utilizarea atributului required pentru a nu permite trimiterea incompleta a formularului -->
                <input class="custom-text-input" type="text" id="title" name="title" required><br>

                <label for="year">Year:</label>
                <input class="custom-text-input" type="number" id="year" name="year" required><br>

                <label for="director">Director:</label>
                <input class="custom-text-input" type="text" id="director" name="director" required><br>

                <label for="genre">Genre:</label>
                <input class="custom-text-input" type="text" id="genre" name="genre" required><br>

                <label for="synopsis">Synopsis:</label>
                <textarea class="custom-text-input" id="synopsis" name="synopsis" required></textarea><br>

                <label for="duration">Duration (minutes):</label>
                <input class="custom-text-input" type="number" id="duration" name="duration" required><br>

                <label for="poster">Poster URL:</label>
                <input class="custom-text-input" type="url" id="poster" name="poster" required><br>

                <!-- la apasarea butonului de submit a formularului este apelata metoda addMovie -->
                <button type="submit" class="custom-button">Save</button>
            </form>
        </div>
    </dialog>
    <!-- header-ul paginii ce va include numele aplicatiei -->
    <div class="header">
        <div class="app-title">action!</div>
    </div>
    <div class="container">
        <h3>All movies</h3>
        <!-- toolbar cu elemente functionale -->
        <div class="toolbar">
            <!-- input ce permite cautarea filmului dupa titlu -->
            <input id="search" class="searchbar custom-text-input" type="text" placeholder="Search for a movie" />
            <!-- buton ce va apela metoda care incarca filmele pe baza titlului introdus in searchbar -->
            <button class="custom-button" onclick="searchMovie()">Search</button>
            <!-- buton ce va deschide modala de adaugare a unui nou film -->
            <button class="custom-button" onclick="openModal()">Add a movie</button>
        </div>
        <!-- containerul in care vor fi afisate filmele pe masura ce sunt incarcate, fiind la incarcarea paginii, gol -->
        <div id="moviesContainer">
        </div>
</body>
<!-- includerea scriptului definit local script.js -->
<script src="script.js"></script>
</html>
```

- Ulterior, vom modifica partea de CSS pentru a stiliza atât noile elemente, cât și pe cele existente

```css
/* aplicarea noului font asupra tuturor elementelor */
* {
    font-family: 'Montserrat';
}

/* configurarea elementului body */
body {
    /* pentru ca elementul dialog este pozitionat, in mod default ca absolute, trebuie sa pozitionam si parintele pentru a putea pozitiona modala fata de body */ 
    position: relative;
    /* eliminarea marginilor si a padding-ului default */
    margin: 0;
    padding: 0;
    /* aplicarea unei culori de fundal */
    /* utilizarea unei culori folosind formatul hex */
    background-color: #CEEAF7;
    /* inaltimea body-ului trebuie sa acopere intreaga pagina, pentru a permite modalei, pozitionata absolut fata de body, sa ocupe, la randul ei, intreaga inaltime a paginii */
}

.header {
    background-color: #201335;
    height: 60px;
    color: white;
    /* utilizarea unui container flex ce asigura redimensionarea automata a header-ului */
    display: flex;
    align-items: center;
    /* stilizarea padding-ului din partea stanga a elementului */
    padding-left: 20px;
}

.app-title {
    /* stilizarea dimensiunii si a stilului fontului utilizat */
    font-weight: bold;
    font-size: 16px;
}

.container {
    /* metoda clasica de centrare orizontala a unui element in cadrul altui element */
    margin: 0 auto;
    width: 80%;
    padding: 20px;
}

.toolbar {
    margin: 20px 0;
    display: flex;
    /* spatierea dintre elementele unui flexbox */
    gap: 10px;
}

/* elementele cu clasa searchbar vor ocupa tot spatiul ramas in cadrul unui container flex dupa ce elementele alaturate vor fi afisate */
.searchbar {
    flex: 1;
}

.movie-container {
    /* stilizarea bordurii unui element */
    border: 1px solid black;
    padding: 10px;
    margin: 10px auto;
    background-color: white;
    border-radius: 20px;
    display: flex;
}

.movie-info-container {
    padding: 20px;
    display: flex;
    /* ordonarea pe verticala a elementelor dintr-un flexbox */
    flex-direction: column;
    gap: 10px;
    width: 100%;
}

.movie-header {
    display: flex;
}

/* utilizarea pseudo-clasei first-child ce va selecta, asa cum ii spun enumele, primul copil al elementului curent */
.movie-header :first-child {
    flex: 1;
}

.movie-specs {
    font-style: italic;
}

.movie-synopsis {
    padding: 20px;
    border: 1px solid black;
    background-color: #FFB17A;
    /* rotunjirea marginilor bordurii unui element */
    border-radius: 20px;
}

.poster-container {
    /* setarea inaltimii maxime pe care un element o poate avea */
    max-height: 200px;
}

.custom-text-input {
    padding: 5px 10px;
    border-radius: 20px;
    border: 1px solid black;
}

.custom-button {
    padding: 5px;
    border-radius: 20px;
    font-weight: bold;
    background-color: #FFB17A;
    /* afisarea si stilizarea umbrei unui element */
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border: 1px solid black;
    cursor: pointer;
}

.remove-btn {
    height: 40px;
    padding: 3px 10px;
    border-radius: 20px;
    font-weight: bold;
    background-color: #B31515;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border: 1px solid black;
    /* stilizarea cursorului */
    cursor: pointer;
    /* stilizarea culorii fontului */
    color: white;
}

/* Stilizarea modalei */
.modal {
    /* pozitionarea implicita modalei este absoluta, deci poate fi plasa la inceputul parintelui */
    top: 0;
    /* acoperirea intregului spatiu disponibil din parinte */
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0px;
    /* utlizarea unei culori de fundal, impreuna cu un coeficient de transparenta */
    background-color: rgba(0, 0, 0, 0.4);
    /* pozitionarea elementului absolut la inceputul paginii */
}

.modal-content {
    background-color: #fff;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #000;
    border-radius: 20px;
    width: 50%;
}

.modal-header {
    display: flex;
}

.modal-header h2 {
    flex: 1;
}

.modal-close {
    cursor: pointer;
}

.create-form {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
}
```

- Iar, în final, vom actualiza caracteristicile dinamice pentru a integra noul comportament al paginii și a suporta noile request-uri făcute către back-end

```js
// atasarea unui handler ce va apela metoda loadMovies cand pagina va fi incarcata
window.onload = () => loadMovies();

// atasarea unui handler ce va apela metoda addMovie in momentul in care formularul "addMovieForm" va intercepta evenimentul de submit
// browserele definesc un comportament standard in cazul anumitor evenimente, cum este evenimentul de submit, cum ar fi executarea unui call automat si reincarcarea paginii
// pentru ca in acest exemplu implementarea call-ului este realizata separat, $event.preventDefault() ne va permite sa oprim browserul din a executa comportamentul standard
document.getElementById("addMovieForm").addEventListener('submit', ($event) => {
    $event.preventDefault();
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
        .then(data => data.records)
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
```

- Notă: pentru ca funcția de search să funcționeze trebuie să actualizăm endpoint-ul de _GET_ pentru entitatea _Movie_
```js
// app/back-end/controllers/movies.js
import { Op } from "sequelize";

...

const getMovies = async (req, res) => {
	const titleQuery = req.query.title;
    const where = titleQuery ? {
		title: {
			[Op.like]: `%${titleQuery}%`
		}
	} : {};
    const movies = await Movie.findAll({where: where});
    res.status(200).send({records: movies});
}
```

## 6. Lucru individual
- Folosind o abordare similară cu cea definită anterior, încearcă să stilizezi celelalte 2 pagini ale aplicației (paginile asociate pentru entitățile _Collection_ și _Person_) astfel încât, privite împreună, cele 3 pagini să aibă un aspect uniform

## 7. Extra practice

- [Flexbox Froggy](https://flexboxfroggy.com/)

- [CSS Grid Garden](https://cssgridgarden.com/)