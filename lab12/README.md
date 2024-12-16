# Seminar 12 - React Router & Redux

### Conținut

1. [React Router](#1-react-router)

    1.1 [Rutarea tradițională VS rutarea în aplicația client](#11-rutarea-tradi%C8%9Bional%C4%83-vs-rutarea-%C3%AEn-aplica%C8%9Bia-client)

    1.2 [React Router](#12-react-router)


2. [Modalități de gestionare a stării globale](#2-modalit%C4%83%C8%9Bi-de-gestionare-a-st%C4%83rii-globale)

    2.1 [Prop drilling](#21-prop-drilling)

    2.2 [Redux](#22-redux)

3. [Definirea unor rute pentru aplicația pentru gestiunea filmelor](#3-definirea-unor-rute-pentru-aplica%C8%9Bia-pentru-gestiunea-filmelor)

4. [Definirea unui context Redux pentru aplicația pentru gestiunea filmelor](#4-definirea-unui-context-redux-pentru-aplica%C8%9Bia-pentru-gestiunea-filmelor)

5. [Lucru individual](#5-lucru-individual)

## 1. React Router

### 1.1 Rutarea tradițională VS rutarea în aplicația client

- Majoritatea site-urilor și aplicațiilor web sunt alcătuite din mai multe pagini ce reprezintă diferite zone/funcționalități disponibile

- În website-urile tradiționale, browser-ul cere documentele corespunzătoare unei pagini de la un server web și afișează elementele conform cu fișierele HTML și CSS primite

- În momentul în care un utilizator dă click pe un link pentru a naviga la o altă pagină, întreg procesul se repetă

- Asocierea unei rute cu o anumită pagină poartă numele de **rutare**

- Rutarea realizată în aplicația client permite actualizarea URL-ului fără a fi realizat un alt request pentru a obține un document de la server; în schimb, aplicația poate să randeze imediat componente vizuale noi, ceea ce permite o experiență utilizator mult mai rapidă și dinamică

- O aplicație care folosește o astfel de rutare este, în esență, o aplicație cu o singură pagină (**SPA** - _Single Page Application_), deoarece interacționează cu utilizatorul prin rescrierea dinamică a paginii web curente cu date noi de la serverul web, în ​​loc de metoda implicită a unui browser web care încarcă pagini întregi noi

![traditional vs spa app](https://www.digitalclaritygroup.com/wp-content/uploads/2017/10/SPA-1.png)

### 1.2 React Router

- Nativ, utilitarul _create-react-app_ nu vine cu capacități pentru a putea ruta componentele React din aplicație, motiv pentru care este nevoie să folosim o librărie externă

- **React Router** este o bibliotecă pentru React care furnizează facilități de rutare în aplicațiile web construite cu React

- Acesta ajută la gestionarea și sincronizarea navigării în aplicațiile React, astfel încât să poată fi afișate componente specifice în funcție de ruta URL curentă

- React Router pune la dispoziție pentru implementarea mecanismului de rutare mai multe componente, și anume:

    - **Router**
        - componenta care se ocupă cu sincronizarea dintre URL și conținutul afișat
        - există 3 tipuri de routere exportate:
            - *BrowserRouter*
                - utilizează HTML5 History API pentru a menține sincronizarea între adresa URL a browser-ului și starea aplicației
                - implementează navigarea între pagini (înainte/înapoi) folosind istoricul predefinit al browser-ului
                - **opțiunea recomandată**

            - *HashRouter*
                - util atunci când nu se poate configura serverul web
                - în loc să folosească un URL normal, va folosi porțiunea din URL de după hash (#) pentru a controla conținutul afișat

            - *MemoryRouter*
                - în loc să utilizeze istoricul browser-ului, ține evidența în propria sa memorie
                - util în principal pentru testare, dar poate fi folosit și în medii care nu sunt bazate pe browsere 
    - **Route**
        - componenta de bază folosită pentru a asocia o componentă React cu o anumită cale
        - atunci când ruta corespunde, componenta asociată este afișată
    
    - **Routes**
        - componenta care grupează rutele și se asigură că se afișează elementele corecte pentru URL-ul respectiv
        - în versiunile mai vechi (până la v6 - versiunea curentă), această componentă purta numele de _Switch_ și avea mai puține capabilități

    - **Link**
        - componenta care permite crearea de link-uri între pagini în aplicațiile React
        - generează link-uri care actualizează URL-ul, dar fără a provoca o reîncărcare a paginii

- Un exemplu foarte simplist pentru a defini un router în componenta principală a unei aplicații React (_App.js_) ar putea fi:
```js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
```

- Rutarea aplicației nu este singurul element care trebuie gestionat uneori la nivel global; pot exista cazuri în care datele aplicației să trebuiască să fie stocate astfel

## 2. Modalități de gestionare a stării globale

### 2.1 Prop drilling

- Să presupunem că avem următoarea ierarhie de componente

```js
// Componenta A
function ComponentA({ data, onDataUpdate }) {
  // ...
  return <ComponentB data={data} onDataUpdate={onDataUpdate} />;
}

// Componenta B
function ComponentB({ data, onDataUpdate }) {
  // ...
  return <ComponentC data={data} onDataUpdate={onDataUpdate} />;
}

// Componenta C
function ComponentC({ data, onDataUpdate }) {
  // Utilizează sau afișează data
  return (
    <div>
      {data}
      <button onClick={() => onDataUpdate("Date actualizate")}>
        Actualizează Data
      </button>
    </div>
  );
}
```

- În exemplul dat, **ComponentA** primește _data_ și _onDataUpdate_ ca prop-uri, dar nu le folosește direct

- În schimb, le transmite mai departe către _ComponentB_, care la rândul său le transmite către _ComponentC_, care este cea care le folosește

- Această pasare intermediară redundantă de informații pentru a ajunge la componenta din ierarhie pentru care informațiile sunt relevante poartă numele de **"prop drilling"**

![prop drilling](https://miro.medium.com/v2/resize:fit:1256/0*ioNTCLVXxOEyed9U)

- Problemele pot apărea în situații în care aplicația are o ierarhie profundă de componente și datele trebuie să fie transmise prin mai multe niveluri, fapt ce poate face codul mai greu de întreținut și de înțeles

- Pentru a rezolva astfel de situații atunci când apar, putem utiliza o soluție de gestiune a stării globale a aplicației, precum Context API ori Redux (2 dintre cele mai utilizate opțiuni)
    - 🤔 În cele ce urmează ne vom concentra pe utilizarea Redux, dar poți citi [aici](https://react.dev/reference/react/createContext) mai multe despre Context API

### 2.2 Redux

- **Redux** este o bibliotecă JavaScript open-source pentru gestionarea și centralizarea stării aplicației

- A fost creat de Dan Abramov și Andrew Clark, Dan Abramov care a lucrat și la dezvoltarea React și _create-react-app_

- Principalele concepte din Redux sunt:

    - **store** ("baza de date" globală)
        - un obiect care conține întreaga stare a aplicației
        - starea este modificată _doar_ prin intermediul unor funcții speciale numite _reduceri_
    
    - **reducers** (reduceri)
        - funcție pură (nu afectează contextul exterior) care modifică starea curentă în urma unei _acțiuni_
        - primește starea curentă și o acțiune și returnează o _nouă_ stare

    - **actions** (acțiuni)
        - obiecte care descriu intenția de a modifica starea
        - sunt trimise către reduceri

    - **dispatch** (declanșare)
        - procesul de a trimite o acțiune către store

    - **middleware**
        - funcționalități adiționale ce pot fi introduse între trimiterea unei acțiuni și procesarea ei de către reducer
        - ex. logare

- În cadrul Redux se poate observa un **flux unidirecțional de date**, ceea ce înseamnă că datele circulă într-un singur sens: prin acțiuni, reduceri, store

- Acest flux poate fi urmărit gradual astfel:
    - Pentru _inițializare_:
        - un store Redux e creat folosind o funcție reducer
        - store-ul apelează reducer-ul o dată și salvează valorile inițiale returnate
        - componentele UI pot accesa acum starea curentă a store-ului și se abonează la orice viitoare actualizări ale acestuia, pentru a afișa datele corecte

    - pentru _actualizări_:
        - un eveniment determină necesitatea actualizării datelor
        - o acțiune este transmisă către store-ul Redux (dispatch), ex: _dispatch({type: 'counter/increment'})_
        - este apelat reducer-ul, care primește starea anterioară și tipul acțiunii, returnează noua stare, care e salvată
        - store-ul notifică întreaga aplicație referitor la această actualizare
        - fiecare componentă care utilizează acea parte a store-ului este re-randată pentru a putea afișa informațiile corecte

- Vizual, fluxul arata astfel:
![redux flow](https://redux.js.org/assets/images/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)

## 3. Definirea unor rute pentru aplicația pentru gestiunea filmelor

- În aplicația pe care o dezvoltăm am identificat mai multe arii de interes, motiv pentru care vom încerca în continuare să creăm o rută specifică pentru filme (părțile aplicației pe care le-am discutat până acum împreună) și una pentru a vizualiza colecțiile

- Vom începe prin a instala pachetul necesar:
```sh
npm install --save react-router-dom
```

- Vom crea o pagină de tip _Home_ pentru a putea fi afișată pe ruta principală **(/)** - putem să o privim ca pe un fel de landing page
  - _pages/Home.jsx_
  ```js
  import React from 'react';
  import {useNavigate} from 'react-router-dom';
  import './Home.css';

  const Home = () => {
      // hook pentru a naviga catre o pagina dorita
      const navigate = useNavigate();

      return (
          <div className='home'>
              <h1>Explore movies</h1>
              <button className='custom-button' onClick={() => navigate('/movies')}>Start now</button>
          </div>
      )
  };

  export {Home};
  ```
  - _pages/Home.css_
  ```css
  .home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  ```

- Pentru cazurile în care se dorește accesarea unei rute care nu există vom defini o componentă de tip _Not found_

  - _pages/NotFound.jsx_
  ```js
  import React from 'react';

  const NotFound = () => {
      return (
          <h1>Page not found.</h1>
      );
  };

  export {NotFound};
  ```

- La nivelul întregii aplicații (în fișierul _App.js_) vom defini configurarea pentru router
  - ruta principală _/_ va randa pagina _Home_
  - ruta _/movies_ va randa pagina Movies
  - orice altă rută va randa pagina _NotFound_
  ```js
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import { Movies } from './pages/Movies';
  import { Home } from './pages/Home';
  import { NotFound } from './pages/NotFound';
  import './App.css';

  function App() {
    return (
      <div className="App">
        <div class="header">
          <div class="app-title">action!</div>
        </div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    );
  }

  export default App;
  ```

## 4. Definirea unui context Redux pentru aplicația pentru gestiunea filmelor

- Vom păstra în cadrul store-ului global Redux datele despre filme pe care le vom prelua la accesarea rutei principale, cu scopul ca acestea să fie disponibile pentru întreaga aplicație

- Vom ține sincronizate valorile stocate în store-ul Redux atunci când vom adăuga un film nou și vom folosi valoarea din store și pentru pagina _NotFound_ pentru a redirecționa utilizatorul către pagina cu filme
  - Vom afișa un mesaj de genul _"Page not found, but you can browse X movies here."_ în care X va fi lungimea array-ului de filme stocate în store-ul global

- Similar, vom instala pachetul necesar:
```sh
npm install --save @reduxjs/toolkit react-redux
```

- Vom crea inițial un fișier pentru store-ul nostru, alături de un reducer care va conține și acțiunile corespunzătoare pentru fiecare operațiune

  - _stores/store.js_
  ```js
  import { configureStore } from '@reduxjs/toolkit';
  import moviesReducer from '../reducers/movies-reducer';

  export default configureStore({
    reducer: moviesReducer
  });
  ```
  - _reducers/movies-reducer.js_
  ```js
  import { createSlice } from '@reduxjs/toolkit';

  const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
      movies: [],
    },
    reducers: {
        // state-ul este imutabil, deci reducerii trebuie sa reconstruiasca, pentru orice actiune, state-ul pe baza valorilor anterioare si a payload-ului curent
        addMovie: (state, action) => {
            return { movies: [...state.movies, action.payload] }
        },
        setMovies: (state, action) => {
            return { movies: [...action.payload] };
        },
    },
  });

  // exportarea actiunilor
  export const { addMovie, setMovies } = moviesSlice.actions;

  // exportarea reducerului
  export default moviesSlice.reducer;
  ```

- Înainte să putem folosi store-ul și acțiunile în aplicația noastră trebuie ca aceasta să fie _înglobată într-un context Redux_

- Vom adăuga următoarele modificări în fișierul _src/index.js_
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './stores/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
```

- Așa cum am menționat, vom seta store-ul în momentul accesării aplicației, în componenta _Home_
  - _pages/Home.jsx_
  ```js
  import React, {useEffect} from 'react';
  import {useNavigate} from 'react-router-dom';
  import {useDispatch} from 'react-redux';
  import axios from 'axios';
  import {setMovies} from '../reducers/movies-reducer';
  import './Home.css';

  const SERVER_URL = "http://localhost:8080";

  const Home = () => {
      // hook pentru a naviga catre o pagina dorita
      const navigate = useNavigate();
      const dispatch = useDispatch();

      useEffect(() => {
          axios.get(`${SERVER_URL}/movies`)
          .then(res => res.data)
          .then(data => dispatch(setMovies(data.records)));
      }, []);

      return (
          <div className='home'>
              <h1>Explore movies</h1>
              <button className='custom-button' onClick={() => navigate('/movies')}>Start now</button>
          </div>
      )
  };

  export {Home};
  ```

- Și vom accesa valoarea în cadrul paginii _NotFound_
  - _pages/NotFound.jsx_
  ```js
  import React from 'react';
  import {useSelector} from 'react-redux';
  import {useNavigate} from 'react-router-dom';

  const NotFound = () => {
      const movies = useSelector((state) => state.movies);
      const navigate = useNavigate();
    
      return (
          <div>
              <h1>Page not found.</h1>
              <div>{`However, you can explore ${movies.length} movies`} <a onClick={() => navigate('/movies')}>here</a></div>
          </div>
      );
  };

  export {NotFound};
  ```

## 5. Lucru individual

- **React Router**
  - Făcând modificările necesare pentru pagini și componente, încearcă să pasezi parametri către rute și să redirecționezi utilizatorul, la click pe un card corespunzător unui film, către pagina filmului respectiv
    - ruta ta va trebui să arate, de exemplu, astfel ``` /movies/1 ```,
    unde 1 este id-ul corespunzător filmului
  - Încearcă să implementezi același mecanism de rutare și pentru colecții și să apelezi endpointurile necesare din backend pentru a direcționa utilizatorul conform flow-ului **colecții -> colecție selectată -> lista de filme corespunzătoare colecției -> film**

- **Redux**:
  - Sincronizează cu store-ul local și restul acțiunilor pentru filme - edit, delete - și asigură-te că sunt toate folosite în componentele corespunzătoare 
    - inclusiv acțiunea _addMovie_, momentan ea este doar definită
