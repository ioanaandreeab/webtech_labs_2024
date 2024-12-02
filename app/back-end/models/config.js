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