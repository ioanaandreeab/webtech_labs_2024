import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {setMovies} from '../reducers/movies-reducer';
import './Home.css';

const SERVER_URL = "http://localhost:8080";

const Home = () => {
    // hook pentru a naviga catre o pagina dorita
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${SERVER_URL}/movies`)
        .then(res => res.data)
        .then(data => dispatch(setMovies(data.movies)));
    }, []);

    return (
        <div className='home'>
            <h1>Explore movies</h1>
            <button className='custom-button' onClick={() => navigate('/movies')}>Start now</button>
            <button className='custom-button' onClick={() => navigate('/not-found')}>Simulate not found</button>
        </div>
    )
};

export {Home};