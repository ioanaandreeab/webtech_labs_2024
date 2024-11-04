# Seminar 6 - Server HTTP folosind Express.js

### Conținut

1. [Server HTTP (Recapitulare)](#1-server-http)

2. [Node.js](#2-nodejs)

    2.1 [Exemplu de server HTTP Node.js](#21-exemplu-de-server-http-%C3%AEn-nodejs) 

3. [Module](#3-module)

4. [npm](#4-npm) 

    4.1 [Ce este un pachet?](#41-ce-este-un-pachet)

    4.2 [npm](#42-npm)

    4.3 [Fișierul package.json](#43-fi%C8%99ierul-packagejson)

    4.4 [Comenzi uzuale](#44-comenzi-uzuale)

5. [Express.js](#5-expressjs)

6. [Structura proiectelor](#6-structura-proiectelor)

    6.1 [Organizare după tip](#61-organizare-dup%C4%83-tip)

    6.2 [Organizare după feature](#62-organizare-dup%C4%83-feature)

    6.3 [Organizarea proiectului curent și Express Router](#63-organizarea-proiectului-curent-%C8%99i-express-router)

7. [Middlewares](#7-middlewares)

## 1. Server HTTP (Recapitulare)

- HTTP este un protocol de tip _client-server_, ce funcționează printr-un schimb de mesaje inițiat de către _client_ (un **request**), la care _serverul_ răspunde (**response**)


![](https://res.cloudinary.com/lwgatsby/f_auto/www/uploads/2023/05/client-server-network.jpg)

- Fiecare resursă disponibilă pe web se află stocată pe un server și poate fi accesată de către oricare client prin intermediul unui **URL** (Uniform Resource Locator) ce are structura:
```sh
    [protocol]://[domeniu]/[cale/către/resursă?parametru1=valoare1&parametru2=valoare2]

    exemplu:
    https://wikipedia.org/wiki/World_Wide_Web
```
- Puteți revizita fiecare detaliu despre structura URL în [seminarul 2](https://github.com/ioanaandreeab/webtech_labs_2024/tree/main/lab2#11-cum-poate-fi-g%C4%83sit%C4%83-o-resurs%C4%83-pe-web)

- Pe lângă URL, protocolul HTTP definește o serie de **metode** ce descriu tipul acțiunii pe care un client o face prin intermediul unui request:
    - Cele mai cunoscute metode HTTP sunt:
        - **GET** - listarea unei resurse
        - **POST** - crearea unei resurse
        - **PUT** - actualizarea unei resurse
        - **DELETE** - ștergerea unei resurse
        - [Toate metodele HTTP](https://www.w3schools.com/tags/ref_httpmethods.asp)

    - În funcție de metoda specificată, serverul procesează cererea și întoarce un răspuns ce conține un _status code_ care descrie starea operațiunii efectuate:
        - **1**XX - răspunsuri informaționale
        - **2**XX - răspunsuri de succes
        - **3**XX - răspunsuri ce privesc mutarea resurselor (redirecționarea)
        - **4**XX - erori de client
        - **5**XX - erori de server

- Pe parcursul următoarelor seminare vom învăța conceptele de bază ale programării web implementând o aplicație de gestionare ale unor colecții personale de filme

- Vom începe cu definirea și implementarea serverului (partea de _back-end_) și vom crea, ulterior, o interfață web (partea de _front-end_) pe care o vom conecta la server

- Pentru implementarea ambelor părți componente vom folosi _JavaScript_
## 2. Node.js

- Pentru a implementa partea de back-end vom utiliza _Node.js_

- Node.js este un **mediu de execuție JavaScript** și o platformă open-source bazată motorul JavaScript _V8_ al browser-ului Google

- Permite executarea codului JavaScript _în afara unui browser web_ (utilizarea clasică a JavaScript)

- Din acest motiv, permite **dezvoltarea aplicațiilor server-side**

💡 De notat faptul că Node.js  folosește un model de I/O ne-blocant și asincron pentru a gestiona cererile și evenimentele, ceea ce îl face foarte eficient și potrivit pentru aplicații cu mulți utilizatori simultani

### 2.1 Exemplu de server HTTP în Node.js

- Un exemplu de un server simplu HTTP care rulează pe portul _8080_ și returnează un mesaj ar putea fi:
```js
    const http = require("http");

    // pentru moment, vom simula conectarea la o bază de date reală prin utilizarea unor date definite locale
    const movies = ["My Neighbor Totoro", "Soul", "Hamilton", "Spider-Man: Across the Spider-Verse"];

    http
        .createServer((req, res) => {
            res.write(JSON.stringify({records: movies}));
            res.end();
        }).listen(8080);
```

- Putem observa din interacțiunea cu acest server că răspunsul este returnat la accesarea adresei absolute _http://localhost:8080/_ în browser (sau utilizând _Postman_ pentru a trimite un request de tip **GET**)

- Dacă vrem să extindem capabilitățile acestui server web putem defini mai multe așa-numite _rute_, care sunt utilizate pentru direcționarea cererilor către anumite funcții de procesare
    - În cazul nostru, ruta pentru cerere este "/" (ruta principală și, momentan, singura)

- Deși simplu de citit și înțeles pentru moment, codul scris definește, în același fișier, atât _nivelul de peristență a datelor_, cât și pe cel _gestionării request-urilor_

- În cadrul unei aplicații complexe, acest lucru ar face codul foarte greu de scris și înțeles, motiv pentru care, fiecare funcționalitate poate fi definită într-un modul, ce poate fi importat ulterior în alte fișiere
## 3. Module

- Un modul reprezintă o metodă de a organiza codul, împărțindu-l în mai multe structuri de _complexitate mai redusă_, _independente_ și _reutilizabile_

- În JavaScript există mai multe modalități (standarde) de a defini module. Două dintre cele mai comune sunt:
    - **CommonJS** - _standard server-side_, folosit în mod default pentru Node.js; folosește instrucțiunile **'module.exports'** și **'require'**
    ```js
        // mymodule.js
        const myFunction = () => {
        // ...
        };

        module.exports = {
            myFunction
        };

        // main.js
        const myModule = require('./mymodule');
        myModule.myFunction();
    ```
    - **ECMAScript (ESModule)** - standard folosit în principal pentru medii _client-side_; folosește instrucțiunile **'import'** și **'export'**
    ```js
        // mymodule.js
        const myFunction = () => {
        // ...
        };

        export { myFunction };

        // main.js
        import { myFunction } from './mymodule';
        myFunction();
    ```

- În cazul nostru, vom defini un nou fișier, denumit _movies.js_ în care vom defini și exporta variabila movies, urmând să o importăm în fișierul principal

    - Pentru început vom folosi module CommonJS în partea de back-end, urmând să actualizăm ulterior implementarea pentru a utiliza ESModules

## 4. npm 

### 4.1 Ce este un pachet?

- Modulele pe care le-am discutat în secțiunea anterioară pot fi grupate în cadrul unui _pachet_

- Un pachet este, deci, o _colecție de module_ ce funcționează împreună și definesc o serie de funcționalități

- Aceste pachete sunt adesea create și distribuite pentru a facilita dezvoltarea software în JavaScript și pentru a face codul reutilizabil și ușor de gestionat

- Până în acest punct am discutat doar de _module locale_ (deoarece ne permit să exportăm și importăm cod definit în fișiere diferite într-un mod direct și rapid), însă, de multe ori, un dezvoltator va descărca _module remote_ pentru a rezolva probleme des întâlnite utilizând cod extern

### 4.2 npm
- npm (Node Package Manager) este un _manager de pachete pentru Node.js și JavaScript_

- Este unul dintre cele mai mari și populare ecosisteme de pachete open-source și este utilizat pentru a gestiona dependențele, distribui pachete și a automatiza sarcini legate de dezvoltarea JavaScript și Node.js

- Registrul npm conține peste **800.000 de pachete** care sunt folosite de peste **17 milioane de dezvoltatori**

- Datorită rolului important pe care îl are în cadrul ecosistemului, npm este instalat implicit împreună cu Node.js

- Pentru a putea importa module externe în cadrul aplicației noastre, vom inițializa un pachet folosind comanda _npm init_ și completând datele cerute

### 4.3 Fișierul package.json

- După completarea pasului anterior observăm apariția, în directorul curent, a fișierului _package.json_

- Fișierul _"package.json"_ este un _fișier de configurare_, folosit pentru a defini și gestiona detaliile unei aplicații

- Conține informații precum:
    - numele și descrierea proiectului
    - dependențele și dependențele dezvoltator ale proiectului
        - dependențele dezvoltator sunt necesare doar în etapa de dezvoltare a proiectului
    - versiunea proiectului
    - scripturi 
    - detalii despre autor
    - existența unei licențe asociate proiectului
    - fișierul de intrare al aplicației

- Exemplu de fișier _package.json_
```json
    {
        "name": "exemplu-proiect",
        "version": "1.0.0",
        "description": "Primul meu proiect",
        "main": "index.js",
        "scripts": {
            // scripturile pot fi definite în acest fișier și utilizate ulterior în terminal
            // în acest exemplu, vom putea folosi comanda npm start ce va executa, de fapt, comanda node main.js
            // în general este recomandată utilizarea scripturilor, deoarece acestea pot defini comportamente mai complexe ce pot fi executate prin utilizarea unei singure comenzi
            "start": "node index.js",
        },
        "author": "Ion Popescu",
        "license": "MIT",
        "dependencies": {
            "lodash": "1.0.0"
        },
        "devDependencies": {
            "nodemon": "1.0.0"
        }
    }
```

- Acest fișier este foarte important, în absența lui neputând fi gestionate importurile de pachete externe

    - Conținutul fișierul package.json este relativ _dinamic_, în special în zona de declarare a dependențelor, și trebuie inclus în repository-ul unui proiect

### 4.4 Comenzi uzuale

- **npm install**
    - folosită pentru a instala un pachet
    - e urmată de numele pachetului, spre exemplu:
    ```
        npm install lodash
    ```
    - poate primi opțiunea "-g" pentru a face instalarea global pe întreg sistemul
    - poate primi opțiunea "-D" pentru a instala un pachet ce va fi folosit doar în dezvoltare
    - poate primi opțiunea "--save" pentru a salva o dependență în fișierul _package.json_ al proiectului
        - analog, există opțiunea "--save-dev" pentru a salva o dependență de dezvoltator
- **npm uninstall**
    - folosită pentru a dezinstala un pachet
    - e urmată de numele pachetului, spre exemplu:
    ```
        npm uninstall lodash
    ```
- **npm init**
    - inițializează un proiect și creează un fișier _package.json_ cu configurările care au fost selectate după execuția comenzii
- **npm update**
    - actualizează un pachet și preia din registrul npm ultima versiune disponibilă
- **npm start**
    - lansează în execuție un proiect
- **npm publish**
    - publică un pachet în registrul npm
- **npm audit**
    - analizează pachetele instalate și determină dacă există vulnerabilități cunoscute în versiunile respective

### 4.5 Utilizarea pachetelor externe

- Pentru a observa în practică utilizarea unor pachete externe, vom instala pachetul _random_

```
npm install --save random
```

- În cadrul fișierului _main.js_ vom implementa o nouă rută care va genera un număr aleatoriu și, în funcție de restul obținut în urma împărțirii acestuia la numărul total de filme existent în aplicație, va returna informațiile despre filmul aflat pe acea poziție în memorie (în cazul nostru în cadrul array-ului definit)

```js
    const http = require("http");
    const random = require("random");

    const { movies } = require('./movies');

    http
        .createServer((req, res) => {
            if(req.url === "/random") {
                const randomIndex = random.int(0, movies.length - 1);
                res.write(JSON.stringify({movie: movies[randomIndex]}));
            } else {
                res.write(JSON.stringify({records: movies}));
            }

            res.end();
        }).listen(8080);
```

- Dacă încercăm să rulăm serverul acum, vom obține o eroare: _Error [ERR_REQUIRE_ESM]_

    - Aceasta indică faptul că acest pachet nu mai poate fi importat folosind sintaxa clasică, CommonJS
    - În practică, CommonJS nu este deprecated, dar, în viitorul apropiat, din ce în ce mai multe proiecte vor migra către ESModules, datorită faptului că acesta este standardul suportat de către limbaj (împreună cu alte câteva avantaje ce țin de performanță)

- Pentru a schimba tipul de module folosit din CommonJS în ESModules trebuie să:

    - Adăugăm în _package.json_ proprietatea **"type": "module"**
    - Rescriem implementarea anterioară folosind sintaxa _import/export_
    ```js
        // main.js
        import http from "http";
        import random from "random";

        import { movies } from "./movies.js";

        http
            .createServer((req, res) => {
                if(req.url === "/random") {
                    const randomIndex = random.int(0, movies.length - 1);
                    res.write(JSON.stringify({movie: movies[randomIndex]}));
                } else {
                    res.write(JSON.stringify({records: movies}));
                }

                res.end();
            }).listen(8080);
    ```

    ```js
        //movies.js
        export const movies = ["My Neighbor Totoro", "Soul", "Hamilton", "Spider-Man: Across the Spider-Verse"];
    ```

## 5. Express.js

- Node.js este un mediu complex și foarte puternic, dar observăm că, deși simplu la prima vedere, acesta nu a fost creat în mod explicit pentru gestionarea mai multor rute (denumite și _endpoint-uri_), un lucru foarte comun în cadrul serverelor web

- Dacă revenim la exemplul referitor la serverul HTTP pentru gestionarea colecției de filme, putem observa că, dacă ar trebui să adăugăm și mai multe rute, ar rezulta o structură _if_..._else_ foarte complexă și dificil de citit

- În practică, _modularitatea codului_ este o caracteristică _foarte importantă_, motiv pentru care, pentru a permite dezvoltatorilor să creeze servere web într-un mod mai organizat, au apărut multiple **framework-uri** ce pot fi folosite suplimentar, _extinzând_ funcționalitățile runtime-ului

- Cel mai folosit framework pentru scrierea de servere web în Node.js este _Express.js_ (sau express)

- Înainte de a putea folosi express, este nevoie să îl instalăm:

```
    npm install --save express
```

- Folosind express, putem rescrie implementarea anterioară, având la dispoziție metode mult mai puternice de a defini endpoint-urile

```js
    import express from "express";
    import random from "random";
    import { movies } from "./movies.js";

    const PORT = 8080;

    const app = express();

    // metoda HTTP pentru care acest handler va fi atașat
    app.get("/", (req, res) => {
        // req conține detalii despre request
        // res conține detalii despre response
        res.send({ records: movies });
    });

    // în comparație cu metoda anterioară, în express nu este importantă ordinea definirii endpoint-urilor
    app.get("/random", (req, res) => {
        const randomIndex = random.int(0, movies.length - 1);
        res.send({ movie: movies[randomIndex] });
    });

    app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
```
- Codul este mult mai simplu de urmărit și de înțeles, iar procesarea fiecărei rute este făcută individual, în loc ca aceasta să fie gestionată de o structură complexă _if...else_

- După cum am menționat la început, un request HTTP poate fi de mai multe tipuri, în funcție de metoda HTTP utilizată

- În funcție de metodă, un request poate conține mai multe tipuri de date ce sunt procesate de către server în vederea generării unui răspuns corect

- Tipurile de date ce pot însoți un request sunt:
    - Parametri de tip query (**query params**)
    - Parametri de tip path (**path params**)
    - Parametri de tip body (**body params**)

- În cazul request-urilor de tip **GET**, ce au ca scop obținerea unor informații de pe server, putem folosi _parametrii query și path_:

    - Parametrii de tip **query** sunt definiți **la finalul URL-ului**, prin marcajul specific _?numeParametru=valoare_
    - Parametrii de tip **path** sunt **parte a URL-ului** și _identifică unic_ resursa cerută _movie/1_

- Parametrii query sunt utilizați atunci când informăm serverul cu privire la niște variabile de care trebuie să țină cont pentru realizarea acțiunii invocate

```js
    // va răspunde unui request de tipul http://localhost:8080/search?title=hamil
    app.get("/search", (req, res) => {
        // accesarea parametrilor de tip query
        const requestedTitle = req.query.title;
        const identifiedMovie = movies.find(movie => movie.includes(requestedTitle));

        if (identifiedMovie) {
            res.send({ movie: identifiedMovie });
        } else {
            // ne amintim că fiecare response are un status atașat ce informează clientul cu privire la 
            //  tipul răspunsului
            res.status(404).send({ message: "Movie not found" });
        }
    });
```

- Spre deosebire de aceștia, parametrii de tip **path** sunt utilizați pentru a _identifica unic_ o entitate la nivelul serverului
```js
    app.get("/:id", (req, res) => {
        // accesarea parametrilor de tip path
        const id = req.params.id;
        // vom considera ca id-ul este indexul elementului în cadrul array-ului movies
        const identifiedMovie = movies[id];

        if(identifiedMovie) {
            res.send({movie: identifiedMovie});
        } else {
            res.status(404).send({ message: "Movie not found" });
        }
    });
```

- În cazul request-urilor ce au ca scop _modificarea_ unor date existente la nivelul serverului, cum ar fi cele de tip **POST, PUT sau PATCH**, pe lângă parametrii de tip query și path, putem folosi și parametri **body**, mult mai complecși, ce pot avea diferite formate

- "Din cauza" acestor multiple formate ce pot fi utilizate, înainte de a putea procesa body-ul unui request, trebuie să _informăm_ express cu privire la formatul pe care îl vom folosi

- La fel ca în majoritatea aplicațiilor web, body-ul pe care îl vom transmite către server va fi structurat sub forma unui **JSON**, motiv pentru care trebuie să adăugăm, imediat după definirea variabilei app, instrucțiunea

```js
    app.use(express.json())
```

- Ulterior, vom putea implementa un endpoint care să ne permită să adăugam un film nou la lista de filme existente
```js
    // observăm utilizarea metodei post pentru a gestiona un request de tipul POST
    app.post("/", (req, res) => {
        // accesarea parametrilor de tip body
        const newMovie = req.body.title;

        // dacă filmul nu există deja, îl adăugăm
        if(!movies.includes(newMovie)) {
            movies.push(newMovie);
        }

        res.status(201).send({result: "Movie was created"});
    });
```
- Folosind exemplele anterioare, **încearcă să definești singur două endpoint-uri noi**:

- primul va modifica numele unui film cu o valoare primită ca parametru
- al doilea va șterge un film, după nume, din lista de filme
- pe lângă implementarea corectă a celor două operații, trebuie să alegi și metodele HTTP corecte - folosește seminarul anterior (sau Internetul) pentru a înțelege ce metode trebuie să folosești

- Deși express ne ajută să definim rutele într-un format mai organizat, în mod implicit, vom ajunge să implementăm toată aplicația în cadrul unui singur fișier, lucru ce nu este recomandat, ținând cont că acesta va deveni foarte greu de citit pe măsură ce aplicația este dezvoltată

- Pentru organizarea proiectelor back-end există 2 variante principale: **organizarea după tip** și **organizarea după feature**

## 6. Structura proiectelor
### 6.1 Organizare după tip

- În acest model de organizare, codul sursă este grupat și organizat în funcție de tipul de componentă sau funcționalitate. De obicei, aceste tipuri includ:

- **director pentru modele (models)**
    - descrierea entităților utilizate în aplicație
- **director pentru controlere (controllers)**
    - logica de gestionare a cererilor HTTP și manipularea datelor din models
- **director pentru rute (routes)**
    - legătura dintre cererile HTTP și controllere
    - rutele stabilesc cum sunt gestionate diferitele cereri la nivel de URL și direcționează către controlerul potrivit
- **director pentru servicii (services)**
    - funcții sau servicii

```
    app/
    ├── controllers/
    │   └── auth.js
    ├── models/
    │   └── auth.js
    ├── validators/
    │   └── auth.js
    ├── index.js
    └── package.json
```

- În acest exemplu putem observa cum, în împărțirea existentă a tipurilor de directoare, există câte un fișier pentru feature-ul de autentificare

### 6.2 Organizare după feature

- În acest model, codul este grupat în funcție de caracteristicile sau funcționalitățile aplicației
```
    app/
    ├── auth/
    │   ├── controller.js
    │   ├── model.js
    │   └── validator.js
    ├── index.js
    └── package.json
```
- În acest exemplu putem observa cum pentru un feature de autentificare, care are atribuit propriul său director independent în structura aplicației, există un controller, un model și un validator specific

### 6.3 Organizarea proiectului curent și Express Router

- În cadrul seminarului vom organiza proiectul după **tip**, rescriind aplicația curentă astfel încât să respecte structura afișată anterior
```
    app/
    ├── controllers/
    │   └── movies.js
    ├── models/
    │   └── movies.js
    ├── routes/
    │   └── movies.js
    ├── main.js
    └── package.json
```

- Pentru a putea separa rutele de controllere și a le importa, ulterior, în fișierul principal, vom folosi _Express Router_, cu ajutorul căruia vom putea împărți fișierul main.js în 3 fișiere distincte:

    - routes/movies.js
    ```js
        import express from 'express';
        import * as movieController from "../controllers/movies.js";

        export const router = express.Router();
        // GET routes
        router.get("/", movieController.getMovies);
        router.get("/random", movieController.getRandomMovie);
        router.get("/search", movieController.search);
        router.get("/:id", movieController.getById);

        // POST routes
        router.post("/", movieController.create);

        // other routes
    ```
    - controllers/movies.js
    ```js
        import random from "random";
        import { movies } from "../models/movies.js";

        const getMovies = (req, res) => {
            res.send({records: movies});
        }

        const getRandomMovie = (req, res) => {
            const randomIndex = random.int(0, movies.length - 1);
            res.send({ movie: movies[randomIndex] });
        }

        const search = (req, res) => {
            // accesarea parametrilor de tip query
            const requestedTitle = req.query.title;
            const identifiedMovie = movies.find(movie => movie.includes(requestedTitle));

            if (identifiedMovie) {
                res.send({ movie: identifiedMovie });
            } else {
                res.status(404).send({ message: "Movie not found" });
            }
        }

        const getById = (req, res) => {
            // accesarea parametrilor de tip path
            const id = req.params.id;
            // vom considera ca id-ul este indexul elementului în cadrul array-ului movies
            const identifiedMovie = movies[id];

            if(identifiedMovie) {
                res.send({movie: identifiedMovie});
            } else {
                res.status(404).send({ message: "Movie not found" });
            }
        }

        const create = (req, res) => {
            // accesarea parametrilor de tip body
            const newMovie = req.body.title;

            // dacă filmul nu există deja, îl adăugăm
            if(!movies.includes(newMovie)) {
                movies.push(newMovie);
            }

            res.status(201).send({result: "Movie was created"});
        };

        // other methods

        export {
            getMovies,
            getRandomMovie,
            search,
            getById,
            create
        }  
    ```
    - main.js
    ```js
        import express from 'express';
        import {router as moviesRouter} from './routes/movies.js';

        const PORT = 8080;

        const app = express();
        app.use(express.json());

        // atașarea rutelor specifice unui film
        app.use("/movies", moviesRouter);

        app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
    ```

- Obținem, astfel, un proiect mai bine organizat care, pe măsură ce vor fi adăugate funcționalități și entități noi se va extinde pe _orizontală_ (mai multe fișiere), contrar exemplului anterior când s-ar fi extins pe _verticală_ (un fișier foarte lung)

## 7. Middlewares

- În contextul unui server web, un middleware este o metodă intermediară ce este executată înainte ca un request să fie procesat

- În cadrul unui middleware putem implementa funcționalități specifice serverelor web, dar cu caracter general, ce pot fi integrate în mai multe endpoint-uri:
    - logging
    - autentificare
    - gestionarea erorilor

- Fiind o componentă de alt tip, vom crea un fișier ce descrie funcționalitatea middleware-ului într-un director nou denumite _middlewares_

- Folosind un middleware, putem implementa, de exemplu, o metodă care să logheze ora și path-ul pe care a fost înregistrat un request:
```js
    // middlewares/logging.js
    export const logRequestDetails = ((req, res, next) => {
        console.log(`${new Date()}: ${req.path}`);
        next();
    });
```

- Pentru a aplica **global** acest middleware, pentru fiecare request, îl vom importa și utiliza în _main.js_
```js
    import { logRequestDetails } from './middlewares/logging.js';
    ....
    app.use(logRequestDetails);
```

- Dacă dorim utilizarea lui _doar_ în cadrul unui grup specific de endpoint-uri, cum ar fi movies, îl putem importa și utiliza la nivelul fișierului _routes/movies.js_
```js
    import { logRequestDetails } from '../middlewares/logging.js';
    ...
    router.use(logRequestDetails);
```

🤔 Probabil cea mai importantă și comună utilizare pentru un middleware în acest context autentificarea, caz în care middleware-ul are scopul de a "proteja" anumite rute de a nu fi accesate de persoane neautorizate; puteți urmări un clip [aici](https://www.youtube.com/watch?v=xEh6Cb1PSAg) pentru implementarea unui astfel de exemplu.



