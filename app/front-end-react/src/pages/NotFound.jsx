import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

const NotFound = () => {
    const movies = useSelector((state) => state.movies);
    const navigate = useNavigate();
  
    return (
        <div>
            <h1>Page not found.</h1>
            <div>{`However, you can explore ${movies.length} movies`} <a onClick={() => navigate('/movies')}>here</a></div>
        </div>
    );
};

export {NotFound};