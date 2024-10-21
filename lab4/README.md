# Seminar 4 - Closures, OOP și erori

### Conținut
1. [Closures](#1-closures)

    1.1 [Scope](#11-scope)
    
    1.2 [Contextul unui closure](#12-contextul-unui-closure)

2. [OOP](#2-oop)

    2.1 [Ce este o clasă în JavaScript?](#21-ce-este-o-clas%C4%83-%C3%AEn-javascript)

    1.2 [Constructor](#22-constructor)

    1.3 [Metode](#23-metode)

    1.4 [Proprietăți statice](#24-propriet%C4%83%C8%9Bi-statice) 

    1.5 [Constructor functions & prototipuri](#25-constructor-functions-%C8%99i-prototipuri)

3. [Erori (excepții)](#3-erori-excep%C8%9Bii)

## 1. Closures

**Ce este un closure?**

= concept fundamental care se referă la capacitatea unei funcții de a **păstra acces la variabilele din cadrul contextului** în care a fost creată, chiar și **după ce acea funcție a fost încheiată** sau a ieșit din contextul său imediat. De cele mai multe ori, un closure este implementat ca o funcție internă (o funcție definită în interiorul altei funcții) care păstrează legătura cu variabilele din funcția părinte.

- Conform MDN, un closure este **încapsularea** unei funcții cu referințele contextului său (lexical environment)

- În JavaScript, closure-urile sunt create de fiecare dată când o funcție este creată

- Pentru a înțelege mai bine conceptul de closure, trebuie să ne reamintim de un concept discutat anterior, acela de _scope_ (pe care îl putem traduce aproximativ ca domeniu)

![Scopes and closures](https://opensource.com/sites/default/files/uploads/execution-context.png)

### 1.1 Scope

- În JavaScript, există 2 tipuri mari de scopes:
    - **Global scope**
        - cuprinde tot domeniul unui program
        - variabilele declarate aici poartă numele de _variabile globale_
        - variabilele declarate aici pot fi accesate și modificate din orice zonă a programului, pe tot parcursul execuției acestuia

    - **Local scope**
        - variabilele declarate aici poartă numele de _variabile locale_
        - variabilele declarate aici au o durată de viață limitată, fiind dezalocate în momentul în care scope-ul declarării este distrus
        - se ramifică în alte două subtipuri:
            - **Function scope**
                - definit în momentul executării unei funcții
                - poate accesa variabilele globale și pe cele declarate la nivel de funcție
            
            - **Block scope**
                - definit în momentul executării unui bloc de instrucțiuni (if, while, for, etc)
                - poate accesa variabilele globale, variabilele declarate la nivelul funcției în care blocul este definit și variabilele declarate la nivelul blocului

- O analogie extrasă din [acest articol](https://blog.codeanalogies.com/2017/11/22/how-javascript-variable-scoping-is-just-like-multiple-levels-of-government/) compară cele 3 tipuri distincte de scopes cu legile care, adesea, sunt definite la mai multe niveluri
    ```js
    const humanRights1 = "All human beings are free and equal";
    const humanRights2 = "No discrimination";

    // drepturile omului sunt aplicabile și în Europa
    function europe(country) {
        const europeanLaw = "General Data Protection Regulation (GDPR)";

        // drepturile omului și legile europene sunt aplicabile și în România, împreună cu celelalte legi și reglementări locale
        if (country === "Romania") {
            const publicHoliday1 = "1 Decembrie";
        }
    }
    ```

### 1.2 Contextul unui closure
- Similar cu modul în care variabilele sunt accesibile în raport cu scope-ul în care au fost definite, un closure va putea accesa:
    - variabilele definite la nivelul propriei funcții
    - variabilele din funcția părinte
    - variabilele globale
    ```js
    const a = 1;
    
    function outerFunction(x) {
        return function middleFunction(y) {
            return function innerFunction(z) {
                // poate accesa a global 
                // x din outerFunction
                // y din middleFunction
                // z din propria definiție
                console.log(a + x + y + z); 
            }
        }
    }

    const x = outerFunction(1);
    const xx = x(1);

    // va afișa 4
    xx(1);
    ```

- Un closure va stoca valorile variabilelor din momentul în care este apelat, fiind un mecanism foarte puternic de **încapsulare a datelor**
    ```js
    function init() {
        let name = "Mozilla"; 

        function displayName() {
            // funcția care formează closure-ul
            console.log(name); // variabilă inițializată în context
        }
        
        displayName();
    }

    init();
    ```

- O utilizare comună pentru closure este simularea mecanismului de caching (pe care o regăsiți și în exemplele din acest seminar)

🤔 Puteți viziona [acest clip](https://www.youtube.com/watch?v=vKJpN5FAeF4) (are doar 100 de secunde) pentru mai multe explicații pentru closures.

## 2. OOP

### 2.1 Ce este o clasă în JavaScript?

O clasă în JavaScript (precum în orice alt limbaj de programare), este **un șablon pentru construirea obiectelor**. Acestea încapsulează proprietăți și comportamente specifice entităților descrise.

Clasele (și programarea orientată obiect în sine) au o implementare specială în JavaScript, ele folosind moștenirea prototipală.

🤔 Nu vom discuta în detaliu despre moștenirea prototipală și prototype chain, însă puteți citi mai multe despre - [aici](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain).

În esență, o clasă în JavaScript este **un tip special de funcție**. Deoarece JavaScript nu este un limbaj _strict_ OOP, ci multiparadigmă, clasele din JavaScript sunt considerate a fi _syntactic sugar_. Ce înseamnă asta? Clasele sunt o reprezentare menită pentru a asigura familiaritate programatorilor care sunt obișnuiți cu limbaje orientate obiect, precum Java.
- clasele au fost introduse în EcmaScript2015 (ne-am mai întâlnit cu ES6 când am discutat despre arrow functions, care au fost introduse cu aceeași ocazie)

Clasele pot fi definite astfel (class declaration vs class expression):

```js
    // class declaration
    class Animal {
        constructor(name, species) {
            this.name = name;
            this.species = species;
        }
    }

    // class expression - clasa este anonimă dar atribuită unei variabile
    const Animal = class {
        constructor(name, species) {
            this.name = name;
            this.species = species;
        }
    }

    // class expression - clasa are propriul său nume
    const MyAnimalClass = class Animal {
        constructor(name, species) {
            this.name = name;
            this.species = species;
        }
    }
```

### 2.2 Constructor

Constructorul este o metodă specială pentru crearea și inițializarea unui obiect
- poate exista o singură metodă cu numele _constructor_ într-o clasă (o excepție de tip _SyntaxError_ e aruncată dacă există mai multe astfel de metode)
- constructorul poate folosi cuvântul cheie _super_ pentru a apela constructorul unei clase părinte
- în următorul exemplu, pentru a marca moștenirea unei clase părinte se folosește termenul **extends**
```js
    class Person {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
    }

    class Student extends Person {
        constructor(name, age, major) {
            super(name, age);
            this.major = major;
        }
    }
```

### 2.3 Metode

= funcții definite pe prototipul unei clase, accesibile pentru toate instanțele acesteia

```js
    class Person {
        constructor(name) {
            this.name = name;
        }

        // getter
        get name() {
            return this._name;
        }

        // setter
        set name(newName) {
            this._name = newName;
        }

        greet() {
            console.log("Hello, " + this.name + "!");
        }
    }

    const examplePers = new Person("Mary");
    examplePers.greet(); // Hello, Mary!
    // setter use
    examplePers.name = "John";
    // getter use
    console.log(examplePers.name);
```

- Observăm în exemplul dat și existența unor metode speciale - _get_ și _set_ (metode pe care le-am mai întâlnit și la limbaje precum C#) - pentru manipularea proprietăților clasei

- De asemenea, se folosește **_** pentru a evita coliziunile de nume între proprietate și metodele set/get 

- În JavaScript, o metodă definită într-o clasă va fi implementată printr-o funcție atașată prototipului părinte

- Pe lângă metodele asociate unei instanțe, putem defini metode statice prin utilizarea keyowrd-ului static, ce vor putea fi apelate la nivel de clasă, nu la nivel de obiect
```js
    class Person {
        static greet() {
            console.log("Hello!");
        }
    }

    Person.greet();
```

### 2.4 Proprietăți

- Proprietățile unei clase pot fi definite la nivelul blocului principal al clasei sau direct în constructor și pot fi publice sau private (precedate de #)

```js
    class Person {
        name;
        // private, can't be accessed directly, 
        // but through a getter and updated using a setter
        #location;

        constructor(name, age, location) {
            this.name = name;
            this.age = age;
            this.#location = location;
        }

        greet() {
            console.log(`Hello, I'm ${this.name} and I'm ${this.age} years old!`);
        }
    }
```

- Precum în cazul metodelor, proprietățile statice sunt definite pe clasă în sine, în loc de în cadrul fiecărei instanțe
```js
    class MathUtils {
        // atribut static
        static PI = 3.14159265359;

        // metodă statică
        static calculateCircleArea(radius) {
            return MathUtils.PI * radius ** 2;
        }

        console.log(`Valoarea lui PI este: ${MathUtils.PI}`);

        const radius = 5;
        const area = MathUtils.calculateCircleArea(radius);
        console.log(`Aria unui cerc cu diametrul ${radius} este: ${area}`);
    }
```

### 2.5 Constructor functions și prototipuri

Înainte de introducerea claselor, _funcțiile constructor_ (constructor functions) erau folosite pentru a replica comportamentul OOP în JavaScript. Să privim un exemplu pentru o entitate de tip plantă 🌿:

```js
    // constructor function
    function Plant(species, region) {
        this.species = species;
        this.region = region;
    }

    // adăugarea metodelor folosind prototipul
    Plant.prototype.getDescription = function() {
        console.log(`This plant belongs to the species ${this.species} 
        and can be found in the region of ${this.region}`);
    }
    const cactus = new Plant("Cactaceae", "Americas");
```

După cum se poate observa, metoda este adăugată direct pe prototipul funcției Plant (care prin natura sa se comportă ca un constructor).

Dacă afișăm la consolă obiectul cactus vom putea observa tot ceea ce am definit:
![](https://github.com/ioanaandreeab/webtech_labs_2023/blob/main/lab4/assets/function.png?raw=true)

Putem rescrie folosind clase exemplul de mai sus:
```js
    class Plant {
        constructor(species, region) {
            this.species = species;
            this.region = region;
        }
        
        getDescription() {
            console.log(`This plant belongs to the species ${this.species} 
            and can be found in the region of ${this.region}`);
        }
    }
    const cactus = new Plant("Cactaceae", "Americas");
```

În acest caz, putem observa un output similar:
![](https://github.com/ioanaandreeab/webtech_labs_2023/blob/main/lab4/assets/class.png?raw=true)

În cel de-al doilea exemplu, în spatele codului scris se întâmplă aceleași 2 operațiuni:
- o funcție numită _Plant_ este creată, drept rezultat al declarării clasei
    - definirea funcției este dată de constructorul clasei
- metodele clasei, precum _getDescription_ sunt stocate în _Plant.prototype_

Dacă parcurgem lanțul prototipal vom observa că fiecare clasă din JavaScript derivă din clasa _Object_

🤔 Moștenirea în JavaScript poate fi un concept mai dificil de înțeles în primă instanță - [aici](https://levelup.gitconnected.com/prototypal-inheritance-the-big-secret-behind-classes-in-javascript-e7368e76e92a) e un articol foarte bun pentru comparația dintre moștenirea folosind clase și cea prototipală

## 3. Erori (excepții)

- Uneori, este necesar să introducem anumite restricții în codul pe care îl scriem

- Erorile, similare excepțiilor din limbaje precum Java și C#, reprezintă un obiect asociat unor evenimente excepționale ce pot apărea pe durata execuției unui program

- O listă completă a erorilor predefinite din JavaScript poate fi regăsită [aici](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors)

- Erorile pot fi generate automat, de către interpretor la executarea unei instrucțiuni eronate, sau programatic, prin utilizarea keyword-ului **throw**

    ```js
    function throwIfZero(n) {
        if (n === 0) {
            throw new TypeError("The number should not be 0");
        }

        return console.log(n * n);
    }
    ```

- În completarea tipurilor de erori predefinite pot fi create erori custom, prin extinderea clasei de bază _Error_, ce pot fi utilizate pentru stabilirea unor restricții la nivel de aplicație
    ```js
    class MyCustomError extends Error {
        constructor(message) {
            super(message);
            this.name = 'MyCustomError'; 
        }
    }

    function divide(a, b) {
        if (b === 0) {
            throw new MyCustomError("Division by zero is not allowed.");
        }
        return a / b;
    }
    ```

- Un mecanism la fel de important este mecanismul de gestionare a excepțiilor, cunoscut sub numele de mecanismul _try/catch/finally_
    ```js
        const greet = (name) => {
            if (typeof name === "string") {
                console.log(`Hello, ${name}`);
            } else {
                throw new TypeError("The name should be a string");
            }
        }

        try {
            // instrucțiuni ce pot declanșa apariția unei erori
            greet();
        } catch (e) {
            // instrucțiuni apelate în cazul interceptării unei erori    
            console.log(e);
        } finally {
            // instrucțiuni apelate indiferent de rezultatul funcției
        }
    ```

- Pentru gestionarea în mod diferit a mai multor tipuri de erori, blocul catch poate fi definit sub forma
    ```js
    catch(error) {
        if (e instanceof RangeError) {
            // execută un tip specific de instrucțiuni pentru erorile de tipul RangeError
        } else if (e instanceof TypeError) {
            // execută un tip specific de instrucțiuni pentru erorile de tipul TypeError
        } else {
            // altfel aruncă excepția mai departe
            throw e; 
        }
    }
    ```