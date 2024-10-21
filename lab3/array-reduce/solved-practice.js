const songs = [
    {name: 'Channel Tres - 6am', duration: 180},
    {name: 'Jungle - Back on 74', duration: 200},
    {name: 'Kali Uchis - Moonlight', duration: 187},
    {name: 'Biig Piig - Sunny', duration: 167}
];

// const totalDurationInSeconds = // folosește metoda reduce pentru a calcula durata totală a playlist-ului în secunde

const totalDurationInSeconds = songs.reduce((accumulator, currentSong) => {
    return accumulator + currentSong.duration
}, 0);

console.log('Total duration in seconds - ', totalDurationInSeconds);

// extra: calculează durata totală a playlist-ului în minute și secunde

const minutes = Math.floor(totalDurationInSeconds / 60);
const remainingSeconds = totalDurationInSeconds % 60;

console.log(`Total duration - ${minutes} minutes and ${remainingSeconds} seconds`);