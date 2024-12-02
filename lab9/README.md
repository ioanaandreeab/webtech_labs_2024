# Seminar 9 - Front-end - noțiuni de bază

### Conținut

1. [Front-end - componente](#1-front-end---componente)

    1.1 [HTML](#11-html)
    
    1.2 [CSS](#12-css)

2. [JavaScript pentru aplicații Front-end](#2-javascript-pentru-aplica%C8%9Bii-front-end)

    2.1 [DOM](#21-dom)

    2.2 [Evenimente DOM](#22-evenimente-dom)

3. [Structura proiectului](#3-structura-proiectului)

4. [Integrarea back-end-ului](#4-integrarea-back-end-ului)

    4.1 [Listarea filmelor](#41-listarea-filmelor)

    4.2 [CORS](#42-cors)

    4.3 [Adăugarea unui nou film](#43-ad%C4%83ugarea-unui-nou-film)

5. [Lucru individual](#5-lucru-individual)


## 1. Front-end - componente

- Am discutat în primele seminare despre modelul _client-server_ și posibilitatea de a executa cod JavaScript atât în interiorul browserului, cât și prin intermediul unui environment care permite acest lucru (_node.js_)

- Ne amintim astfel că orice aplicație web are 2 părți componente - **back-end** & **front-end**

- Până în acest moment am creat propriul nostru server (back-end), însă, așa cum poate ați observat și din ultimele seminare, funcționalitățile expuse de serverul nostru pot fi consumate (_momentan_) doar prin intermediul utilizării clientului _Postman_

- Utilizatorul obișnuit nu va ști să folosească o astfel de unealtă, motiv pentru care are nevoie de o **interfață client**

![front-end & back-end](https://a.storyblok.com/f/42126/dd3f75afe5/frontend-vs-backend-overview.png/m/1200x0/filters:quality(70)/)

- **Front-end-ul** reprezintă partea vizibilă și interactivă a unei aplicații web sau a unui site
    - Este ceea ce utilizatorii văd și elementul cu care interacționează atunci când accesează o platformă online

- Acest aspect al dezvoltării web se concentrează pe **proiectarea și implementarea elementelor grafice**, a **interfeței utilizatorului** și a **funcționalităților** cu care utilizatorii interacționează direct

- Front-end-ul include tot ceea ce se întâmplă în browserul unui utilizator - designul paginilor web, layout-ul, stilurile, animațiile și orice alt element vizual cu care utilizatorii interacționează

- În general, diferențiem **3 elemente** principale ce compun aplicațiile web client, front-end-ul unui sistem:

    - **o componentă structurală** - **HTML** - definește elementele care sunt afișate în pagină

    - **o componentă de stilizare** - **CSS** - conferă un aspect plăcut elementelor structurale pentru accesibilitate

    - **o componentă dinamică** - **JavaScript** - permite utilizatorului să interacționeze cu elementele afișate

![html, css,js](https://html-css-js.com/images/og.jpg)

### 1.1 HTML

- **HTML** (_HyperText Markup Language_) este un limbaj de marcare utilizat pentru crearea paginilor web ce pot fi afișate într-un browser

🤔 [Aici un clip de 100 de secunde despre HTML](https://www.youtube.com/watch?v=ok-plXXHlWw)

- O pagină foarte simplă HTML poate fi reprezentată astfel:
```HTML
<!DOCTYPE html>
<html>
    <head>
        <title>Page Title</title>
    </head>
    <body>
        <h1>My First Heading</h1>
        <p>My first paragraph.</p>
    </body>
</html>
```

💡 Deoarece bazele HTML sunt discutate în cadrul cursului de multimedia, nu vom intra în foarte multe detalii, însă puteți regăsi [aici](https://htmlcheatsheet.com/) un cheatsheet pentru HTML și [aici](https://www.w3schools.com/html/default.asp) un tutorial pentru HTML

### 1.2 CSS

- **CSS** (_Cascading Style Sheets_) este un limbaj de stilizare, un standard pentru formatarea elementelor unui document HTML.

🤔 [Aici un clip de 100 de secunde despre CSS](https://www.youtube.com/watch?v=OEV8gMkCHXQ)

- Vom aprofunda în seminarul următor capacitățile CSS, însă, la o scurtă privire de ansamblu, putem identifica următoarele caracteristici:

    - **Selectori**: CSS utilizează selectori pentru a identifica elementele HTML la care se aplică stilurile
        - Acestea pot fi _elemente specifice, clase, ID-uri sau alte criterii de selecție_
    ```css
    /* element */
    body {
        font-family: 'Arial', sans-serif;
    }
    /* clasa */
    .titlu {
        color: #3366cc;
    }
    /* ID */
    #header {
        background-color: #f2f2f2;
    }
    ```
    - **Proprietăți**: CSS prezintă un set extins de proprietăți pentru a controla aspectul elementelor
        - Printre acestea se numără proprietăți pentru font, culoare, dimensiuni, margini, spațiere etc
    ```css
    p {
        font-size: 16px;
        color: #333333;
        margin-bottom: 10px;
    }

    .container {
        width: 80%;
        margin: 0 auto;
    }
    ```
    - **Specificitatea stilurilor**: CSS utilizează un sistem de _cascading_ pentru a determina cum se aplică mai multe stiluri într-un document. Acesta urmărește o anumită ierarhie și oferă dezvoltatorilor control asupra priorității stilurilor în funcție de specificitatea și ordinea în care sunt definite
    ```css
    h1 {
        color: blue; /* Stil implicit pentru toate elementele h1 */
    }

    .titlu {
        color: red; /* Stil specific pentru clasele cu clasa "titlu" */
    }

    #header h1 {
        color: green; /* Stil specific pentru h1 din interiorul elementului cu ID-ul "header" */
    }
    ```
    - În exemplul dat, se merge din ce în ce mai specific, pornind de la un tip de element, la o clasa și apoi la un ID

💡 Puteți găsi o serie extinsă de proprietăți și selectori în [cheatsheet-ul pentru CSS](https://htmlcheatsheet.com/css/)


## 2. JavaScript pentru aplicații front-end

- Cea de-a treia componentă, **JavaScript**, reprezintă un limbaj de programare folosit, în acest caz, pentru a asigura componenta dinamică a paginilor web

- În acest sens, există două subiecte importante de discutat, respectiv:
    - modalitățile prin care JavaScript poate _interacționa cu elementele din pagină_ 
    - felul în care este _notificat de către utilizator_ să realizeze acest lucru

### 2.1 DOM

- Un concept care stă la baza construirii unei pagini web este acela de **DOM** (_Document Object Model_)

![DOM](https://www.w3schools.com/js/pic_htmltree.gif)

- DOM este o reprezentare a obiectelor care compun structura și conținutul unei pagini web

- DOM este o interfață care permite scripturilor să acceseze, să modifice și să actualizeze conținutul, structura și stilul documentului HTML. Acesta reprezintă documentul folosind _noduri_.

- **Principalele caracteristici** ale DOM includ:

    - **Structura arborelui**: DOM organizează documentul HTML într-un arbore ierarhic, în care fiecare element este reprezentat printr-un nod. Nodurile pot fi _elemente, atribute, texte sau chiar comentarii_.

    - **Acces și manipulare**: Dezvoltatorii web pot utiliza limbaje de programare, cum ar fi JavaScript, pentru a accesa și manipula elementele din DOM. Astfel, pot _schimba conținutul paginii, adăuga sau elimina_ elemente, _modifica stilurile_ și _răspunde la evenimente_.

    - **Interacțiunea cu utilizatorul**: DOM este esențial pentru a crea interactivitate într-o pagină web. Dezvoltatorii pot răspunde la evenimente și pot actualiza dinamic conținutul paginii fără a necesita o reîncărcare completă a acesteia.

- Este important de reținut că utilitatea DOM-ul stă în faptul că permite JavaScript să acceseze elemente din pagină, pe care le poate ulterior modifica

- Putem observa următorul fragment de cod JavaScript care accesează un element din DOM și modifică conținutul acestuia:
```js
// Accesarea unui element din DOM
const element = document.getElementById("heading");

// Modificarea conținutului elementului
element.innerHTML = "My new heading";
```

- Obiectul _document_ are atașat o serie de metode pentru manipularea elementelor HTML din pagină

💡 Găsiți [aici](https://developer.mozilla.org/en-US/docs/Web/API/Document) o listă cu toate metodele și proprietățile atașate, alături de explicațiile pentru acestea :)

### 2.2 Evenimente DOM

- DOM-ul permite JavaScript să reacționeze la _evenimente HTML_ ce pot apărea

- Aceste evenimente, despre care am mai discutat putin seminarele trecute, pot fi declanșate de interacțiunea utilizatorului cu elementele paginii sau pot fi generate în alte moduri (de exemplu, _încărcarea paginii_)

- Vom utiliza JavaScript pentru a captura și gestiona aceste evenimente, putând răspunde la acțiunile utilizatorilor și modifica dinamic conținutul sau stilul paginii

![event handling](https://1.bp.blogspot.com/-HI-_6gDQlcw/X3lj2sbrMSI/AAAAAAAAB9s/oUtLrzaCB9g9CwZprdpBchs3QGyDacjnwCLcBGAsYHQ/s1280/Events.jpg)

- Printre cele mai comune evenimente se numără:

    - **Click**
    ```js
    document.getElementById("myButton").addEventListener("click", function() {
        // Codul care se va executa la click pe buton
    });
    ```
    - **Mouseover (trecere cu mouse-ul peste un element)**
    ```js
    document.getElementById("myElement").addEventListener("mouseover", function() {
        // Codul care se va executa la trecerea cu mouse-ul peste element
    });
    ```
    - **Submit (trimitere formular)**
    ```js
    document.getElementById("myForm").addEventListener("submit", function(event) {
        // Codul care se va executa la trimiterea formularului
        event.preventDefault(); // Previne comportamentul implicit al formularului
    });
    ```
    - **Change (schimbare într-un input)**
    ```js
    document.getElementById("myInput").addEventListener("change", function() {
        // Codul care se va executa la schimbarea valorii în input
    });
    ```
    - **Load (încărcare pagină)**
    ```js
    window.addEventListener("load", function() {
        // Codul care se va executa la încărcarea completă a paginii
    });
    ```

## 3. Structura proiectului

- În general, vom vrea să păstrăm fiecare parte componentă a aplicației/website-ului construit într-un fișier separat, pentru a **izola** fiecare context

- Astfel, în primă instanță, structura va fi foarte simplă:
    - **index.html** -> conține elementele structurale
    - **style.css** -> conține stilurile aplicate pe elemente
    - **script.js** -> conține interacțiunile cu elementele definite

- Vom vrea să începem construirea interfeței pentru aplicația noastră pentru gestiune a colecțiilor de filme

- Vom modifica structura directorului _app_, mutând tot conținutul lui într-un director numit _back-end_ și vom crea un nou director numit _front-end_ pentru interfața aplicației, în cadrul căruia vom defini cele 3 fișiere menționate anterior

- În fișierul index.html vom adăuga elementele necesare pentru testarea structurii
```html
<html>
    <head>
        <title>Movie Collections App</title>
        <link rel="stylesheet" href="style.css"/>
    </head>
    <body>
        <h1>Explore your collections of movies!</h1>
    </body>
    <script src="script.js"></script>
</html>
```

- Deși fișierele HTML pot fi deschise direct în browser, pentru executarea request-urilor pe care o vom implementa în pasul următor avem nevoie ca toate fișierele front-end-ului să fie _servite de un server web_ (să devină accesibile la o anumită adresă)

- Cele mai populare servere web sunt _nginx_, _Apache HTTP Server_ și _Microsoft IIS_

- Însă, pentru că aplicația noastră este în faza de dezvoltare, vom folosi un utilitar pentru a evita instalarea și configurarea unei soluții robuste

- Vom instala global pachetul _serve_ utilizând comanda
```
    npm install -g serve
```

- Vom naviga în directorul _front-end_ folosind un terminal, vom executa comanda **serve** și vom accesa serverul pornit la adresa indicată în terminal

## 4. Integrarea back-end-ului

- Primul pas al integrării este reprezentat de pornirea aplicației back-end, ce va începe să asculte request-uri pe un anumit port (în acest caz _8080_)

### 4.1 Listarea filmelor

- Pentru a lista toate filmele existente la nivelul bazei de date, va trebui să apelăm endpoint-ul de listare și să afișăm conținutul returnat de acesta

- Putem ajunge la o variantă de implementare modificând conținutul fișierelor astfel

    - **index.html**
    ```html
    <html>
        <head>
            <title>Movie Collections App</title>
            <link rel="stylesheet" href="style.css"/>
        </head>
        <body>
            <div class="container">
                <h1>This will be an awesome app!</h1>
                <!-- atașarea unui event handler pentru evenimentul de click asupra butonului -->
                <button onclick="loadMovies()">Load movies</button>
                <h3>The movies available in the app are: </h3>
                <!-- definirea unui ID ce poate fi utilizat pentru identificarea elementului la nivelul JavaScript -->
                <div id="moviesContainer">
                    <p>Nothing loaded yet - click on the button to load the movies</p>
                </div>
            </div>
        </body>
        <script src="script.js"></script>
    </html>
    ```

    - **style.css**
    ```css
    .container {
        margin: 0 auto;
        width: 80%;
        text-align: center;
    }

    .movie-container {
        border: 1px solid black;
        padding: 10px;
        width: 20%;
        margin: 10px auto;
        cursor: pointer;
    }

    .movie-container:hover {
        background-color: whitesmoke;
    }

    .poster-container {
        max-height: 100px;
    }
    ```
    - **script.js**
    ```js
    function loadMovies() {
        // apelarea endpoint-ului de listare a filmelor
        fetch("http://localhost:8080/movies")
        .then(response => response.json())
        .then(data => data.movies)
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
    ```

### 4.2 CORS
- După implementarea codului și reîncărcarea paginii accesate, vom observa în consola browserului o eroare similară
![CORS](https://miro.medium.com/v2/resize:fit:1400/0*bI2yxKryqJzyUkud)

- Aceasta se datorează mecanismului de **Cross-Origin Resource Sharing (CORS)** ce nu permite unui browser să apeleze un API decât dacă acel API menționează explicit că adresa de la care browserul face request-ul este o adresă validă

- Acest mecanism are ca scop _standardizarea și securizarea_ accesului între domenii și trebuie configurat cu multă atenție!

💡 Puteți urmări [aici](https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/) un exemplu de configurare corectă a CORS

- Pe parcursul dezvoltării, însă, putem folosi un _utilitar_ la nivelul back-end-ului pentru a permite apelul acestuia de la nivelul _oricărui domeniu_:
    - Instalarea pachetului **cors**
    ```
        npm install --save cors
    ```
    - Modificarea fișierului principal pentru a include noul pachet
    ```js
    import cors from "cors";

    //.. implementare
        
    const app = express();

    app.use(express.json());
    app.use(cors());

    //.. implementare
    ```
    - Repornirea serverului (deoarece folosim pachetul _nodemon_ aceasta se face automat)

- Retestarea request-ului din front-end funcționează după configurarea CORS la nivelul back-end-ului

### 4.3 Adăugarea unui nou film

- Pentru a implementa procesul de adăugare a unui film în aplicație, vom utiliza o serie de câmpuri în care vom introduce datele necesare (pe scurt, un formular) și o metodă care să gestioneze crearea request-ului utilizând aceste date:

    - **index.html**
    ```html
    <div>
        <p>Insert the details about the new movie</p>
        <form id="movieForm">
            <!-- definirea unor label-uri asociate input-urilor -->
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" required><br>
            
            <label for="year">Year:</label>
            <input type="number" id="year" name="year" required><br>
            
            <label for="director">Director:</label>
            <input type="text" id="director" name="director" required><br>
            
            <label for="genre">Genre:</label>
            <input type="text" id="genre" name="genre" required><br>
            
            <label for="synopsis">Synopsis:</label>
            <textarea id="synopsis" name="synopsis" required></textarea><br>
            
            <label for="duration">Duration (minutes):</label>
            <input type="number" id="duration" name="duration" required><br>
            
            <label for="poster">Poster URL:</label>
            <input type="url" id="poster" name="poster" required><br>
            
            <!-- la apasarea butonului de submit a formularului este apelata metoda addMovie-->
            <button type="button" onclick="addMovie()">Submit</button>
        </form>
    </div>
    ```
    - **script.js**
    ```js
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
    ```

## 5. Lucru individual

- Plecând de la exemplul anterior, încearcă să integrezi în pagină, după secțiunile implementate la seminar, operațiile de listare a tuturor entităților _colecție_ din baza de date și de adăugare a unei _colecții_ noi utilizând endpoint-urile specifice