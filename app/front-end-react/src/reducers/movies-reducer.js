import {createSlice} from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: []
    },
    reducers: {
        addMovie: (state, action) => {
            return {movies: [...state.movies, action.payload]}
        },
        setMovies: (state, action) => {
            return {movies: [...action.payload]}
        }
    }
});

export const {addMovie, setMovies} = moviesSlice.actions;

export default moviesSlice.reducer;