import React, {useState} from 'react';

import './MovieCard.css';

// componenta MovieCard primeste un prop denumit movie - obiectul ce descrie un film
// o functie onDelete ce va fi apelata atunci cand se doreste stergerea unui element
// si o functie onEdit ce va fi apelata atunci cand se doreste editarea unui film
// componenta are, deci, doua moduri -> read si edit
const MovieCard = ({movie, onDelete, onEdit}) => {
    const [isEditMode, setIsEditMode] = useState(false);
        // adaugam in state toate campurile care vor fi completate
        // valorile initiale sunt cele ale filmului primit
        const [title, setTitle] = useState(movie.title);
        const [year, setYear] = useState(movie.year);
        const [director, setDirector] = useState(movie.director);
        const [genre, setGenre] = useState(movie.genre);
        const [synopsis, setSynopsis] = useState(movie.synopsis);
        const [duration, setDuration] = useState(movie.duration);
        const [poster, setPoster] = useState(movie.poster);

        const updateMovie = (event) => {
            // impiedicam trimiterea default a formularului -> refresh paginii
            event.preventDefault();
            // pasam functiei de salvare obiectul movie construit prin completarea formularului
            onEdit({title, year, director, genre, synopsis, duration, poster, id: movie.id});
            setIsEditMode(false);
        }
    
        // definim callbacks pentru evenimentele de onChange pentru toate inputurile
        const onChangeTitle = (event) => {
            setTitle(event.target.value);
        }
    
        const onChangeYear = (event) => {
            setYear(event.target.value);
        }
    
        const onChangeGenre = (event) => {
            setGenre(event.target.value);
        }
    
        const onChangeSynopsis = (event) => {
            setSynopsis(event.target.value);
        }
    
        const onChangeDirector = (event) => {
            setDirector(event.target.value);
        }
    
        const onChangeDuration = (event) => {
            setDuration(event.target.value);
        }
    
        const onChangePoster = (event) => {
            setPoster(event.target.value);
        }

    return (
        <div className="movie-container">
            {/* randare conditionala, in functie de modul cardului ce afiseaza filmul - read/edit */}
            {isEditMode ? 
                <div className="edit-movie-form">
                    <label htmlFor="title">Title:</label>
                    <input value={title} onChange={onChangeTitle} className="custom-text-input" type="text" id="title" name="title" required/><br/>

                    <label htmlFor="year">Year:</label>
                    <input value={year} onChange={onChangeYear} className="custom-text-input" type="number" id="year" name="year" required/><br/>

                    <label htmlFor="director">Director:</label>
                    <input value={director} onChange={onChangeDirector} className="custom-text-input" type="text" id="director" name="director" required/><br/>

                    <label htmlFor="genre">Genre:</label>
                    <input value={genre} onChange={onChangeGenre} className="custom-text-input" type="text" id="genre" name="genre" required/><br/>

                    <label htmlFor="synopsis">Synopsis:</label>
                    <textarea value={synopsis} onChange={onChangeSynopsis} className="custom-text-input" id="synopsis" name="synopsis" required></textarea><br/>

                    <label htmlFor="duration">Duration (minutes):</label>
                    <input value={duration} onChange={onChangeDuration} className="custom-text-input" type="number" id="duration" name="duration" required/><br/>

                    <label htmlFor="poster">Poster URL:</label>
                    <input value={poster} onChange={onChangePoster} className="custom-text-input" type="url" id="poster" name="poster" required/><br/>

                    <button className="custom-button" onClick={updateMovie}>Save</button>
                    <button className="remove-btn" onClick={() => setIsEditMode(false)}>Abort changes</button>
                </div>
            :
            <React.Fragment>
                <img alt="movie-img" className="poster-container" src={movie.poster}/>
                <div className="movie-info-container">
                    <div className="movie-header">
                        <h4 className="movieTitle">
                            {/* sintaxa de JSX */}
                            {`${movie.title} (${movie.year})`}
                        </h4>
                        {/* apeleaza la click functia de delete primita prin props si trimite filmul drept parametru */}
                        <button className="remove-btn" onClick={() => onDelete(movie)}>X</button>
                        <button className="custom-button movie-tool-btn" onClick={() => setIsEditMode(true)}>Edit</button>
                    </div>
                    <div className="movie-specs">
                        {`${movie.genre} • ${movie.duration} minutes • ${movie.director}`}
                    </div>
                    <div className="movie-synopsis">
                        {movie.synopsis}
                    </div>
                </div>
            </React.Fragment>
            }
        </div>
    )
};

export {MovieCard};