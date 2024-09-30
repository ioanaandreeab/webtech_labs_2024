# Seminar 1 - Git & JavaScript

### Conținut

1. [git - concepte de bază](#1-git---concepte-de-baz%C4%83)

   1.1 [Crearea unui cont de GitHub](#11-creare-cont-github)

   1.2 [Crearea unui repository](#12-creare-repository)

   1.3 [Instalare git](#13-instalare-git)

   1.4 [Clonarea repository-ului](#14-clonarea-repository-ului)

   1.5 [Versionarea codului](#15-versionarea-codului)

2. [JavaScript](#2-javascript)

   2.1 [JavaScript pe client](#21-javascript-pe-client)

   2.2 [JavaScript pe server](#22-javascript-pe-server)

## 1 git - concepte de bază

**Ce este git?**

- git este un **sistem de versionare gratuit și open-source**. Ce înseamnă asta? Practic, ne referim la o bază de date care e distribuită între toți cei care au acces la ea și care ține evidența tuturor modificărilor aduse asupra ei (de obicei, modificările aduse asupra codului sursă al unui proiect)
- a fost creat în 2005 de Linus Torvalds, cel care a început și dezvoltarea sistemului de operare Linux
- stă la baza tuturor platformelor de colaborare, precum GitHub

**De ce avem nevoie de git?**

- colaborare mai bună
- integritatea informației
- flexibilitate pentru a dezvolta feature-uri noi

**Concepte de bază**

- **repository**
  - sursa principală a codului, un director care conține toate fișierele unui proiect, precum și istoricul acestora
- **branch** - ramificație a versiunii de bază a proiectului, independentă, ce permite adăugarea unor noi comportamente, ce pot fi ulterior resincronizate și reintegrate

  - orice repository are un branch principal, ce poartă, în general, denumirea de _main_

  🤔 denumirea de _master_ este încă prezentă în repository-urile vechi, însă norma actuală este de a utiliza denumirea _main_ - puteți afla mai multe [aici](https://www.theserverside.com/feature/Why-GitHub-renamed-its-master-branch-to-main)

  - structura arborescentă pe care o conferă branch-urile unui repository poate fi observată și în următoarea figură
    ![](https://uploads.sitepoint.com/wp-content/uploads/2019/06/155993572204-gitflow.png)

- **commit**
  - reprezentare (snapshot) a stării codului proiectului la un anumit moment
  - fiecare commit este însoțit de un mesaj care descrie modificările care au fost introduse
- **staged**
  - modificările care vor fi introduse în commitul următor
- **clone**
  - copie locală a unui repository
- **remote**
  - versiune a unui repository aflată pe un server, putând fi versiunea principală ori a unui colaborator
- **push**
  - acțiunea de a muta commiturile locale pe repository-ul remote
- **pull**
  - actualizarea copiei locale a repository-ului cu modificările din remote
- **conflict**
  - situație care apare în momentul în care același fragment este modificat de mai multe persoane în același timp
- **merge**
  - transferul modificărilor dintr-un branch în altul

**Comenzi de bază**

- **git clone** - realizează o clonă locală a repository-ului remote
- **git init** - inițializează un repository local
- **git remote add origin** - stabilește legătura dintre repository-ul local și cel remote
- **git checkout** - actualizează fișierele locale pentru a fi sincronizate cu un anumit branch

  - atunci când este folosit cu parametrul _-b_ creează un branch nou din cel curent

- **git add** - adaugă modificările ce vor fi incluse în următorul commit
- **git commit** - creează un commit nou care include toate modificările adăugate anterior
  - de obicei se folosește cu parametrul _-m_ pentru a specifica un mesaj sugestiv ce rezumă modificările adăugate
- **git push** - transferă modificările locale în repository-ul remote
- **git pull** - descarcă ultimele modificări din repository-ul remote
- **git status** - afișează modificările locale, precum și cele care vor fi incluse în următorul commit
- **git log** - afișează ultimele commituri
- **git config** - setează variabilele de configurare; o folosim, în general, pentru a seta emailul și numele utilizatorului curent pentru a putea asocia commiturile unui autor

🤔 **Extra resurse**:

- tutoriale cu funcțiile avansate git [aici](https://www.youtube.com/watch?v=f1wnYdLEpgI) și [aici](https://www.youtube.com/watch?v=ElRzTuYln0M)
- [cheatsheet cu comenzile git](https://education.github.com/git-cheat-sheet-education.pdf)

### 1.1 Creare cont GitHub

- vom crea un cont [GitHub](https://github.com/) pe care îl vom folosi pe tot parcursul semestrului pentru:
  - seminare
  - teme
  - proiect

### 1.2 Creare repository

- vom crea un prim repository de test pentru a ne familiariza cu platforma
- accesăm https://github.com/new și completăm câmpurile:
  - repository name
  - description
- bifăm opțiunea _Public_ (pentru teme și proiecte vom bifa opțiunea _Private_)
- bifăm opțiunea _Add a README file_ (în care, ulterior, vom adăuga informații despre ce reprezintă proiectul nostru)
  ![](https://github.com/ioanaandreeab/webtech_labs_2024/blob/main/lab1/assets/creare_repo.png?raw=true)
- finalizăm crearea repository-ului

### 1.3 Instalare git

- accesăm https://git-scm.com/downloads și descărcăm versiunea de Git specifică sistemului de operare folosit

### 1.4 Clonarea repository-ului

- după instalarea git vom deschide un terminal (comenzile git vor fi acum recunoscute de sistem)
- în terminal vom executa comanda de clonare a repository-ului remote creat anterior (adresa se poate obține de pe pagina repository-ului și urmează structura https://github.com/username/repo-name.git)

```sh
git clone https://github.com/ioanaandreeab/webtech_labs_2024.git
```

### 1.5 Versionarea codului

- accesăm fișierul _README.md_ și adăugăm o modificare
- rulăm comenzile necesare pentru a adăuga modificările, crea un commit și salva modificările pe repository-ul remote

```sh
git add . # adăugăm modificările
git status # verificăm adăugarea modificărilor
git commit -m "update README.md" # creăm un nou commit cu mesajul descriptiv
git log # vizualizăm commitul adăugat (și restul istoricului)
git push # transmitem modificările către repository-ul remote
```

- după executarea comenzilor putem observa că modificările locale sunt acum vizibile și pe repository-ul remote, verificând pagina repository-ului în browser

## 2 JavaScript

- orice aplicație web are o parte de client (front-end -> interfața cu care poate interacționa utilizatorul și care permite vizualizarea informațiilor) și una de server (back-end -> procesele logice și computațiile realizate pentru diferite funcționalități)
- în cadrul seminarului vom utiliza JavaScript atât pentru client, cât și pentru server
  ![](https://res.cloudinary.com/lwgatsby/f_auto/www/uploads/2023/05/client-server-network.jpg)

### 2.1 JavaScript pe client

- fiecare browser are un engine de JavaScript pentru a putea interpreta codul client și a afișa informațiile necesare
- în cazul Chrome, acesta este [V8](https://v8.dev/)
- putem scrie cod JavaScript in browser foarte ușor, deschizând consola din uneltele de dezvoltare accesibile prin opțiunea _Inspect_

### 2.2 JavaScript pe server

- JavaScript poate rula pe server utilizând node.js, un runtime de JavaScript (construit folosind engine-ul anterior menționat)
- pentru a putea folosi node.js, acesta trebuie mai întâi descărcat și instalat: https://nodejs.org/en/download
- pentru a rula cod de JavaScript folosind node.js vom crea un fișier _main.js_ în care vom adăuga următoarea linie de cod:

```sh
console.log("hello world");
```

- pentru a executa fișierul vom deschide un terminal și vom rula comanda

```sh
node main.js
```

- vom putea observa în consolă mesajul afișat
- deoarece node.js este destinat scrierii serverelor web, vom crea un prim server simplu, înlocuind conținutul fișierului cu:

```sh
const http = require("http");

http
    .createServer((req, res) => {
            res.write("hello web!");
            res.end();
    }).listen(8080);
```

- executând fișierul și acceesând adresa _http://localhost:8080_ vom vedea afișat în browser mesajul
