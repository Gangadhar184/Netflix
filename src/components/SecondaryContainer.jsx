import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
    const movies = useSelector(store => store.movies)
    return (
         movies && (
        <div className='bg-black px-4 sm:px-6 md:px-10 py-6'>
            <div >
            <MovieList title={"Now Playing"} movies = {movies.nowPlayingMovies} />
            <MovieList title={"TopRated"} movies = {movies.nowTopRatedMovies} />
            <MovieList title={"Popular"} movies = {movies.nowPopularMovies} />
            <MovieList title={"Upcoming"} movies = {movies.nowUpcomingMovies} />
            <MovieList title={"Horror"} movies = {movies.nowPlayingMovies} />
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
