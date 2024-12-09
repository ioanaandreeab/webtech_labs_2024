# Seminar 11 - React

### Conținut

1. [React 101](#1-react-101)
    
    1.1 [Componente - definire, state și props](#11-componente---definire-state-%C8%99i-props)

    1.2 [Virtual DOM](#12-virtual-dom)

    1.3 [Ciclul de viață al unei componente](#13-ciclul-de-via%C8%9B%C4%83-al-unei-componente)

    1.4 [Hooks](#14-hooks)


2. [Rescrierea interfeței grafice folosind React](#2-rescrierea-interfe%C8%9Bei-grafice-folosind-react)

3. [Lucru individual](#3-lucru-individual)

## 1. React 101

- **React** este o bibliotecă JavaScript _open-source_ pentru construirea interfețelor grafice, dezvoltată inițial de _Facebook_ și lansată în anul _2013_

- React folosește formatul **JSX** (_JavaScript XML_) pentru a descrie structura interfeței de utilizator

    - Vom observa în secțiunile următoare care sunt caracteristicile sintaxei, însă, ce este de menționat din start este faptul că aceasta **permite scrierea HTML în JavaScript** pentru o mai simplă dezvoltare și înțelegere a codului

- Deși modul în care sunt scrise fișierele este diferit față de a folosi Vanilla JavaScript (JavaScript pur), trebuie să notăm faptul că aplicațiile React sunt **compilate**, **rezultând un fișier principal JavaScript** care este interpetat de browser în același fel ca orice alt fișier JavaScript

    - Acest aspect este valabil pentru multe alte framework-uri JavaScript specializate în interfețe client (Vue.js, AngularJS etc.)

- Unul dintre cele mai importante avantaje oferite de React este abilitatea de a dezvolta aplicațiile utilizând conceptul de _componente_

🤔 [Aici](https://www.youtube.com/watch?v=Tn6-PIqc4UM) un clip despre React în 100 de secunde

### 1.1 Componente - definire, state și props

- O componentă React este un **fragment reutilizabil de cod** ce definește o interfață grafică, ori o parte a acesteia, izolând astfel părți ale aplicației

- Folosirea componentelor permite **modularizarea codului**, lucru care facilitează dezvoltarea, testarea și întreținerea aplicațiilor; definind mai multe componente, dezvoltatorii pot ulterior să le combine pentru a realiza pagini/secțiuni/layout-uri

![componente react](https://www.patterns.dev/img/reactjs/react-components@1.5x.svg)

- Fiecare componentă este alcătuită din structura, _starea_ și logica sa corespunzătoare (precum și, în unele cazuri, de stilul specific - importat din fișiere externe)

- Pentru **gestionarea și trimiterea datelor** componentele folosesc 2 concepte fundamentale - **state** și **props**

    - **state-ul** definește _starea internă_ a unei componente
        - este _mutabil_
        
    - **prop-urile** sunt argumente primite de componentă de la alte componente
        - sunt _imutabile_

![state vs props](https://user-images.githubusercontent.com/53526987/128488979-715bfac0-cc28-484f-a0df-bf847f03263d.PNG)

- Definirea unei componente poate fi realizată în 2 modalități:

    - folosind clase - _Class-based components_ (modalitate _deprecated_ - nu mai este recomandată)
        - se extinde clasa _Component_ din librăria React
        - clasa conține un constructor care primește prop-urile și inițializează state-ul componentei
        - are o metodă _render_ în cadrul căreia este definit conținutul ce va fi afișat
    ```js
    import React, { Component } from 'react';

    class MyComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                // Starea componentei
            };
        }

        render() {
            // Logica de randare a componentei
        }
    }
    ```

    - folosind funcții - _Functional components_ (modalitate recomandată)
        - metoda _render_ din Class-based components este echivalentă în acest caz cu ceea ce returnează funcția
        - state-ul componentei este replicat utilizând hook-ul _useState_ (despre care vom discuta în secțiunile următoare)
        - **este necesară importarea contexului React** din librăria React pentru ca fișierul să fie interpretat drept o componentă React, ci nu o funcție uzuală
    ```js
    import React from 'react';

    function MyComponent(props) {
        // Logica de randare a componentei
    }
    ```

- Componentele definesc structura și logica unor bucăți din interfața grafică, însă modul în care acestea sunt afișate și actualizate este strâns legat de un alt concept de bază al librăriei React, și anume _Virtual DOM_

### 1.2 Virtual DOM

- **Virtual DOM** este o **reprezentare a interfeței grafice ținută în memorie sub formă de noduri** și **sincronizată** cu DOM-ul "real" printr-un proces care poartă numele de **reconciliere** (_reconciliation_)

![virtual dom](https://miro.medium.com/v2/resize:fit:1400/0*_C52yYMRTDuMtdBA)

- În esență, mecanismul funcționează astfel:

    - O componentă React este desenată în pagină

    - Un element din state-ul sau prop-urile sale se schimbă

    - Schimbarea state-ului sau a prop-urilor determină re-randarea componentei, pentru a reflecta noua stare
    
    - Virtual DOM se modifică

    - Engine-ul React compară Virtual DOM cu DOM-ul afișat în browser (care este, de fapt, starea anterioară a Virtual DOM) și actualizează _doar_ nodurile care au avut schimbări (reconciliere)

- Putem extrage, deci, mai multe avantaje pe care le aduce utilizarea Virtual DOM:

    - **Performanță îmbunătățită** 
        - Manipulările DOM sunt costisitoare, iar actualizarea întregului DOM (așa cum este cazul atunci când folosim Vanilla JavaScript) la fiecare schimbare poate duce la performanță scăzută
        - Folosirea unui Virtual DOM permite React să minimizeze și să optimizeze actualizările DOM

    - **Eficiență** 
        - React poate re-randa componentele eficient și poate actualiza doar părțile necesare ale interfeței de utilizator, fără a afecta alte părți ale aplicației

    - **Programare mai simplă** 
        - Programatorii pot lucra cu un model mai declarativ, care se concentrează pe ceea ce trebuie afișat, în loc de modul în care trebuie să se întâmple manipularea DOM-ului
            - Ne amintim aici seminarul trecut în care trebuia să creăm câte un element DOM nou pe care să îl inserăm manual în întregul arbore al paginii

- Putem intui că o componentă poate trece pe parcursul existenței sale prin mai multe astfel de re-randări, care sunt parte din _ciclul de viață_ al unei componente

### 1.3 Ciclul de viață al unei componente

- **Ciclul de viață** al unei componente React descrie etapele prin care o componentă trece de la momentul creării până la momentul înlăturării sale din cadrul DOM-ului

- Este un concept strâns legat de abordarea React bazată pe _clase_, prin existența unor așa-numite _lifecycle methods_ (care permit performarea unor acțiuni într-un anumit moment al existenței componentei)

- Principalele etape ale ciclului de viață al unei componente React sunt

    - **Mounting** (Montarea) 
        - componenta este creată și inserată în DOM

    - **Updating** (Actualizarea) 
        - state-ul ori prop-urile componentei se schimbă

    - **Unmounting** (Demontarea)
        - componenta este înlăturată din DOM

- Fiecare etapă are asociate anumite _lifecycle methods_, care pot fi observate și în următoarea figură:

![lifecycle methods](https://miro.medium.com/v2/resize:fit:1400/1*6X_7HKFdQoh9eXqWgwQuvQ.png)

- În cadrul componentelor React funcționale ciclul de viață este simplificat, prin utilizarea _hook-urilor precum useEffect_

### 1.4 Hooks

- **Hook-urile** sunt **funcții**, introduse o dată cu versiunea _16.8_ a React, care **permit**, printre altele, **replicarea caracteristicilor componentelor bazate pe clase** (_state, lifecycle methods_)

![Lifecycle methods ca hook-uri](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*bsk4y_rRxmX_Qtol3H3caw.png)

- Cele mai importante hooks pe care le vom folosi sunt _useState_ și _useEffect_

    - **useState**
        - permite componentelor funcționale să stocheze și să gestioneze o stare locală
        - se definește mereu prin tuplul _[numeVariabilă, setNumeVariabilă]_
        - se utilizează astfel:
        ```js
        import React, { useState } from 'react';

        function ExampleComponent() {
            // Variabilă count din state-ul componentei
            // Valoarea variabilei se schimbă utilizând metoda setCount
            const [count, setCount] = useState(0);

            return (
                <div>
                    <p>You clicked {count} times</p>
                    <button onClick={() => setCount(count + 1)}>
                        Click me
                    </button>
                </div>
            );
        }
        ```

    - **useEffect**
        - permite efectuarea unor acțiuni în anumite momente din ciclul de viață al componentelor
        - primește **2 parametri**
            - un callback
            - un array de dependențe (variabile - state sau props - care vor fi monitorizate, iar, în funcție de modificările lor va fi apelat callback-ul)
        - se utilizează astfel:
        ```js
            import React, { useState, useEffect } from 'react';

            function ExampleComponent() {
                const [data, setData] = useState(null);

                useEffect(() => {
                    // Metodă care se execută după randare
                    fetchData();
                }, []); // Array-ul de dependențe gol înseamnă că ceea ce este definit în callback se execută doar la montare

                const fetchData = async () => {
                    const result = await fetchDataFromAPI();
                    setData(result);
                };

            return (
                <div>
                // Randare condițională în funcție de existența unei valori atribuite variabilei data
                    {data ? 
                        <p>Data loaded : {data}</p> 
                    : 
                        <p>Loading...</p>
                    }
                </div>
            );
        }
        ```
        - se disting 3 cazuri, în funcție de valorile ce pot fi luate de array-ul de dependențe
            - **array de dependențe gol** 
                - callback-ul se apelează _doar atunci când componenta este montată în DOM_
                - echivalent cu metoda ciclului de viață _componentDidMount_ din abordarea bazată pe clase
            - **array de dependențe cu valori**
                - callback-ul se apelează _la fiecare modificare a vreunei valori din array-ul de dependențe_
                - echivalent cu metoda _componentDidUpdate_ din abordarea bazată pe clase
            - **array de dependențe omis**
                - callback-ul se apelează _la fiecare re-render al componentei_

💡 Poți citi [aici](https://medium.com/in-the-weeds/an-intro-to-advanced-react-hooks-a8af6397fe28) un articol despre hook-urile mai complexe React, momentan ne vom concentra doar pe cele două prezentate

## 2. Rescrierea interfeței grafice folosind React

### 2.1 Inițializarea unui proiect React folosind Vite

- Pentru a putea folosi librăria React (și pentru că utilitarul _create-react-app_ [nu mai este de actualitate](https://dev.to/ag2byte/create-react-app-is-officially-dead-h7o)) vom crea un proiect schelet folosind _Vite_, un instrument modern pentru dezvoltarea de aplicații web, cunoscut pentru viteza și eficiența sa
    - Trebuie să menționăm că pentru a rula, o aplicație React are nevoie de un mediu Node.js

- Vom rula următoarea comandă, pentru a inițializa proiectul, conform instrucțiunilor din acest [articol](https://medium.com/@miahossain8888/how-to-create-a-react-app-with-vite-571883b100ef), care pot fi regăsite și în [documentația oficială Vite](https://vite.dev/guide/#scaffolding-your-first-vite-project)

```sh
npm create vite@latest front-end-react --template react
```

- Vom șterge ulterior directorul nostru existent _front-end-styled_, însă pentru moment îl vom păstra pentru a putea transfera și transforma codul existent

- Vite  va crea o structură de directoare de bază (o vom modifica ulterior) și va adăuga configurări default pentru compilarea aplicației (prezente în fișierul _vite.config.js_ și _eslint.config.js_)

- Apoi, conform cu instrucțiunile afișate în consolă, putem testa aplicația nou creată, după instalarea modulelor externe
```sh
cd front-end-react
npm install
npm run dev
```

- Accesând adresa menționată în consolă, _http://localhost:5173/_ (portul default este 5173) vom putea observa aplicația noastră rulând
![react app running](https://coderanil.com/wp-content/uploads/2024/11/vite-react-home-page.png)

- În ceea ce privește directoarele create, putem observa:
    - directorul **public**
        - conține _fișiere statice_ care nu vor fi procesate de către Vite, ci vor fi direct copiate în directorul de ieșire final la construirea proiectului
    - directorul **src**
        - conține _codul sursă al aplicației React_
    - fișierul **src/index.html**
        - șablon de bază pentru pagina principală a aplicației tale React
        - aici poți modifica titlul, adăuga meta-informații sau include alte resurse statice
    - fișierul **src/main.jsx**
        - punctul de intrare în aplicația React
        - aici este importată și randată componenta principală `(<App />)` în elementul cu id-ul "root" din fișierul index.html
    - fișierul **src/App.jsx**
        - componenta principală a aplicației
    - fișierul **src/App.css**
        - stilul asociat componentei principale a aplicației
    - fișierul **package.json**
        - conține informații despre proiect, dependențele acestuia, scripturile de build și rulare, precum și alte configurări

- Vom construi în continuare, similar cu modul în care am lucrat pentru partea de back-end, o structură a fișierelor în cadrul directorului _src_, după tipul acestora

- Definim, pentru început, două directoare principale - **pages** și **components**
    - pages va conține layout-ul întregii pagini respective
    - components va conține componente utilizate în pagini
```
src/
    ├── pages/
    │   └── Movies.jsx
    │   └── Movies.css
    ├── components/
    │   └── MovieCard.jsx
    │   └── MovieCard.css
    │   └── AddMovieModal.jsx 
    │   └── AddMovieModal.css 
    └── ... // can contain services, util functions etc.
```

- Vom încerca, astfel, să modularizăm codul pe care îl avem momentan și să separăm fiecare componentă în parte

- De asemenea, înainte să începem modificările, putem instala pachetul _axios_, deoarece lucrăm într-un mediu de dezvoltare Node.js
```sh
npm install --save axios
```

- Vom modifica conținutul fișierului _App.jsx_ pentru a afișa _pagina Movies.jsx_
```js
import { Movies } from './pages/Movies';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="header">
        <div className="app-title">action!</div>
      </div>
      <Movies/>
    </div>
  );
}

export default App;
```

- În fișierul _index.html_ adăugăm importarea fontului Montserrat pentru a putea fi folosit în aplicație

```html
...
<!-- includerea unui font diferit dintr-o sursa externa -->
<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
...
```


- Vom adăuga paginile și componentele individuale:

    - pages/Movies.jsx
    ```jsx
    import React, {useState, useEffect} from 'react';
    import axios from 'axios';

    import { MovieCard } from '../components/MovieCard';

    import './Movies.css';
    import { AddMovieModal } from '../components/AddMovieModal';

    const SERVER_URL = "http://localhost:8080";

    const Movies = () => {
        // declaram o variabila state pentru a stoca filmele - inițial este un array gol
        const [movies, setMovies] = useState([]);
        // declaram o variabila state pentru a stoca titlul filmului cautat de utilizator
        const [queryTitle, setQueryTitle] = useState(null);
        // declaram o variabila state pentru a determina daca afisam sau nu modala
        const [isModalOpen, setIsModalOpen] = useState(false);

        const getMovies = () => {
            const queryParams = new URLSearchParams();
            
            if(queryTitle) {
                queryParams.append("title", queryTitle);
            }

            // apelam metoda expusa de backend pentru a prelua filmele si le setam in state
            axios.get(`${SERVER_URL}/movies?` + queryParams)
            .then(res => res.data)
            .then(data => setMovies(data.movies));
        };

        const addMovie = (movie) => {
            axios.post(`${SERVER_URL}/movies`, movie)
                .then(() => getMovies())
                .catch(err => console.log(err));
        }

        const editMovie = (movie) => {
            const movieParams = {...movie};
            delete movieParams.id;
            axios.put(`${SERVER_URL}/movies/${movie.id}`, movieParams)
            .then(() => getMovies())
            .catch(err => console.log(err));
        }

        const deleteMovie = (movie) => {
            axios.delete(`${SERVER_URL}/movies/${movie.id}`)
            .then(() => getMovies())
            .catch(err => console.log(err));
        }

        useEffect(() => {
            // in momentul in care pagina este adaugata in DOM
            // se preiau datele din backend
            getMovies();
        }, []);

        const onChangeQueryTitle = (event) => {
            // preluarea valorii introduse de utilizator pentru filmul cautat
            const searchedMovieTitle = event.target.value;
            // setarea valorii in state
            setQueryTitle(searchedMovieTitle);
        }

        const openModal = () => {
            setIsModalOpen(true);
        }

        const closeModal = () => {
            setIsModalOpen(false);
        }
    
        return (
            <div>
                <div className="container">
                    <h3>All movies</h3>
                    <div className="toolbar">
                        <input onChange={onChangeQueryTitle} id="search" className="searchbar custom-text-input" type="text" placeholder="Search for a movie" />
                        <button className="custom-button" onClick={() => getMovies()}>Search</button>
                        <button className="custom-button" onClick={openModal}>Add a movie</button>
                    </div>
                    <div id="moviesContainer">
                    {/* sintaxa de JSX, pentru fiecare film din lista este afisata o componenta de tip MovieCard */}
                    {movies.map((movie, index) => (
                        <MovieCard movie={movie} key={index} onDelete={deleteMovie} onEdit={editMovie}/>
                    ))}
                    </div>
                </div>
                {/* randare conditionala */}
                {isModalOpen && <AddMovieModal onAddMovie={addMovie} closeModal={closeModal} />}
            </div>
        )
    };

    export {Movies};
    ```

    - components/MovieCard.jsx
    ```jsx
    import React, {useState} from 'react';

    import './MovieCard.css';

    // componenta MovieCard primeste un prop denumit movie - obiectul ce descrie un film
    // o functie onDelete ce va fi apelata atunci cand se doreste stergerea unui element
    // si o functie onEdit ce va fi apelata atunci cand se doreste editarea unui film
    // componenta are, deci, doua moduri -> read si edit
    const MovieCard = ({movie, onDelete, onEdit}) => {
        const [isEditMode, setIsEditMode] = useState(false);
            // adaugam in state toate campurile care vor fi completate
            // valorile initiale sunt cele ale filmului primit
            const [title, setTitle] = useState(movie.title);
            const [year, setYear] = useState(movie.year);
            const [director, setDirector] = useState(movie.director);
            const [genre, setGenre] = useState(movie.genre);
            const [synopsis, setSynopsis] = useState(movie.synopsis);
            const [duration, setDuration] = useState(movie.duration);
            const [poster, setPoster] = useState(movie.poster);

            const updateMovie = (event) => {
                // impiedicam trimiterea default a formularului -> refresh paginii
                event.preventDefault();
                // pasam functiei de salvare obiectul movie construit prin completarea formularului
                onEdit({title, year, director, genre, synopsis, duration, poster, id: movie.id});
                setIsEditMode(false);
            }
        
            // definim callbacks pentru evenimentele de onChange pentru toate inputurile
            const onChangeTitle = (event) => {
                setTitle(event.target.value);
            }
        
            const onChangeYear = (event) => {
                setYear(event.target.value);
            }
        
            const onChangeGenre = (event) => {
                setGenre(event.target.value);
            }
        
            const onChangeSynopsis = (event) => {
                setSynopsis(event.target.value);
            }
        
            const onChangeDirector = (event) => {
                setDirector(event.target.value);
            }
        
            const onChangeDuration = (event) => {
                setDuration(event.target.value);
            }
        
            const onChangePoster = (event) => {
                setPoster(event.target.value);
            }

        return (
            <div className="movie-container">
                {/* randare conditionala, in functie de modul cardului ce afiseaza filmul - read/edit */}
                {isEditMode ? 
                    <div className="edit-movie-form">
                        <label for="title">Title:</label>
                        <input value={title} onChange={onChangeTitle} className="custom-text-input" type="text" id="title" name="title" required/><br/>

                        <label for="year">Year:</label>
                        <input value={year} onChange={onChangeYear} className="custom-text-input" type="number" id="year" name="year" required/><br/>

                        <label for="director">Director:</label>
                        <input value={director} onChange={onChangeDirector} className="custom-text-input" type="text" id="director" name="director" required/><br/>

                        <label for="genre">Genre:</label>
                        <input value={genre} onChange={onChangeGenre} className="custom-text-input" type="text" id="genre" name="genre" required/><br/>

                        <label for="synopsis">Synopsis:</label>
                        <textarea value={synopsis} onChange={onChangeSynopsis} className="custom-text-input" id="synopsis" name="synopsis" required></textarea><br/>

                        <label for="duration">Duration (minutes):</label>
                        <input value={duration} onChange={onChangeDuration} className="custom-text-input" type="number" id="duration" name="duration" required/><br/>

                        <label for="poster">Poster URL:</label>
                        <input value={poster} onChange={onChangePoster} className="custom-text-input" type="url" id="poster" name="poster" required/><br/>

                        <button className="custom-button" onClick={updateMovie}>Save</button>
                        <button className="remove-btn" onClick={() => setIsEditMode(false)}>Abort changes</button>
                    </div>
                :
                <React.Fragment>
                    <img alt="movie-img" className="poster-container" src={movie.poster}/>
                    <div className="movie-info-container">
                        <div className="movie-header">
                            <h4 className="movieTitle">
                                {/* sintaxa de JSX */}
                                {`${movie.title} (${movie.year})`}
                            </h4>
                            {/* apeleaza la click functia de delete primita prin props si trimite filmul drept parametru */}
                            <button className="remove-btn" onClick={() => onDelete(movie)}>X</button>
                            <button className="custom-button movie-tool-btn" onClick={() => setIsEditMode(true)}>Edit</button>
                        </div>
                        <div className="movie-specs">
                            {`${movie.genre} • ${movie.duration} minutes • ${movie.director}`}
                        </div>
                        <div className="movie-synopsis">
                            {movie.synopsis}
                        </div>
                    </div>
                </React.Fragment>
                }
            </div>
        )
    };

    export {MovieCard};
    ```

    - components/AddMovieModal.jsx
    ```jsx
    import React, {useState} from 'react';

    import "./AddMovieModal.css";

    const AddMovieModal = ({onAddMovie, closeModal}) => {
        // adaugam in state toate campurile care vor fi completate
        const [title, setTitle] = useState("");
        const [year, setYear] = useState(0);
        const [director, setDirector] = useState("");
        const [genre, setGenre] = useState("");
        const [synopsis, setSynopsis] = useState("");
        const [duration, setDuration] = useState(0);
        const [poster, setPoster] = useState("");

        // definim callbacks pentru evenimentele de onChange pentru toate inputurile
        const onChangeTitle = (event) => {
            setTitle(event.target.value);
        }

        const onChangeYear = (event) => {
            setYear(event.target.value);
        }

        const onChangeGenre = (event) => {
            setGenre(event.target.value);
        }

        const onChangeSynopsis = (event) => {
            setSynopsis(event.target.value);
        }

        const onChangeDirector = (event) => {
            setDirector(event.target.value);
        }

        const onChangeDuration = (event) => {
            setDuration(event.target.value);
        }

        const onChangePoster = (event) => {
            setPoster(event.target.value);
        }

        const saveMovie = (event) => {
            // impiedicam trimiterea default a formularului -> refresh paginii
            event.preventDefault();
            // pasam functiei de salvare obiectul movie construit prin completarea formularului
            onAddMovie({title, year, director, genre, synopsis, duration, poster});
            closeModal();
        }

        return (
            <dialog id="addMovieModal" className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Add movie</h2>
                        <span className="modal-close" onClick={closeModal}>&times;</span>
                    </div>
                    <form id="addMovieForm" className="create-form">
                        <label for="title">Title:</label>
                        <input onChange={onChangeTitle} className="custom-text-input" type="text" id="title" name="title" required/><br/>

                        <label for="year">Year:</label>
                        <input onChange={onChangeYear} className="custom-text-input" type="number" id="year" name="year" required/><br/>

                        <label for="director">Director:</label>
                        <input onChange={onChangeDirector} className="custom-text-input" type="text" id="director" name="director" required/><br/>

                        <label for="genre">Genre:</label>
                        <input onChange={onChangeGenre} className="custom-text-input" type="text" id="genre" name="genre" required/><br/>

                        <label for="synopsis">Synopsis:</label>
                        <textarea onChange={onChangeSynopsis} className="custom-text-input" id="synopsis" name="synopsis" required></textarea><br/>

                        <label for="duration">Duration (minutes):</label>
                        <input onChange={onChangeDuration} className="custom-text-input" type="number" id="duration" name="duration" required/><br/>

                        <label for="poster">Poster URL:</label>
                        <input onChange={onChangePoster} className="custom-text-input" type="url" id="poster" name="poster" required/><br/>

                        <button className="custom-button" onClick={saveMovie}>Save</button>
                    </form>
                </div>
            </dialog>
        )
    };

    export {AddMovieModal};
    ```

- Apoi, în funcție de specificitatea stilului, vom modifica astfel (preponderent, stilurile sunt aceleași ca seminarul trecut, modificare principală este separarea lor în funcție de componenta asupra căreia se aplică)

    - index.css (stiluri globale)
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
    ```

    - App.css (stiluri pentru componenta principală)
    ```css
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
    ```

    - pages/Movies.css
    ```css
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
    ```

    - components/MovieCard.css
    ```css
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
        gap: 10px;
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

    .edit-movie-form {
        margin: 20px 0;
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .movie-tool-btn {
        height: 40px;
    }
    ```

    - components/AddMovieModal.css
    ```css
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
        display: block;
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

## 3. Lucru individual

- Folosind o abordare similară cu cea definită anterior, încearcă să faci trecerea de la fișiere JavaScript Vanilla la componente React și pentru celelalte 2 pagini ale aplicației (paginile asociate pentru entitățile _Collection_ și _Person_)