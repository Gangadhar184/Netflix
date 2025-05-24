import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
    const movies = useSelector(store => store.movies)
    return (
         movies && (
        <div className=''>
            <div >
            <MovieList title={"Now Playing"} movies = {movies.nowPlayingMovies} />
            <MovieList title={"Trending"} movies = {movies.nowPlayingMovies} />
            <MovieList title={"Upcoming"} movies = {movies.nowPlayingMovies} />
            <MovieList title={"Horror"} movies = {movies.nowPlayingMovies} />
            <MovieList title={"Popular"} movies = {movies.nowPlayingMovies} />
            </div>
        </div>
    )
)
}

export default SecondaryContainer

/**
 * Movielist - Popular
    
    * Movie Cards  in Horizontal  courosel
 * MovieList - Now Playing
 * MovieLIst - Trending
 */
