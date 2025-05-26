import { useSelector } from 'react-redux';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

const MainContainer = () => {
    const movies = useSelector(store => store.movies?.nowPlayingMovies);
    if (!movies || movies.length === 0) return null;

    const mainMovie = movies[0];
    const { original_title, overview, id } = mainMovie;

    return (
        <div className="relative w-full pt-[56.25%] sm:pt-[50%] md:pt-[40%] lg:pt-[35%] overflow-hidden">

            <div className="absolute inset-0 z-0">
                <VideoBackground movieId={id} />
            </div>

            <div className="absolute inset-0 z-10 flex items-center px-4 sm:px-8 pt-20">
                <VideoTitle title={original_title} overview={overview} />
            </div>
        </div>
    );
};

export default MainContainer;
