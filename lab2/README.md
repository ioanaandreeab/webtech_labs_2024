# Seminar 2 - Web 101 && Basic JS

### Conținut

1. [Web 101](#1-web-101)

   1.1 [Cum poate fi găsită o resursă pe Web?](https://github.com/#11-cum-poate-fi-g%C4%83sit%C4%83-o-resurs%C4%83-pe-web)

   1.2 [Ce se întâmplă atunci când căutăm ceva pe Google?](#12-ce-se-%C3%AEnt%C3%A2mpl%C4%83-atunci-c%C3%A2nd-c%C4%83ut%C4%83m-ceva-pe-google)

   1.3 [Ce acțiuni poate să facă un utilizator pe Web?](#13-ce-ac%C8%9Biuni-poate-s%C4%83-aib%C4%83-un-utilizator-pe-web)

   1.4 [Care sunt componentele unei pagini web?](#14-care-sunt-componentele-unei-pagini-web)

   1.4.1 [HTML](#141-html)

   1.4.2 [CSS](#142-css)

2. [Bazele JavaScript](#2-bazele-javascript)

   2.1 [Ce este JavaScript?](#21-ce-este-javascript)

   2.2 [Există variabile în JavaScript?](#22-exist%C4%83-variabile-%C3%AEn-javascript)

   2.3 [Tipuri de date în JavaScript](#23-tipuri-de-date-%C3%AEn-javascript)

   2.4 [Obiecte](#24-obiecte)

   2.5 [Funcții](#25-func%C8%9Bii)

   2.6 [Arrays](#26-arrays)

## 1. Web 101

Web-ul a fost inventat de Sir Tim Berners-Lee la finalul anilor 80, la CERN, cu scopul de a permite cercetătorilor din toată lumea să partajeze mai rapid și mai eficient documentele aflate pe computerele institutelor.

Pentru a putea vorbi despre ce reprezintă web-ul trebuie să înțelegem ce este **internetul** și cum diferă el față de conceptul de **Web**.

- **Internetul** = _rețea globală de calculatoare_ (practic, o rețea de rețele) interconectate în cadrul căreia pot exista schimburi de informații
- **Web-ul** = _sistem informațional_ alcătuit din resurse text sau multimedia care pot fi accesate _prin intermediul Internetului_

Pentru a accesa resursele disponibile pe Web, un utilizator are nevoie, de regulă, de un software de tip _browser_, care permite afișarea paginilor web (document electronic care permite afișarea resurselor menționate anterior pe ecranele dispozitivelor, într-un mod accesibil).

Web-ul funcționează pe baza modelului **client-server**, despre care vom discuta mai mult în secțiunile următoare

### 1.1 Cum poate fi găsită o resursă pe Web?

Am văzut că Web-ul are o vastă colecție de resurse pe care orice dispozitiv cu un browser și acces la Internet le poate vizualiza, dar cum poate fi găsită o anumită astfel de resursă? Răspunsul este unul destul de simplu - acest lucru este posibil grație **URL** (_Uniform Resource Locator_). Fiecare URL are următoarea structură:

```sh
[protocol]://[domeniu]/[cale/către/resursă?parametru1=valoare1&parametru2=valoare2]

exemplu:
https://wikipedia.org/wiki/World_Wide_Web
```

- **protocolul** - un set de reguli care permit comunicarea într-o rețea de calculatoare
  - atunci când vorbim despre Web, cel mai important protocol este _HTTP_ - **H**yper**T**ext **T**ransfer **P**rotocol sau _HTTPS_ - varianta securizată a HTTP

🤔 Am menționat în secțiunea anterioară că resursele pot fi și multimedia, nu doar text. Totuși, protocolul folosit are în denumire cuvântul "text". Acest lucru se datorează faptului că protocolul a fost creat atunci când singurele resurse partajate erau de tip text. Între timp, protocolul a evoluat pentru a accepta și alte tipuri de resurse, dar denumirea a rămas aceeași.

- **domeniul** - un identificator unic pentru fiecare website (gazdă) - _de exemplu, google.com_

  - există și conceptul de subdomeniu - diviziune a unui domeniu care poate fi folosită pentru a separa diferite secțiuni ale unui site web sau pentru a oferi acces la resurse sau servicii specifice pe o adresă web distinctă
  - spre exemplu, suita de servicii Google e accesibilă pe diferite subdomenii, precum

  ```sh
    mail.google.com
    drive.google.com
    careers.google.com
  ```

- **calea către resursă** - (opțională) permite identificarea unei anumite resurse a unui website

- un URL poate conține și **parametri** prin care sunt transmise informații suplimentare pentru cererea făcută, sub formatul _cheie=valoare_, separați prin simbolul _&_
  - de obicei, putem regăsi parametri în URL atunci când facem o căutare pe un magazin online
  ```sh
    https://www.aboutyou.ro/b/shop/nike-sportswear-53709?category=20204
  ```

### 1.2 Ce se întâmplă atunci când căutăm ceva pe Google?

Pentru a înțelege mai bine cum e aplicată arhitectura _client-server_ în cadrul Web-ului, vom lua drept exemplu o căutare simplă pe Google.
În esență, fiecare acțiune întreprinsă de un utilizator pe Web are următorii pași:

- utilizatorul (**clientul**) trimite o **cerere** (un request) către un **server** - să spunem, în cazul nostru, că navigăm pe pagina _google.com_ și introducem textul "florării București"
- serverul primește cererea, stabilește acțiunea necesară conform scopului (_metoda/verbul_) request-ului - în exemplul nostru vrem să listăm toate florăriile din București, deci serverul Google caută în baza sa de date înregistrări pentru florăriile din București
- serverul trimite un **răspuns** către client, fie el de succes ori de eroare, după caz, în funcție de rezultatul procesării
- clientul primește răspunsul, în acest caz florăriile din București 🌸

**Arhitectura client-server** poate fi observată și în următoarea figură, similară cu cea pe care am văzut-o și în cadrul primului seminar:
![](https://www.easeus.com/images/en/wiki-news/what-is-client-server-network.png)

### 1.3 Ce acțiuni poate să facă un utilizator pe Web?

În cadrul exemplului referitor la căutarea pe Google am menționat de _metode și verbe_. _Metodele_ specifice requesturilor determină acțiunile pe care trebuie să le efectueze serverul asupra resurselor cerute de client. Astfel, un client poate să:

- creeze o resursă (**POST**)
- listeze o resursă (**GET**)
- actualizeze o resursă (**PUT**)
- șteargă o resursă (**DELETE**)

Denumirile specificate în paranteză reprezintă **metodele** ce pot fi atașate unei cereri. Pentru fiecare metodă există un **verb corespunzător**, ce descrie acțiunea în sine. Astfel, există următoarele asocieri: POST - **C**reate, GET - **R**ead, PUT - **U**pdate, DELETE - **D**elete

💡 Primele litere din fiecare verb formează termenul CRUD, ce rezumă instrucțiunile care pot fi efectuate asupra unei resurse la un moment dat - ne vom întâlni cu acest concept în cadrul următoarelor seminare, când vom realiza propriul nostru server web.

În funcție de rezultatul pe care îl are procesarea cererii clientului, există mai multe posibile coduri status de răspuns pe care severul le poate întoarce clientului pentru a-l informa de starea cererii sale. Există **5** categorii principale de statusuri:

- **1**XX - răspunsuri informaționale
- **2**XX - răspunsuri de succes
- **3**XX - răspunsuri ce privesc mutarea resurselor (redirecționarea)
- **4**XX - erori de client
- **5**XX - erori de server

🤔 Pentru exemple de coduri de răspuns și reprezentarea lor vizuală sugestivă, puteți accesa [acest link](https://http.cat/)

### 1.4 Care sunt componentele unei pagini web?

De multe ori un client va cere o anumită pagină web. Pagina web primită drept răspuns de la server este compusă din următoarele componente:

- o componentă _structurală_ - **HTML** - definește elementele care sunt afișate în pagină
- o componentă _de stil_ - **CSS** - conferă un aspect plăcut elementelor structurale pentru accesibilitate
- o componentă _dinamică_ - **JavaScript** - permite utilizatorului să interacționeze cu elementele afișate

#### 1.4.1 HTML

- HTML (**H**yper**T**ext **M**arkup **L**anguage) = **limbaj de marcare** (nu este un limbaj de programare, nu pot fi realizate prelucrări logice) folosit pentru a crea și structura pagini web prin intermediul elementelor specifice, numite _tag-uri_
- exemplu de structură a unei pagini web simple:

```html
  <html>
    <head>
      <title>Webtech 2024</title>
    </head>
    <body>
      <p>Hello, Web!</p>
    </body>
  </html>
```

- e important de notat faptul că, în esență, fiecare pagină web este o _structură arborescentă_ în care nodul părinte este întotdeauna tag-ul **"html"**

🤔 _Devtools_ este o unealtă foarte utilă pentru dezvoltarea web. Puteți accesa orice website la alegere și inspecta structura lui. Găsiți [aici](https://nira.com/chrome-developer-tools/) o resursă care explică mai multe despre fiecare opțiune din cadrul devtools!

- în practică, paginile web care utilizează doar HTML sunt, de obicei, ori cele foarte vechi, care au rămas neschimbate de la creare, ori cele ale entuziaștilor

🤔 Puteți accesa încă prima pagină web [aici](https://info.cern.ch/hypertext/WWW/TheProject.html) - aceasta are doar HTML și este pagina proiectului WWW

- website-urile moderne au însă alte standarde în ceea ce privește design-ul și modalitățile în care sunt prezentate informațiile, fapt posibil prin introducerea CSS

#### 1.4.2 CSS

- CSS (**C**ascading **S**tyle **S**heets) = _limbaj de stilizare_ (din nou, nu de programare), utilizat pentru a controla aspectul elementelor HTML afișate în paginile web

CSS poate fi utilizat pentru (și nu numai):

- culori și fundaluri
- tipuri de fonturi
- spațiere
- poziționare și aliniere
- efecte vizuale și animații

🤔 Aveți [aici](https://htmlcheatsheet.com/css/) un cheatsheet pentru cele mai importante concepte CSS

Există mai multe modalități de a aplica stilul asupra elementelor HTML, și anume, în cadrul aceluiași fișier, ori prin importarea unui fișier separat în care sunt definite regulile de stil. A doua variantă este cea recomandată 😊.

- în cadrul aceluiași fișier:

  - în interiorul tag-ului **"style"** din "head"
    ```html
      <html>
        <head>
          <title>Webtech 2024</title>
          <style>
            p {
              color: red;
            }
          </style>
        </head>
        <body>
          <p>Hello, Web!</p>
        </body>
      </html>
    ```
  - folosind atributul "style" al tag-urilor (_inline_)
    ```html
      <p style="color:red;">Hello, Web!</p>
    ```

- prin intermediul unui fișier extern

```css
/* fișierul styles.css */
  p {
    color: red;
  }
```

```html
  <html>
    <head>
      <title>Webtech 2024</title>
      <link rel="stylesheet" href="styles.css" />
    </head>
    <body>
      <p>Hello, Web!</p>
    </body>
  </html>
```

Pentru a identifica elementul HTML căruia dorim să-i definim reguli de stil există mai multe tipuri de **selectori**:

- pe baza elementului HTML

```css
  p {
    color: red;
  }
```

- pe baza clasei elementului

```css
  .paragraph {
    color: red;
  }
```

```html
  <p class="paragraph">Hello web</p>
```

- pe baza id-ului elementului

```css
  #first-paragraph {
    color: red;
  }
```

```html
  <p id="first-paragraph">Hello web</p>
```

- exemplele pe care le avem ilustrate mai sus sunt din ce în ce mai specifice (mai exacte, vizează din ce în ce mai puține elemente)

Totuși, chiar și cu avantajul prezentării estetice a informației, utilizatorul nu poate interacționa cu conținutul paginilor web, motiv pentru care, în continuare, ne vom axa pe componenta dinamică, respectiv JavaScript 😊.

## 2. Bazele JavaScript

### 2.1 Ce este JavaScript?

**JavaScript** este un **limbaj de programare interpretat**, ceea ce înseamnă că nu trebuie să treacă printr-o etapă de compilare înainte de a fi lansat în execuție. Este interpretat _la execuție_ de un engine (fie _node_ - atunci când avem JavaScript pe server - ori runtime-ul prezent în browsere - când avem JavaScript pe client, spre exemplu _V8_ în cazul Google Chrome)

### 2.2 Există variabile în JavaScript?

**Desigur!** Și există câteva aspecte interesante referitor la acestea. JavaScript este un limbaj _weakly-typed_, ceea ce înseamnă că atunci când declarăm o variabilă _nu trebuie să specificăm tipul acesteia_ (cum era cazul în limbaje precum C/C++/Java/C#).

În Java, am declara o variabilă în acest fel:

```java
  public String name = "John Doe";
```

în timp ce în JavaScript această instrucțiune ar deveni:

```js
  let name = "John Doe";
```

JavaScript știe tipul de variabilă care trebuie atribuit pentru ceea ce vrem să declarăm, fără să fie nevoie să specificăm _explicit_.
Există **3** cuvinte cheie folosite pentru declararea variabilelor - **var, let, const**. _Var și let_ sunt folosite pentru valori pe care **le putem schimba**, în timp ce, dacă vrem să declarăm o valoare _constantă_, pe care **nu o putem schimba**, vom folosi _const_.
O altă diferență dintre let și var este vizibilă în ceea ce privește contextul în care acestea sunt accesibile (numim acest concept _scoping_). _Var_ este **function scoped**, adică este accesibil în cadrul funcțiilor, iar _let_ este **block scoped**, adică este vizibil în cadrul blocurilor de cod. Ce înseamnă mai exact acest lucru? Să luăm următorul exemplu!

```js
  function iterateTest() {
    for (let i = 0; i < 5; i++) {
      // i e vizibil aici
    }
    // i nu e vizibil aici
  }
```

Dacă am fi declarat variabila i folosind _var_, aceasta ar fi fost vizibilă în ambele locuri și am fi observat și un aspect interesant la afișarea acesteia în afara blocului iterativ.
🤔 Executați exemplul în ambele cazuri și încercați să vă gândiți, inainte de a executa, ce va afișa consola în cazul în care folosim var, în afara blocului iterativ.

Un comportament specific JavaScript este **hoistingul**. Acesta se referă la comportamentul JavaScript de a muta toate declarările de variabile la _începutul contextului curent_. Variabilele sunt hoistate diferit în funcție de cuvântul cheie folosit. În cazul lui _var_, variabilele sunt **declarate ȘI inițializate** cu valoarea _undefined_, în timp ce _let_ și _const_ sunt **DOAR declarate**.

```js
  console.log(a); // afișează 'undefined', conform inițializării implicite
  var a; // declarare
```

```js
  console.log(a); // aruncă o excepție de tip ReferenceError deoarece nu este inițializată
  let a; // declarare
```

🤔 Comportamentul diferit pe care îl are var în ceea ce privește hoistingul este motivul principal pentru care utilizarea acestui cuvânt cheie este descurajată în prezent. Un dezvoltator nu ar trebui să poată utiliza variabile înainte ca acestea să fie declarate, deoarece acest lucru poate duce la erori ori comportamente neașteptate ale codului scris.

### 2.3 Tipuri de date în JavaScript

Precum în orice alt limbaj de programare, și în JavaScript există mai multe tipuri de date:

- **primitive** - ex. Number, String, Boolean, Undefined, Symbol, BigInt
- **reference types** - ex. Array, Object, Function

🤔 Există două valori speciale în JavaScript pe care o variabilă cu o valoare "nulă" le poate lua. Puteți citi [acest articol](https://www.geeksforgeeks.org/undefined-vs-null-in-javascript/) despre comparația dintre _undefined_ și _null_. De asemenea, o altă particularitate JavaScript sunt valorile _truthy/falsy_ - mai multe despre [aici.](https://www.30secondsofcode.org/articles/s/javascript-truthy-falsy-values)

### 2.4 Obiecte

Pe lângă tipurile de date primitive pe care le-am discutat deja, există și **reference types**. Printre acestea se numără și obiectele. **Obiectele** sunt entități care pot avea **proprietăți** și **acțiuni**.
Un exemplu de obiect poate fi:

```js
  const myCar = {
    color: "red",
    year: 2020,
    brand: "Toyota",
  };
```

Fiecare proprietate a obiectului este definită printr-o **cheie** (ex. color) și o **valoare** corespunzătoare (ex. 'red').
Proprietățile obiectelor pot fi accesate astfel:

```js
  myCar.color; // returnează 'red'
  myCar["color"]; // returnează 'red'
```

Un aspect de notat este faptul că _aproape_ orice în JavaScript este un obiect. Acest lucru introduce o problematică mai complexă, legată de partea OOP din JavaScript. Moștenirea în JavaScript este posibilă în _2 feluri_ - folosind **clase** și extinzându-le și utilizând ceea ce poartă denumirea de **moștenire prin prototip** (_prototypal inheritance_) - o metodă prin care un obiect poate moșteni proprietăție și metodele unui alt obiect și adăuga noi proprietăți/metode, fără a depinde de obiectul de bază. Cea de-a doua modalitate, cea prototipală, se bazează pe conceptul de _agregare_. În acest sens, clasele în JavaScript sunt considerate a fi _syntactic sugar_, deoarece mecanismul aplicat este, de fapt, același ca la moștenirea prototipală, însă este prezentat mai familiar pentru programatorii obișnuiți cu limbaje OOP.

🤔 [Aici](https://javascript.plainenglish.io/inheritance-is-a-vs-composition-has-a-in-javascript-98fb96dfa0e6) găsiți mai multe informații despre moștenirea din JavaScript (inheritance vs composition)

### 2.5 Funcții

**Funcțiile** sunt (de asemenea) obiecte care inglobează blocuri _reutilizabile_ de cod, destinate pentru _a efectua o anumită acțiune_.
În mod tradițional, o funcție este scrisă astfel:

```js
  function sayHello() {
    console.log("Hello!");
  }
  // apelul funcției
  sayHello(); // afișează "Hello!"
```

O funcție poate avea mai multe argumente al căror număr poate să fie _cunoscut_ sau _necunoscut_ (**variable length arguments**). Astfel, avem următoarele situații:

```js
  // funcția acceptă un singur argument
  function sayName(name) {
    console.log(name);
  }

  function sayDescription(name, age, ...extraInfo){
    console.log(name);
    console.log(age);
    console.log(extraInfo); // afișează restul argumentelor trimise
  }

  sayDescription("John Doe", 24, "blond", "2 cats");
```

🤔 Argumentul extraInfo este precedat de _spread operator_. Puteți citi mai multe despre acesta [aici.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

**ES6** (a doua revizie majoră a JavaScript) a introdus **arrow functions**, care permite scrierea funcțiilor conform unei sintaxe mai simpliste:

```js
  const sayHello = () => console.log("Hello!");
```

Totuși, funcțiile tradiționale și arrow functions nu se comportă _în totalitate_ la fel. Cea mai importantă diferență rezidă în ceea ce reprezintă cuvântul cheie _"this"_. În cazul arrow functions, "this" se referă _doar_ la contextul curent al funcției respective. De ce e important de reținut această diferență? Dacă funcția pe care o scriem ar fi metoda unei clase, arrow function-ul nu ar ști nimic despre "this"-ul acelei clase.

### 2.6 Arrays

Un **array** este o structură de date care poate stoca **mai multe valori** la un moment dat.

Acesta poate fi reprezentat astfel:

```js
  const arr = [1, 2, 3, 4];
```

Fiecare element poate fi accesat utilizând **index-ul**, care începe de la valoarea **0**. (de ex. arr[0] este 1)

Există anumire proprietăți și metode care sunt utile în lucrul cu array-urile:

- **length** - proprietate pentru a afla lungimea array-ului (numărul de elemente)
- **push()** - metodă pentru inserarea unui element _la finalul_ array-ului
- **pop()** - metodă pentru _ștergerea și returnarea_ ultimului element din array

Deseori în utilizarea array-urilor avem nevoie să iterăm elementele componente, și, după caz, să efectuăm anumite prelucrări asupra acestora. În continuare putem menționa câteva metode folositoare pentru arrays, pe care le puteți regăsi utilizate și în codul sursă al seminarului:

- **for**
- **forEach()**
- **for...of**
- **for...in**

(aceste metode sunt folosite doar pentru a itera elementele unui array)

- **map()** - iterează și aplică o transformare pentru fiecare element
- **filter()** - iterează și returnează elementele care respectă o anumită condiție
- **reduce()** - folosind un acumulator, iterează și sumarizează conținutul