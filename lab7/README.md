# Seminar 7 - REST & Persistența datelor

### Conținut

1. [REST](#1-rest)

	1.1 [Ce este REST?](#11-ce-este-rest)

	1.2 [Caracteristicile REST](#12-caracteristici-rest)

	1.3 [REST vs CRUD](#13-rest-vs-crud)

	1.4 [API vs endpoint](#14-api-vs-endpoint)

2. [Persistența datelor](#2-persisten%C8%9Ba-datelor)

	2.1 [Bazele de date relaționale](#21-bazele-de-date-rela%C8%9Bionale)

	2.2 [SQLite](#22-sqlite)

	2.3 [Sequelize](#23-sequelize)

3. [Lucru individual](#3-lucru-individual)
## 1. REST

### 1.1 Ce este REST?

- **REST** (**RE**presentational **S**tate **T**ransfer) este un stil arhitectural folosit pentru dezvoltarea aplicațiilor web introdus în anul 2000 [în teza de doctorat a lui Roy Fielding](https://ics.uci.edu/~fielding/pubs/dissertation/fielding_dissertation.pdf)
- Această arhitectură are în centrul său conceptul de _resursă_ (orice tip de dată care compune aplicația propriu-zisă)
- În cadrul unui sistem REST, un _client_ comunică cu un _server_ printr-o _interfață uniformă_ care descrie o colecție de resurse ce pot fi create, listate, interogate, actualizate sau șterse
![rest-api-diagram](https://images.ctfassets.net/vwq10xzbe6iz/5sBH4Agl614xM7exeLsTo7/9e84dce01735f155911e611c42c9793f/rest-api.png)
- Pentru a putea să înțelegem mai bine ce înseamnă REST, să ne imaginăm următoarele:
	- Pornim de la premisa existenței unui client și unui server web pentru gestiunea unor filme
	- Clientul trimite un request de tip GET pentru a obține lista completă de filme, iar serverul interoghează baza sa de date pentru a obține informația cerută
	- În acest caz, o **resursă** se referă la ceva ce aparține _exclusiv serverului_
	- Atunci când serverul răspunde clientului, el trimite o **reprezentare** a resursei respective la un moment dat
	- Astfel, în exemplul nostru, între server și client are loc un **transfer** al stării pe care o are o reprezentare a filmelor stocate în baza de date

### 1.2 Caracteristici REST

- La bază, REST este o serie de bune practici care au ca scop definirea unui sistem scalabil, utilizând instrumente native web-ului

- Cele mai importante caracteristici REST sunt:

	- **Utilizarea resurselor ca mod de reprezentare a datelor**

	- **Arhitectura Client-Server**

	- **Utilizarea verbelor HTTP pentru a descrie o serie de operații standard ce pot fi efectuate asupra resurselor**

	- **Interfața uniformă**
		- toate resursele descrise în cadrul unui sistem pot fi utilizate printr-o interfață identică din punct de vedere structural

	- **Lipsa stărilor între request-uri (Stalessness)** 
		- fiecare cerere HTTP către un server trebuie să conțină toate informațiile necesare pentru a fi înțeleasă și procesată

	- **Utilizarea cache-ului**
		- pentru a îmbunătăți performanța și eficiența sistemului, părțile componente pot implementa mecanisme de caching care să reutilizeze, pentru o anumită perioadă de timp, răspunsurile deja generate

	- **Stratificarea sistemului**
		- pentru a permite scalarea unui sistem, existența unor intermediari, cum ar fi serverele proxy sau mecanismele de cache, nu trebuie să afecteze în vreun fel funcționalitatea sistemului

- Pe lângă aceste principii necesare, putem defini și o serie de recomandări adiționale care să ofere și mai mult suport pentru implementarea corectă a serviciilor REST:
	- Folosirea formatului JSON pentru a trimite și a primi date

	- Folosirea _substantivelor la plural_ în locul verbelor în cadrul URL-urilor
		- Spre exemplu, un endpoint pentru obținerea întregii colecții de filme ar trebui să arate astfel:
		```
			http://localhost:8080/movies
		```

	- Utilizarea corectă și uniformă a codurilor de stare (status codes)

	- Folosirea URL-urilor nested pentru a sublinia legăturile dintre resurse
		- Spre exemplu, dacă am vrea să apelăm un URL pentru a afișa toate filmele dintr-o colecție, acesta ar putea arăta astfel:
		```
			http://localhost:8080/collections/1/movies
		```
	- Folosirea _filtrării, sortării și paginării_ pentru a eficientiza lucrul cu un volum mare de date

	- Versionarea API-urilor
		- Un api poate trece prin mai multe revizii de-a lungul timpului, fapt ce este recomandat a fi marcat
		```
			http://localhost:8080/api/v1/movies

			http://localhost:8080/api/v2/movies
		```

- Atunci când toate principiile generale ale REST sunt aplicate, discutăm despre un _API RESTful_

💡 Există, deopotrivă, și API-uri pe care le numim _RESTlike_, diferența în cazul acestora fiind că pot face anumite compromisuri sau adaptări de la respectarea principiilor REST în funcție de cerințele specifice ale aplicației sau dezvoltatorului
### 1.3 REST vs CRUD

- În discuția despre arhitectura REST trebuie să punctăm că aceasta nu este echivalentă cu operațiunile CRUD

- Am menționat și în secțiunea anterioară că arhitectura REST _utilizează_ verbe HTTP (care formează operațiunile CRUD), însă aceasta este mult mai complexă de atât

- REST este mai flexibil decât CRUD, permițând mai multe operațiuni asupra resurselor decât cele standard (Create, Read, Update, Delete), însă este de notat și faptul că CRUD poate fi implementat utilizând principiile REST

- CRUD reprezintă un acronim al cuvintelor CREATE, READ, UPDATE, DELETE și exprimă principalele tipuri de acțiuni care pot fi executate asupra unei resurse

- Dat fiind faptul ca REST are la bază conceptul de resursă, operațiunile CRUD pot fi utilizate, împreună cu verbele HTTP, pentru a descrie un API REST:

	- CREATE - POST - crearea unei resurse
	- READ - GET - citirea unei resurse
	- UPDATE - PUT/PATCH - actualizarea unei resurse
	- DELETE - DELETE - ștergerea unei resurse

### 1.4 API vs endpoint

- În general, atunci când vorbim despre REST, o facem în contextul unui REST API, motiv pentru care este important să înțelegem exact ce reprezintă un _API_, concept corelat cu ideea de _endpoint_

- **API** (Application Programming Interface)
	- Este un ansamblu de comenzi, funcții ori protocoale care au rolul unui intermediar pentru comunicarea dintre două aplicații
	- Furnizează o metodă standardizată pentru interacțiunea cu un sistem sau serviciu
	- Poate să includă mai multe endpoint-uri care permit accesul la diferite resurse sau funcționalități

- **Endpoint**:
	- Este un punct specific de acces sau o locație specifică în cadrul unui API. Acesta reprezintă o cale sau un URL la care se poate accesa o anumită resursă sau funcționalitate în cadrul API-ului.
	- Este adesea utilizat pentru a accesa sau a efectua operații asupra resurselor specifice ale unui sistem.

- Ierarhia acestora poate fi observată și în figura următoare:
![api-vs-endpoint](https://assets-global.website-files.com/5ff66329429d880392f6cba2/625e52cd0b6c58527f5819d5_Endpoints%20of%20the%20API%20-%20clearly.jpg)

- În esență, API-ul definește regulile și interfața generală pentru comunicarea cu un sistem informatic, în timp ce endpoint-urile reprezintă locațiile specifice în cadrul API-ului unde pot fi accesate resurse sau efectuate diferite operații

## 2. Persistența datelor

- Un avantaj oferit de implementarea unui API REST este obținerea unui grad ridicat de concordanță între modul în care datele sunt reprezentate în cadrul serverului și a modului în care acestea vor fi expuse clienților, motiv pentru care modelarea resurselor devine și mai importantă

🤔 Pentru definirea vizuală structurilor ce compun nivelul de persistență poți folosi un tool ca [dbdiagram](https://dbdiagram.io/home)

- În acest context, persistența datelor se referă la capacitatea de a **stoca** și **menține** date într-un mod durabil și sigur pentru o perioadă îndelungată

- Persistența datelor este asigurată de cele mai multe ori în aplicațiile web prin utilizarea **bazelor de date**, _relaționale_ și _non-relaționale_
	- **Bazele de date relaționale**: sisteme de gestiune a bazelor de date care utilizează tabele și relații pentru a stoca date în mod structurat
		- ex: MySQL, PostgreSQL, Microsoft SQL Server
	- **Bazele de date non-relaționale (noSQL)**: soluții de stocare a datelor care nu se bazează pe tabele și relații, ci folosesc alte modele de date, cum ar fi documente, grafuri sau chei-valoare
		- ex: MongoDB, Cassandra, Redis
		- Bazele de date nu fac scopul acestei materii, însă găsiți aici un tutorial pentru utilizarea [MongoDB](https://www.geeksforgeeks.org/mongodb-tutorial/) alături de ORM-ul [mongoose](https://mongoosejs.com/docs/)

### 2.1 Bazele de date relaționale

- În general, sistemele de baze de date relaționale sunt aplicații de sine stătătoare ce sunt instanțiate sub forma unui server la care o aplicație back-end, din perspectiva de client, se conectează și execută query-uri SQL

- Acest server este responsabil pentru gestionarea și administrarea bazei de date, precum și pentru tratarea cererilor venite de la clienți

- În aplicațiile complexe, utilizarea unei astfel de soluții reprezintă o alegere standard, însă, în cadrul seminarului, pentru a reduce numărul de dependențe externe, vom utiliza o bază de date self-contained: _SQLite_

### 2.2 SQLite

- **SQLite** este un engine de baze de date SQL încapsulat, nefiind necesar un server pentru utilizarea sa

- Aceasta nu necesită _nicio configurare_ și poate fi folosită imediat pentru stocarea datelor și integrarea în cadrul unei aplicații
	- Stocarea datelor va fi realizată prin utilizarea unui singur fișier

- Deoarece nu există un server care să execute query-urile asupra bazei de date, aplicația back-end este cea care va face acest lucru, motiv pentru care este nevoie să instalăm o bibliotecă ce implementează engine-ul SQLite

```
	npm install --save sqlite3
```

- Pentru testarea conexiunii la o bază de date SQLite și executarea query-urilor de test vom instala extensia [SQLite](https://marketplace.visualstudio.com/items?itemName=alexcvzz.vscode-sqlite), disponibilă pentru Visual Studio Code
	- 💡 [tutorial de utilizare](https://www.youtube.com/watch?v=JrAiefGNUq8)

- Interacțiunea cu bazele de date se poate face, în general, prin două modalități:
	- utilizarea unor query-uri SQL
		- ex: 
		```sql
			SELECT * from movies;
		```
	- utilizarea unui **ORM** (Object Relational Mapping)
		- un ORM este un instrument ce permite definirea unor obiecte prin intermediul cărora se vor genera, automat, query-uri SQL în funcție de operațiunea dorită

- În industrie, _toate_ aplicațiile complexe folosesc ORM-uri, cele mai importante avantaje fiind:
	- interacțiune simplificată, programatică, OOP cu baza de date
	- portabilitatea codului ce poate fi utilizat cu mai multe baze de date fără a necesita modificări
	- reducerea timpului de dezvoltare
	- separarea codului și ascunderea conceptelor strict legate de bazele de date în spatele unor abstractizări generale
	- optimizarea query-urilor generate și securizarea implicită a acestora

- În continuare, vom vrea să creăm o bază de date, să stabilim conexiunea cu aceasta și să refactorizăm toate rutele definite în aplicația pentru gestiunea colecțiilor de filme pentru a utiliza persistența datelor

### 2.3 Sequelize

- Sequelize este o librărie JavaScript promise-based ce servește drept un instrument ORM pentru baze de date precum Postgres, MySQL, MariaDB, SQLite ori Microsoft SQL Server

- Vom instala Sequelize folosind comanda
```
	npm install --save sequelize
```

- Pentru a ne conecta la o bază de date, vom adăuga un nou fișier, _config.js_, în directorul **models** la nivelul căruia vom defini minimul necesar pentru conectare:

```js
import { Sequelize } from "sequelize";

export const db = new Sequelize({
	// specificam tipul bazei de date pe care o vom utiliza
	dialect: "sqlite",
	// fisierul in care vor fi stocate datele va fi generat la pornirea aplicatiei
	storage: "storage.db" 
});

// metoda ce va fi apelata pentru a pregati conexiunea la baza de date
//  metoda este declarată async deoarece operațiunile authenticate și sync sunt asincrone și folosim keyword-ul await
//      pentru a aștepta finalizarea execuției
export const synchronizeDatabase = async () => {
	// verifica conexiunea la baza de date
	await db.authenticate();
	// creeaza / actualizeaza tabelele la nivelul bazei de date
	await db.sync();
};
```
- Pe lângă configurarea generală a bazei de date, vom defini o entitate care să descrie resursa **Movie** pe care am reprezentat-o, anterior, sub forma unui array și care va avea structura:

	- **id**: integer, cheie primară, autoincrementat
	- **title**: string, nenul
	- **year**: integer, nenul, > 1900
	- **director**: string, nenul
	- **genre**: string
	- **synopsis**: text
	- **duration**: integer
	- **poster**: string
		- vom stoca aici un URL către o imagine reprezentativă pentru respectivul film

- Pentru a defini entitatea folosind Sequelize vom rescrie conținutul fișierului deja existent _movies.js_ și vom adăuga implementarea:
```js
// importarea bazei de date definite in fisierul config.js
import { db } from "./config.js";
// importarea tipurilor de date suportate de sequelize
import { DataTypes } from "sequelize";

// vom sterge implementarea anterioara dupa ce vom actualiza codul utilizat in serviciul movies.js
export const movies = ["My Neighbor Totoro", "Soul", "Hamilton", "Spider-Man: Across the Spider-Verse"];

// definirea unei tabele noi cu numele Movie
export const Movie = db.define("Movie", {
	id: {
		// tipul unui camp
		type: DataTypes.INTEGER,
		// cheie primara
		primaryKey: true,
		// autoincrement
		autoIncrement: true
	},
	title: {
		type: DataTypes.STRING,
		// constrangere de camp nenul
		allowNull: false
	},
	year: {
		type: DataTypes.INTEGER,
		allowNull: false,
		// validarea ca valoarea minima ce poate fi stocata sa fie mai mare de 1900
		validate: {
			min: 1900
		}
	},
	director: {
		type: DataTypes.STRING,
		allowNull: false
	},
	genre: {
		type: DataTypes.STRING
	},
	synopsis: {
		// utilizarea unui tip de data ce permite inserarea unui text de mari dimensiuni
		type: DataTypes.TEXT
	},
	duration: {
		// utilizarea unui tip de data eficient, in concordanta cu plaja de valori ale campului
		type: DataTypes.TINYINT
	},
	poster: {
		type: DataTypes.STRING
	}
}, 
{
	indexes: [
		{
			// definirea unei constrangeri de unicitate pe baza tripletei titlu, an, regizor
			unique: true,
			fields: ['title', 'year', 'director']
		}
	]
});
```

- Dacă rulăm acum aplicația, nu vom observa nicio diferență momentan, deoarece, deși definite, baza de date și modelul Movie nu au fost încă invocate în mod direct, lucru pe care îl vom face apelând metoda _synchronizeDatabase_ în entrypoint-ul aplicației

```js
// start listening for connections
import { synchronizeDatabase } from "./models/config.js";
// .....
// vom stoca la nivelul variabilei server configurarea serverului returnata de catre metoda listen
//      metoda este async deoarece, în interior, vom folosi keyword-ul await pe metoda synchronizeDatbase pentru a aștepta finalizarea
//          procesului de sincronizare
const server = app.listen(PORT, async () => {
	try {
		// apelăm metoda ce va sincroniza modelele definite în cadrul aplicației cu baza de date
		await synchronizeDatabase();
		console.log(`Server started on http://localhost:${PORT}`);
	} catch (err) {
		console.log("There was an error with the database connection");
		// daca apare o eroare in momentul sincronizarii bazei de date, vom opri aplicatia
		server.close();
	}
});
```

- În momentul repornirii aplicației, vom observa în consolă query-urile executate de către Sequelize pentru a genera tabela Movie la nivelul bazei de date, unde vom regăsi, pe lângă câmpurile configurate explicit, și două câmpuri administrative adăugate automat: _createdAt_ și _updatedAt_
```
Executing (default): SELECT 1+1 AS result
Executing (default): SELECT name FROM sqlite_master WHERE type='table' AND name='Movies';
Executing (default): CREATE TABLE IF NOT EXISTS `Movies` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `title` VARCHAR(255) NOT NULL, `year` INTEGER NOT NULL, `director` VARCHAR(255) NOT NULL, `genre` VARCHAR(255), `synopsis` TEXT, `duration` TINYINT, `poster` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
Executing (default): PRAGMA INDEX_LIST(`Movies`)
Executing (default): CREATE UNIQUE INDEX `movies_title_year_director` ON `Movies` (`title`, `year`, `director`)
```

- Putem confirma crearea tabelelor utilizând extensia SQLite din Visual Studio Code instalată anterior

- Ultimul pas pe care trebuie să îl implementăm este actualizarea controllerelor pentru gestionarea filmelor pentru a utiliza entitatea Movie în locul array-ului movies (pe care, la finalul refactorizării, îl vom putea șterge)

- Actualizăm, pe rând, fiecare metodă, observând modul în care putem insera, actualiza, extrage și șterge date folosind entitatea Movie

```js
import {Movie} from "../models/movies.js";

const getMovies = async (req, res) => {
	const movies = await Movie.findAll();
	res.status(200).send({movies});
}

const getById = async(req, res) => {
	try {
		const movie = await Movie.findByPk(req.params.id);
		if (movie) {
			res.status(200).send({movie: movie});
		} else {
			res.status(404).send({message: "movie not found."});
		}
	} catch (err) {
		res.status(500).send({message: "server error", err: err})
	}
}

const create = async (req, res) => {
	//  campurile existente in interiorul parametrilui primit trebuie sa aiba acelasi nume precum campurile din tabela
	//  altfel, Sequelize le va ignora si va incerca sa introduca doar acele field-uri pentru care poate sa asigure identitatea
	const movie = req.body;
	await Movie.create(movie);

	res.status(201).send({message: "Movie was created"});
};

const update = async (req, res) => {
	try {
		const movie = await Movie.findByPk(req.params.id);
		if (movie) {
			const updatedMovie = await movie.update(req.body);
			res.status(200).send({movie: updatedMovie});
		} else {
			res.status(404).send({message: "movie not found."});
		}
	} catch (err) {
		res.status(500).send({message: "server error", err: err})
	}
};

const remove = async (req, res) => {
	try {
		const movie = await Movie.findByPk(req.params.id);
		if (movie) {
			await movie.destroy();
			res.status(200).send({message: "deleted movie"});
		} else {
			res.status(404).send({message:"movie not found"});
		}
	} catch(err) {
		res.status(500).send({message: "server error", err:err})
	}
};

export {
	getMovies,
	getById,
	create,
	update,
	remove
};
```

- Observăm că structura rutelor nu a fost afectată, motiv pentru care, cu excepția body-ului trimis în metodele de creare și de actualizare, API-ul păstrează aceeași interfață
	- Folosește Postman pentru a executa request-uri și extensia SQLite pentru a observa datele la nivelul bazei de date pe măsură ce sunt create și actualizate

🤔 Sequelize are foarte multe funcționalități ce pot simplifica construirea și executarea query-urilor - citește mai multe în [documentația oficială](https://sequelize.org/docs/v6/getting-started/)

## 3. Lucru individual

- Urmărind exemplul pentru entitatea Movie, încearcă să definești toate structurile necesare pentru implementarea a două entități noi: **Person** și **Collection**

- Structura entității _Person_
	- id: integer, cheie primară, autoincrementat
	- firstname: string, nenul
	- lastname: string
	- email: string, nenul, isEmail

- Structura entității _Collection_
	- id: integer, cheie primară, autoincrementat
	- name: string, nenul
	- poster: string

- Pentru fiecare entitate trebuie să implementezi câte un endpoint care să permită:
	- listarea
	- extragerea datelor despre o înregistrare individuală
	- crearea unei înregistrări
	- actualizarea unei înregistrări
	- ștergerea unei înregistrări

- Aplicația funcționează corect doar atunci când toate layerele sunt implementate și testate - ai grijă să nu uiți niciunul :)