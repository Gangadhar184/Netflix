
import Header from './Header';
import useNowPlayingMovies from '../Hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';

const Browse = () => {

    const showGptSearch = useSelector(store => store.gpt.showGptSearch);

    useNowPlayingMovies()
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
