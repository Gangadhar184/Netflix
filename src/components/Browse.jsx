
import Header from './Header';
import useNowPlayingMovies from '../Hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';
import useNowPopularMovies from '../Hooks/useNowPopularMovies';
import useNowTopRatedMovies from '../Hooks/useNowTopRatedMovies.js';
import useNowUpcomingMovies from '../Hooks/useNowUpcomingMovies.js';

const Browse = () => {

    const showGptSearch = useSelector(store => store.gpt.showGptSearch);

    useNowPlayingMovies();
    useNowPopularMovies();
    useNowTopRatedMovies();
    useNowUpcomingMovies();
    return (
        <div className="min-h-screen    text-white">
            <div className="relative">
         
                    <Header />
            
                {
                    showGptSearch ? <GptSearch /> :
                        <>
                            <MainContainer />
                            <SecondaryContainer />
                        </>
                }


            </div>
        </div>
    );
};

export default Browse;
