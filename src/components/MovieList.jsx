
import MovieCard from './MovieCard'

const MovieList = ({ title, movies }) => {
   
    return (
        <div className='pt-4'>
            <h1 className='text-white text-3xl '>{title}</h1>
            <div className='flex overflow-x-scroll pt-5'>

                <div className='flex gap-2 '>
                    {movies?.map(movie =>
                        <MovieCard key={movie.id} posterPath={movie.poster_path} />
                    )}
                </div>

            </div>
        </div>

    )
}

export default MovieList
