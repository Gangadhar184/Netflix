
import MovieCard from './MovieCard'

const MovieList = ({ title, movies }) => {
   
    return (
        <div className='pt-6 px-4 sm:px-6 md:px-10'>
            <h1 className='text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-3 '>{title}</h1>
            <div className='flex overflow-x-auto gap-4 pb-4 scrollbar-hide'>

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
