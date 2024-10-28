# Seminar 5 - Programare asincronă în JavaScript

### Conținut

1. [Programare sincronă vs programare asincronă](#1-programare-sincron%C4%83-vs-programare-asincron%C4%83)

    1.1 [Programare sincronă în JavaScript](#11-programare-sincron%C4%83-%C3%AEn-javascript)

    1.2 [Programare asincronă în JavaScript](#12-programare-asincron%C4%83-%C3%AEn-javascript)

2. [Callback](#2-callback)

    2.1 [Callback hell](#21-callback-hell)


3. [Promise](#3-promise)

    3.1 [Definirea unui promise](#31-definirea-unui-promise)

    3.2 [Stările unui promise](#32-st%C4%83rile-unui-promise)

    3.3 [Promise chain](#33-promise-chain)

    3.4 [Gestionarea erorilor într-un promise](#34-gestionarea-erorilor-%C3%AEntr-un-promise)

    3.5 [Metode speciale](#35-metode-speciale)

4. [Async/await](#4-asyncawait)

## 1. Programare sincronă vs programare asincronă

- Programarea sincronă și programarea asincronă sunt două paradigme diferite de gestionare a fluxului de execuție

### 1.1 Programare sincronă în JavaScript

- În cadrul programării sincrone, operațiunile sunt executate _una după alta, pe rând, în ordine_
- Acest tip de arhitectură este considerată _blocantă_, deoarece există **un singur thread**; în timp ce o operațiune este executată, instrucțiunile celorlalte operațiuni sunt blocate
- JavaScript este un limbaj _single-threaded_, _sincron_ în mod implicit
- În acest sens, putem privi următorul exemplu:

```js
    function firstTask() {
        console.log("Task 1");
    }

    function secondTask() {
        console.log("Task 2");
    }

    function thirdTask() {
        console.log("Task 3");  
    }

    firstTask();
    secondTask();
    thirdTask();
```

- Funcțiile definite vor fi executate în ordinea în care au fost apelate, iar drept urmare consola va afișa:
```
    Task 1
    Task 2
    Task 3
```
- Interpretorul execută instrucțiunile în ordinea în care ele apar scrise, secvențial, linie cu linie, așteptând ca instrucțiunea curentă să își termine execuția pentru a o apela pe următoarea
![](https://www.freecodecamp.org/news/content/images/size/w2400/2023/01/image-244.png)
- Comportamentul din imagine este gestionat de o structură de date internă ce poartă denumirea de _call stack_
- În momentul în care engine-ul JavaScript invocă o funcție, o adaugă la începutul stivei; acest procedeu e repetat pentru fiecare funcție din cadrul programului. Apoi pe rând, funcțiile sunt extrase odată ce execuția lor a fost finalizată
![sync programming](https://miro.medium.com/v2/resize:fit:1400/1*rJ2sh-q1deQGGGVG5gYyIQ.png)

- Totuși, programarea sincronă este problematică în ceea ce privește operațiile consumatoare de timp și resurse
- Pentru a ilustra acest aspect, să privim următorul exemplu:
```js
    function performHeavyOperation() {
        let x = 0;
        for (let i = 0; i < 1000000000; i++) {
            x += i;
        }
    }

    performHeavyOperation();

    console.log('Heavy operation completed');
```
- La execuția codului se poate observa că mesajul _"Heavy operation completed"_ este afișat la consolă după câteva momente (timp în care funcția _performHeavyOperation_ a rulat)
- Acest dezavantaj este cu atât mai relevant în contextul JavaScript, care a fost creat pentru a integra elemente dinamice în paginile web

    - Dacă rulăm exemplul anterior în browser, vom observa că, pe toată durata de execuție a metodei _performHeavyOperation_, pagina nu mai răspunde evenimentelor generate, deoarece JavaScript, un limbaj single-threaded la bază, va executa instrucțiunile în ordinea în care acestea au fost invocate

- Pentru un limbaj single-threaded precum JavaScript, blocarea thread-ului principal nu poate fi evitată în momentul în care o instrucțiune intensivă se află în execuție, însă, în general, în aplicațiile interactive, operațiunile intensive sunt evitate, fiind înlocuite, în schimb, cu operațiuni de intrare/ieșire (I/O) care, în regim sincron, produc același efect de blocare

- Din acest motiv, JavaScript oferă suport nativ pentru multiple tehnici de _programare asincronă_


### 1.2 Programare asincronă în JavaScript

- Programarea asincronă este o paradigmă în cadrul căreia codul este posibilă execuția codului **independent** de firul principal de execuție, fiind astfel _non-blocking_
- Programarea asincronă permite astfel **execuția mai multor task-uri în același timp**, ele nedepinzând de finalizarea acțiunii precedente
![async programming](https://www.freecodecamp.org/news/content/images/2023/01/image-336.png)

- În JavaScript, majoritatea operațiunilor asincrone au la bază **evenimente de intrare/ieșire**, atât pe back-end, cât și pe front-end:

    - apelarea unui serviciu extern
    - executarea unui query în baza de date
    - gestionarea evenimentelor declanșate de interacțiunea unui utilizator cu o pagină web
    - încărcarea sau descărcarea unui fișier

- În general, operațiunile asincrone în JavaScript se împart în:
    - **evenimente sau funcții Browser API/Web API**
        - evenimente declanșate de elemente DOM (onclick, mouseover)
        - funcții precum _setTimeout_
    - **promise** (despre care vom discuta pe larg în secțiunile următoare)


- Programarea asincronă utilizează evenimentele ca principal mecanism de notificare, permițând unor instrucțiuni să fie executate abia în momentul în care o operațiune de lungă durată a fost finalizată, fără ca thread-ul principal să fi așteptat în mod activ finalizarea acestei

    ![Gestionarea pasivă a evenimentelor](https://accedia.com/wp-content/uploads/old/async-programming.png)

- Următorul exemplu ilustrează modul în care se comportă instrucțiunile asincrone în JavaScript:
```js
    console.log("Start of script");

    setTimeout(function() {
        console.log("First timeout completed");
    }, 2000);

    console.log("End of script");
```
- Acest fragment de cod va afișa la consolă
```
    Start of script
    End of script
    First timeout completed
```
- Metoda _setTimeout_ execută funcția după un anumit timp (simulând astfel o operațiune ce consumă resurse și timp - cum ar fi apelarea unui serviciu web ori descărcarea unei imagini) în mod _asincron_, ceea ce înseamnă că programul va continua execuția următoarei linii de cod fără a aștepta ca durata specificată să se încheie, neblocând execuția celorlalte instrucțiuni

- Pentru a sumariza vizual diferențele dintre programarea sincronă și cea asincronă putem observa:
![sync vs async](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Y8o7ak12D24-kdMnDVKFYg.png)

🤔 Comportamentul asincron în JavaScript este posibil grație existenței _event loop_, care se folosește de structura _call stack_ menționată anterior. Un clip despre [aici](https://www.youtube.com/watch?v=8aGhZQkoFbQ) și un articol despre [aici.](https://medium.com/@Rahulx1/understanding-event-loop-call-stack-event-job-queue-in-javascript-63dcd2c71ecd)

- Pentru a putea discuta despre ce reprezintă un promise, va trebui mai întâi să reluăm un concept întâlnit în [seminarul 3](https://github.com/ioanaandreeab/webtech_labs_2024/tree/main/lab3#17-metode-specifice), și anume _callbacks_.


## 2. Callback

💡 Un **callback** este o funcție trimisă unei alte funcții pentru a fi executată la un moment dat în interiorul acelei funcții

- Am întâlnit deja acest concept în contextul metodelor specifice pentru array-uri
    - în următorul exemplu, metoda _filter_ primește drept argument un callback
    ```js
        const students = [{name: 'John', age: 19}, {name: 'Maria', age: 17}, {name: 'Joe', age: 23}];

        const filteredStudents = students.filter((student) => student.age > 18);

        console.log(filteredStudents); // prints info about John and Joe
    ```

- în contextul programării asincrone, callback-urile pot fi folosite astfel:
```js
    function fetchData(callback) {
        setTimeout(() => {
            const data = {name: "John", age: 30};
            callback(data);
        }, 3000);
    }

    fetchData(function(data) {
        console.log(data);
    });

    console.log("Data is being fetched...");
```

- Rezultatul afișat va fi
```
    Data is being fetched...
    {name: "John", age: 30}
```

## 2.1 Callback hell

- _Problema_ utilizării callback-urilor vine în situațiile în care execuția unor operațiuni asincrone **depinde** de rezultatul unei operațiuni asincrone anterioare

```js
    function doStep1(init, callback) {
        const result = init + 1;
        callback(result);
    }

    function doStep2(init, callback) {
        const result = init + 2;
        callback(result);
    }

    function doStep3(init, callback) {
        const result = init + 3;
        callback(result);
    }

    function doOperation() {
        doStep1(0, (result1) => {
            doStep2(result1, (result2) => {
                doStep3(result2, (result3) => {
                    console.log(`result: ${result3}`);
                });
            });
        });
    }

    doOperation();
```
- Observăm în acest exemplu că este foarte greu de urmărit modul în care funcțiile callback se apelează una pe alta și felul în care informația este transmisă între funcții

- O astfel de situație poartă denumirea de _callback hell_ și este motivul pentru care au fost introduse promise-urile

## 3. Promise

= un obiect ce înglobează **starea** (succesul ori eșecul) unei **operațiuni asincrone** și valoarea sa **rezultată**

- Promise-urile reprezintă _noțiunea fundamentală_ a programării asincrone în JavaScript-ul modern
- Un promise este, în esență, un **proxy** pentru o valoare ce va fi cunoscută la un moment dat în viitor
- A fost introdus în _ES6_ pentru a rezolva problemele aduse de utilizarea callback-urilor și reprezintă o modalitate **mai clară și mai puternică** de a gestiona acțiunile asincrone

### 3.1 Definirea unui promise

- Putem crea un promise astfel:
```js
    const myFirstPromise = new Promise((resolve, reject) => {
        // cod ce se va executa
    });
```
- Constructorul obiectului promise ia drept argument o funcție (denumită _executor function_)
- Funcția executor are la rândul său două argumente, respectiv funcțiile callback **resolve** și **reject**
    - _resolve_ -> metodă utilizată atunci când operațiunea este completă
    - _reject_ -> metotă utilizată atunci când există o eroare (operațiunea nu e completă)
- Constructorul pentru promise returnează un obiect cu două proprietăți - **state** și **result**

### 3.2 Stările unui promise

Un promise poate trece prin următoarele stări:
- _pending_: starea inițială, operațiunea nu a fost terminată nici cu succes nici cu erori
    - acestei stări îi este corespunzător rezultatul _undefined_
- _fulfilled_: operațiunea a fost completată cu succes
    - în cazul acestei stări, proprietatea result este _value_ (valoarea returnată de promise)
- _rejected_: operațiunea a eșuat
    - result este în acest caz _error_

💡 Este de notat că un promise e considerat a fi soluționat (_settled_) atunci când starea sa este _fulfilled_ sau _rejected_.

- Pentru a consuma un promise este necesară atașarea callback-urilor folosind metodele _.then()_ și _.catch()_
    - _then_ este utilizată în cazul în care un promise este soluționat cu succes
    - _catch_ se ocupă cu gestionarea erorilor, atunci când un promise este respins

```js
    myFirstPromise
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });
```

- Promise-ului i se poate atașa și metoda _.finally()_, ce va fi apelată după ce un promise a fost settled, indiferent de succesul ori eșecul operațiunii
```js
    myFirstPromise
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        // cod executat indiferent de statusul promise-ului 
        // fulfilled sau rejected
    });
```

### 3.3 Promise chain

- Deoarece metodele menționate anterior (_then, catch, finally_) returnează promise-uri, ele pot fi înlănțuite
![promises graph](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/promises.png)
- Acest pattern se bazează pe conectarea mai multor promise-uri secvențial, replicând într-un mod mai clar, dependențele ce cauzau callback hell
- În chaining, rezultatul unui promise este transmis către următorul promise din lanț
- Metoda _then()_ este cea care permite înlănțuirea promise-urilor
    - folosește un callback care returnează un promise _indiferent_ de valoarea explicită returnată
        - dacă valoarea returnată nu este un promise, engine-ul JavaScript creează implicit un promise care returnează respectiva valoare

```js
    // simularea preluării datelor de pe un server remote
    function fetchData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const data = Math.random();
                resolve(data);
            }, 1000);
        });
    }

    // Promise chain
    fetchData()
    .then((data) => {
        console.log("Step 1: Data fetched:", data);
        return data * 2; // procesarea datelor
    })
    .then((processedData) => {
        console.log("Step 2: Data processed:", processedData);
        return processedData + 3; // procesare suplimentară
    })
    .then((finalResult) => {
        console.log("Step 3: Final result:", finalResult);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
```

### 3.4 Gestionarea erorilor într-un promise

- Atunci când un promise este respins (_rejected_) se va declanșa apelul metodei _.catch()_

```js
    // simularea unei funcții care respinge un promise
    function simulateError() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("Something went wrong");
        }, 1000);
    });
    }

    // folosirea metodei catch
    simulateError()
    .then((result) => {
        console.log("This will not be executed");
    })
    .catch((error) => {
        console.error("Error:", error); 
    });
```

💡 În cazul promise-urilor care sunt înlănțuite, blocul de eroare captează erorile aruncate de oricare din metodele _.then()_ apelate anterior

### 3.5 Metode speciale

- clasa _Promise_ are atașată o serie de metode statice care extind posibilitățile în lucrul cu promise-uri

**Promise.resolve() și Promise.reject()**

- Promise.resolve() și Promise.reject() sunt două metode similare, care au rolul de a elimina utilizarea explicită a constructorului pentru a crea un promise
- În cazul _Promise.resolve()_ se returnează un promise care este rezolvat cu valoarea dată
```js
    const resolvedPromise = Promise.resolve("Successful value.");

    resolvedPromise.then((result) => {
        console.log(result);
    });
```
- Analog, pentru _Promise.reject()_ este creat un promise care este respins cu eroarea transmisă
```js
    const rejectedPromise = Promise.reject("Did not succeed.");

    rejectedPromise.catch((error) => {
        console.error("Error:", error);
    });
```

**Promise.all()**

- Acceptă un _array de promise-uri_ și returnează un nou promise
- Acest promise este rezolvat doar atunci când toate promise-urile din array-ul dat sunt rezolvate cu succes
- Dacă cel puțin un promise este respins (aduce o eroare), atunci promise-ul returnată de Promise.all va fi respins cu acea eroare
- Este o metodă utilă, spre exemplu, când se dorește agregarea unor date obținute din mai multe surse diferite

```js
    function fetchArticleTitle(url) {
        return fetch(url)
            .then((response) => response.json())
            .then((data) => data.title);
    }

    const urls = [
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/posts/2",
    "https://jsonplaceholder.typicode.com/posts/3"
    ];

    const requests = urls.map((url) => fetchArticleTitle(url));

    Promise.all(requests)
    .then((titles) => {
        console.log("Article Titles:", titles);
    })
    .catch((error) => {
        console.error("An error occurred:", error);
    });
```
- În exemplul dat se folosește funcția _fetch_, expusă de Browser API, prin care se poate apela un URL remote la care se află anumite resurse

**Promise.allSettled()**

- Similar cu Promise.all(), diferența în acest caz fiind că promise-ul returnat este îndeplinit atunci când toate promise-urile din array-ul de intrare sunt finalizate (fie cu succes ori eroare)
- Rezultatul este un array de obiecte, fiecare descriind rezultatul fiecărui promise apelat

```js
    const promise1 = Promise.resolve(3);
    const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
    const promises = [promise1, promise2];

    Promise.allSettled(promises).then((results) => results.forEach((result) => console.log(result.status)));

    // Output:
    // "fulfilled"
    // "rejected"
```

🤔 Puteți citi [aici](https://javascript.plainenglish.io/promise-in-javascript-with-all-the-methods-b7357196a57e) și despre celelalte două metode atașare care nu au fost discutate - race și any

## 4. Async/await

- ES8 (ES2017) a introdus o nouă modalitate de gestionare a operațiunilor asincrone, mai intuitivă, prin utilizarea cuvintelor cheie async/await
- Termenul **async** anunță faptul că funcția respectivă **returnează un promise**
    - Chiar dacă valoarea returnată nu este explicit un promise, mecanismul JavaScript va împacheta valoarea returnată într-un promise
```js
    async function fetchUserDetails() {
        // simulează un apel către un server remote
        // returnează info despre user
        return {'name': 'Michael', 'likes': ['movies', 'teaching']};
    }
```
- Cuvântul cheie **await** marchează așteptarea rezolvării unui promise pentru a putea continua execuția celorlalte instrucțiuni
    - await se poate folosi _doar_ în cadrul unui context asincron
```js
    async function displayUserDetails() {
        const user = await fetchUserDetails();
        console.log(user);
    }
```

**Gestionarea erorilor cu try/catch**

- În contextul în care un promise care este "așteptat" aruncă o eroare, blocul în care se realizează apelul poate fi înglobat într-un context try/catch pentru a prinde erorile ce pot apărea

```js
    async function displayUserDetails() {
        try {
            const user = await fetchUserDetails();
            // folosire data
        } catch (error) {
            // gestiune erori
        }
    }
```