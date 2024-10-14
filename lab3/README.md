# Seminar 3 - Array practice

### Conținut
1. [Arrays](#1-arrays)

    1.1 [Caracteristici generale](#11-caracteristici-generale)

    1.2 [Accesarea datelor](#12-accesarea-datelor)

    1.3 [Proprietatea length](#13-proprietatea-length)

    1.4 [Manipularea datelor](#14-manipularea-datelor)

    1.5 [Operatorul rest și operatorul spread](#15-operatorul-rest-%C8%99i-operatorul-spread)

    1.6 [Copierea array-urilor](#16-copierea-array-urilor)

    1.7 [Metode specifice](#17-metode-specifice)

2. [Exerciții arrays](#2-exerci%C8%9Bii-arrays)

## 1. Arrays

### 1.1 Caracteristici generale

Un **array** este o structură de date care poate stoca **mai multe valori** la un moment dat.

Acesta poate fi reprezentat astfel:

```js
    const arr = [1, 2, 3, 4];
```

De notat următoarele aspecte:
- lungimea unui array este modificabilă
    - spre deosebire de alte limbaje, nu trebuie menționată lungimea array-ului la inițializare și aceasta se poate modifica
- array-urile pot conține **tipuri mixte de date**, ceea ce înseamnă că un array poate arăta și astfel:
```js
    const arr = [1, 2, 'green', {name: 'stud', id: 1}];
```
- ca tip de dată, **un array este un obiect** (țineți minte, aproape orice în JavaScript este un obiect)

### 1.2 Accesarea datelor
- fiecare element poate fi accesat utilizând **index-ul**, care începe de la valoarea **0**
```js
    const arr = [1, "web", {day: "Thursday"}];

    // accesare directă
    console.log(arr[0]);
    console.log(arr[1]);

    // accesarea se poate face prin utilizarea unei alte variabile
    const idx = 2;
    console.log(arr[idx]);

    // de asemenea, un array poate fi destructurat în elementele componente
    const [first, second, third] = arr;
    console.log(first);
    console.log(second);
    console.log(third);
```

### 1.3 Proprietatea length

- proprietatea **length** returnează numărul de elemente dintr-un array (lungimea acestuia)
```js
    const fruits = [];
    fruits.push("banana", "apple", "peach");
    console.log(fruits.length); // 3

    // ce credeți că se va întâmpla dacă modificăm explicit dimensiunea unui array?
    fruits.length = 10;
    console.log(fruits);
    console.log(fruits.length);
```

### 1.4 Manipularea datelor

Există mai multe metode pe care le putem folosi pentru a manipula un array, și anume:

- pentru a adăuga elemente într-un array putem folosi metoda **push**
```js
    const arr = [1, 2, 3, 4];

    arr.push(5);
    console.log(arr);
```

- pentru a elimina (și returna) ultimul element dintr-un array putem folosi metoda **pop** (astfel, array-ul se comportă ca o stivă)
    - putem extrage primul element din array cu metoda **shift**
```js
    const arr = [1, 2, 3, 4];

    const lastElem = arr.pop();
    console.log(lastElem);
    console.log(arr);
```

- pentru ștergerea unui anumit element din array putem folosi metoda **splice**
    - metoda splice poate fi folosită și pentru a modifica ori adăuga elemente în array
    ```js
        const arr = [1, 2, 3, 4];

        // ștergerea unui element de la poziția 0
        const removedElement = arr.splice(0, 1);
        console.log(removedElement);
        console.log(arr);
    ```

    - JavaScript permite și utilizarea keyword-ului _delete_ pentru a șterge valorile din cadrul unui array, însă, spre deosebire de splice, acesta nu va șterge și poziția ocupată din array, lăsând un element gol
    ```js
        const arr = [1, "web", {day: "Tuesday"}];

        delete arr[2];

        console.log(arr);
    ```

- pentru concatenarea a două array-uri putem folosi metoda **concat**
```js
    const arr = [1, "web", {day: "Tuesday"}];
    const arr2 = [2, 3, 4];

    // concatenarea nu se va face in-place
    // ci va rezulta un array ce va conține ambele array-uri
    const combined = arr.concat(arr2);

    console.log(combined);
```

- pentru extragerea unui subșir din cadrul unui array se poate folosi metoda **slice** (a nu se confunda cu _splice_)
```js
    const arr = [1, 2, 3, 4];

    console.log(arr.slice(0, 2));
```

### 1.5 Operatorul rest și operatorul spread

- Array-urile beneficiază de existența a doi operatori foarte puternici care, în ciuda faptului că utilizează aceeași notație (...), au efecte complet opuse

- Operatorul rest permite trimiterea unui număr variabil de parametri într-o funcție, încapsulând mai multe variabile individuale într-un array (l-am văzut și în seminarul trecut în cazul funcțiilor cu argumente de lungime variabilă)
```js
    // operatorul rest poate fi folosit doar ca ultim parametru în definirea unei funcții
    function checkRestOp(...params) {
        params.forEach(param => console.log(param));
    }

    checkRestOp(1, 2, 3, 4, 5);
```
- Operatorul spread permite expandarea unui array în elementele componente

```js
    function functionWith3Params(x, y, z) {
        console.log(x);
        console.log(y);
        console.log(z);
    }

    const arr = [1, 2, 3];
    functionWith3Params(...arr);
```
### 1.6 Copierea array-urilor

În majoritatea cazurilor în care încrecăm să facem o copie a unui array, aceasta este de fapt un **shallow copy**. Acest aspect este strâns legat cu faptul că array-urile sunt _reference types_, care, spre deosebire de primitive, sunt copiate prin referință. Ce înseamnă asta în practică?

Să luăm drept exemplu următorul array:
```js
    const arr = ['red', 'purple', 'pink'];
```
Să presupunem că vrem să facem o copie a acestui array astfel:
```js
    const arrCp = arr;
```
Această modalitate de a copia este eronată, deoarece în acest caz se va copia doar referința la array-ul respectiv, nu și valoarea în sine.

Putem utiliza spread operator (pe care l-am întâlnit și în seminarul trecut) pentru a crea un nou array:
```js
    const arrShallowCp = [...arr];
```

În acest caz, _arrShallowCp_ va pointa către o zonă diferită de memorie, însă copia obținută este tot una shallow. Unde apar problemele?

Să presupunem că am avea următorul array:
```js
    const myArr = [1, 2, 4, {name: 'Ioana', id: 1}];
    const myArrShallowCp = [...myArr];
    
    // modificăm obiectul din array-ul copiat
    myArrShallowCp[3].name = 'Andrei';

    console.log(myArrShallowCp);
    console.log(myArr);
    // cele două log-uri printează același rezultat
    // [1, 2, 4, {name: 'Andrei', id: 1}]
```

De ce am obținut acest rezultat? _Shallow copy_.
Țineți minte că am discutat la seminarul anterior despre tipuri primitive și reference types. Obiectele sunt reference types, ceea ce înseamnă că, în momentul în care am făcut shallow copy pe array-ul nostru, am copiat pentru obiect doar _referința_ acestuia, în memorie actualizând de fapt același obiect.

**Cum putem realiza totuși deep clone?**

Putem realiza deep clone pentru arrays folosind metodele **JSON.stringify()** și **JSON.parse()**
- metoda JSON.stringify() ia un obiect JavaScript (array-urile sunt și ele tot obiecte) și îl transformă într-un string JSON (_JavaScript Object Notation_ - un mod de reprezentare a datelor)
- în acest fel sunt înlăturate orice referințe
- se folosește apoi JSON.parse() pentru a transforma la loc din string JSON în obiect JavaScript
```js
    const myArr = [1, 2, 4, {name: 'Ioana', id: 1}];
    const myArrDeepCp = JSON.parse(JSON.stringify(myArr));
    
    // modificăm obiectul din array-ul copiat
    myArrDeepCp[3].name = 'Andrei';

    console.log(myArrDeepCp);
    console.log(myArr);
    // cele două log-uri printează rezultate diferite
    // [1, 2, 4, {name: 'Andrei', id: 1}]
    // [1, 2, 4, {name: 'Ioana', id: 1}]
```

### 1.7 Metode specifice

Vom în continuare despre **metodele specifice array-urilor**, care permit manipularea informațiilor stocate. Multe dintre aceste metode au o funcție **callback** drept argument. 

🤔 Un _callback_ este o funcție transmisă unei alte funcții sau obiect, pentru a fi apelată mai târziu, la un moment sau eveniment specific

Callback-ul este apelat secvențial și cel mult o dată pentru fiecare element al array-ului (în unele cazuri, spre exemplu atunci când se caută un anumit element, căutarea se oprește când elementul este găsit, deci callback-ul nu mai este apelat pentru restul elementelor). Acesta determină, prin valorile calculate intermediar (pentru fiecare element în parte), valoarea returnată pentru întregul array la finalul procesării.

Astfel, pentru majoritatea funcțiilor pe care le vom discuta, semnătura ar putea fi:
```js
    method(callbackFunction)
```

_callbackFunction_ are la rândul său 3 argumente principale:

- **elementul** -> elementul curent care este procesat în array
- **indexul** -> indexul corespunzător elementului curent
- **array-ul** -> array-ul asupra căruia se execută metoda

În general, vom folosi doar primele două argumente disponibile.

Să ne uităm acum la câteva exemple cu cele mai folosite metode specifice arrays (unele dintre ele se regăsesc și în exercițiile atașate)

- **map**
    - returnează un array nou care conține rezultatele invocării unei funcții pe fiecare element
    ```js
        const arr = [1, 2, 3, 4];
        // nu uitați, map creează un array nou!
        const dblArr = arr.map((elem) => elem * 2);

        console.log(dblArr); // [2, 4, 6, 8]
    ```
- **filter**
    - returnează un array nou cu elementele care satisfac o anumită condiție dată
    - funcția pasată drept callback trebuie să returneze **true** pentru ca elementul să fie inclus în noul array
    ```js
        const arr = [1, 2, 3, 4];
        const filteredArr = arr.filter(item => item > 2);

        console.log(filteredArr); // [3, 4]
    ```
- **find**
    - returnează valoarea primului element care satisface o anumită condiție dată
    - returnează **undefined** dacă nu se găsește vreun element care să satisfacă condiția
    ```js
        const arrStudents = [{name:'Andreea', id:1}, {name:'Mihai', id:2}, {name:'Cristina', id:3}];

        const student = arrStudents.find(stud => stud.id === 3);
        console.log(student); // {name:'Cristina', id:3}
        
        const studNotFound = arrStudents.find(stud => stud.id === 4);
        console.log(studNotFound); // undefined
    ```
- **findIndex**
    - returnează **indexul** primului element care satisface o anumită condiție dată
    - returnează **-1** dacă nu se găsește vreun element care să satisfacă condiția
    ```js
        const arrStudents = [{name:'Andreea', id:1}, {name:'Mihai', id:2}, {name:'Cristina', id:3}];

        const studentIdx = arrStudents.findIndex(stud => stud.id === 3);
        console.log(studentIdx); // 2

        const studNotFoundIdx = arrStudents.findIndex(stud => stud.id === 4);
        console.log(studNotFoundIdx); // -1
    ```
- **includes**
    - determină dacă o valoare e prezentă în array, returnând **true** sau **false**, în funcție de caz
    ```js
        const fruits = ["apple", "banana", "orange", "cherry", "kiwi"];

        const hasApple = fruits.includes("apple");
        const hasGrape = fruits.includes("grape");

        console.log(hasApple); // true
        console.log(contineStrugure); // false
    ```
- **reduce**
    - permite reducerea unui array la o valoare unică, aplicând o funcție de reducere asupra fiecărui element al array-ului și acumulând rezultatele într-o valoare finală
    ```js
        const nums = [1, 2, 3, 4, 5];
        const sum = nums.reduce((accumulator, element) => accumulator + element, 0);

        console.log(sum); // 15
    ```

- **sort**
    - sortează elementele unui array
    - sortarea se face pe același array
    - implicit, se realizează sortarea _lexicografic_
        - pentru stringuri, în ordine alfabeitcă
        - pentru numere, în ordine crescătoare
    - se poate trimite drept parametru un callback conform căruia să se realizeze sortarea
    ```js
        const arr = [1, 4, 2, 7, 3];
        arr.sort();

        console.log(arr); // [1, 2, 3, 4, 7]
    ```
    - pentru a obține ordinea descrescătoare putem trimite un callback drept parametru:
    ```js
        const arr = [4, 1, 5, 2, 8];
        arr.sort((a, b) => b - a); // [8, 5, 4, 2, 1]
    ```

- **join**
    - creează și returnează un nou string, concatenând toate elementele array-ului, utilizând virgula ori alt separator trimis ca parametru
    ```js
        const elements = ['Fire', 'Air', 'Water'];

        console.log(elements.join()); // "Fire,Air,Water"
    ```

- **flat**
    - permite "aplanarea" un array multidimensional, transformându-l într-un array ce are cu o dimensiune mai puțin
    - se poate aplica succesiv de mai multe ori pentru a obține, în final, un array unidimensional
    ```js
        const array = [1, 2, [3, 4, [5, 6]]];

        const flatArray = array.flat(); // [1, 2, 3, 4, [5, 6]]
    ```

- **reverse**
    - inversează ordinea elementelor unui array
    - modificările sunt făcute asupra array-ului original, nefiind returnat unul nou
    ```js
        const array = [1, 2, 3, 4, 5];

        array.reverse();

        console.log(array); // [5, 4, 3, 2, 1]
    ```

🤔 Acestea sunt, în mod evident, doar o parte dintre metodele disponibile pentru arrays. Puteți citi mai multe despre restul în [documentația MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).
## 2. Exerciții arrays

Pentru a reface acasă exercițiile discutate la seminar puteți urma acești pași:
- verificați fișierul _demo.js_ (găsiți acolo un exemplu pentru fiecare subiect)
- rezolvați exercițiul propus din fișierul _practice.js_
- comparați soluția voastră cu cea propusă în fișierul _solved-practice.js_