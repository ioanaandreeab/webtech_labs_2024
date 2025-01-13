# Seminar 13 - Utilizarea bibliotecilor de componente (Material UI)

### Conținut

1. [Material UI](#1-material-ui)

2. [Exemplu de realizare a unui card pentru afișarea detaliilor unui film](#2-exemplu-de-realizare-a-unui-card-pentru-afișarea-detaliilor-unui-film)

3. [Bonus - utilizarea tabelelor](#3-bonus---utilizarea-tabelelor)

4. [PrimeReact](#4-primereact)

5. [Lucru individual](#5-lucru-individual)

## 1. Material UI

- Adesea, pentru a facilita dezvoltarea aplicațiilor web, programatorii pot folosi, pentru interfețele utilizator, o bibliotecă externă pentru componente

- O astfel de abordare asigură coerență în ceea ce privește aspectul vizual al aplicației, întrucât componentele care sunt importate din bibliotecă vin alături de reguli de stil definite

- Una dintre alegerile populare pentru React (și nu numai) este **Material UI**

- **Material UI** este o bibliotecă de componente pentru React, construită urmând principiile _"Material Design"_, dezvoltate de Google

- Câteva caracteristici cheie ale Material UI includ:

    - **Componente predefinite**: 
        - Material-UI oferă o gamă largă de componente _gata de a fi utilizate_, precum butoane, bare de navigare, căsuțe de dialog, ferestre modale, câmpuri de text

    - **Stilizare conform principiilor Material Design**

    - **Tematică personalizabilă**
        - Material-UI permite _personalizarea aspectului componentelor_ prin intermediul temelor
        - Dezvoltatorii pot adapta culorile, fonturile și alte aspecte pentru a se potrivi cu identitatea vizuală a propriilor proiecte

    - **Suport pentru responsiveness**

    - **Documentație bogată și comunitate activă**

## 2. Exemplu de realizare a unui card pentru afișarea detaliilor unui film

- Conform [documentației](https://mui.com/material-ui/getting-started/installation/), putem instala Material UI precum un orice alt pachet, utilizând _npm_

- Pentru a putea utiliza _Material UI_ vom inițializa un proiect nou React (îl vom denumi _material-example_), folosind comanda pe care am utilizat-o și în seminarul 11:
```
npm create vite@latest material-example --template react
```

- Vom rula în continuare următoarea comandă pentru _instalarea Material UI_
```
npm install --save @mui/material @emotion/react @emotion/styled
```

- În continuare, vom adăuga o componentă nouă, denumită _MovieCard.jsx_, pentru a utiliza componente exportate de Material UI

- Vom remarca odată cu utilizarea Material UI că definirea fișierelor separate de stilizare (.css) devine redundantă, deoarece componentele sunt importate cu stilurile predefinite, pe care le vom ajusta în funcție de modul în care dorim să arate acestea

- Pentru a obține date pentru componenta, vom apela un API gratuit, în scopul de a obține rapid informații de afișat; În acest sens vom instala și pachetul _axios_, pe care l-am folosit și anterior pentru a efectua calluri către serviciu
```
npm install --save axios
```

- API-ul pe care îl vom folosi este [Studio Ghibli API](https://ghibliapi.vercel.app/)

- _src/components/MovieCard.jsx_:
```js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

const MovieCard = () => {
  const [movie, setMovie] = useState({});
  useEffect(() => {
    axios
    // id-ul este preluat dintr-un exemplu din documentație
    // pentru a returna un singur film
      .get(
        "https://ghibliapi.vercel.app/films/58611129-2dbc-4a81-a72f-77ddfc1b1b49"
      )
      .then((response) => response.data)
      .then((movieData) => setMovie(movieData));
  }, []);
  return (
    <Card sx={{ maxWidth: 500 }} variant="outlined">
      <CardMedia
        component="img"
        height="auto"
        image={movie.image}
        alt="movie img"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movie.title}
        </Typography>
        <Typography variant="overline" gutterBottom sx={{ display: "block" }}>
          {`${movie.director} / ${movie.release_date} / ${movie.running_time} minutes`}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {movie.description}
        </Typography>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export { MovieCard };
```

- Pentru a putea utiliza componenta creată o vom importa în fișierul _App.jsx_
- _src/App.jsx_
```js
import './App.css'
import { MovieCard } from './components/MovieCard'

function App() {

  return (
      <MovieCard/>
  )
}

export default App
```

## 3. Bonus - utilizarea tabelelor

- Pe lângă componente de bază, Material UI oferă multe componente smart, care, pe lângă un aspect specific, prezintă și o serie de funcționalități deja implementate

- Pentru a observa un exemplu, vom integra componenta [Data Grid](https://mui.com/x/react-data-grid/), ce permite afișarea datelor într-un tabel, însă oferă, în mod implicit, posibilitatea de a pagina, sorta și filtra datele afișate, precum și de a ascunde dinamic coloanele afișate

- Vom avea nevoie de un pachet ce conține implementarea tabelului
```
npm install --save @mui/x-data-grid
```

- Astfel, vom scrie componenta _src/components/MoviesTable.jsx_, utilizând același API pentru obținerea facilă de date:

```js
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const MoviesTable = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("https://ghibliapi.vercel.app/films")
      .then((response) => response.data)
      .then((moviesData) => setMovies(moviesData));
  }, []);

  // configurarea coloanelor
  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      align: "center",
      headerClassName: "table-header",
      headerAlign: "center",
    },
    {
      field: "director",
      headerName: "Director",
      flex: 1,
      align: "center",
      headerClassName: "table-header",
      headerAlign: "center",
    },
    {
      field: "release_date",
      headerName: "Year",
      type: "number",
      flex: 0.5,
      align: "center",
      headerClassName: "table-header",
      headerAlign: "center",
    },
    {
      field: "running_time",
      headerName: "Duration",
      type: "number",
      flex: 0.5,
      align: "center",
      headerClassName: "table-header",
      headerAlign: "center",
    },
  ];

  return (
    <div style={{ height: 400, width: 800 }}>
      {/* utilizarea DataGrid */}
      <DataGrid rows={movies} columns={columns} />
    </div>
  );
};

export { MoviesTable };
```

- Ulterior, putem importa și folosi componenta în fișierul _App.jsx_

## 4. PrimeReact
- O altă bibliotecă de componente vizuale foarte utilizată în aplicațiile React este [PrimeReact](https://primereact.org/), ce prezintă atât un aspect diferit față de Material UI, cât și componente cu diferite funcționalități și o filosofie de utilizare diferită

- Urmărește clipurile de mai jos pentru a vedea cum poți utiliza PrimeReact pentru a implementa un tabel similar cu cel definit anterior
    - [Integrarea unui tabel](https://www.youtube.com/watch?v=gpIXwZZxKws)
    - [Paginarea și filtrarea datelor din tabel](https://www.youtube.com/watch?v=YjN0cq2BO6k)
    - [Sortarea datelor din tabel](https://www.youtube.com/watch?v=n-xsJh0Xi1Y)

- În plus, pe lângă bibliotecile "tradiționale" de componente, ce adesea oferă programatorilor o variantă îmbunătățită a elementelor native din browser, există biblioteci ce simplifică implementarea unor scenarii particulare, cum ar fi desenarea unei hărți sau a unui grafic 

🤔 Urmărește clipul de mai jos pentru a vedea cum poți utiliza Google Charts într-o aplicație React
    - [Utilizare Google Charts](https://www.youtube.com/watch?v=ss2Xui0NT-U)

## 5. Lucru individual

- Pentru a te familiariza mai bine cu utilizarea bibliotecii Material UI încearcă să înlocuiești componentele din aplicația pe care am dezvoltat-o la seminarele trecute cu componente exportate de Material UI

- Poți găsi lista de componente [aici](https://mui.com/material-ui/all-components/) :)
