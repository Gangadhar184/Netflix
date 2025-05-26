import { useSelector } from "react-redux";
import MovieList from './MovieList';


const GptMovieSuggestions = () => {

  const gpt = useSelector(store => store.gpt);
  const { gptResults, movieNames } = gpt;
  if (!movieNames) return null;
  return (
    <div className="bg-black p-4 text-white">
      {/* {movieNames} */}
      {movieNames.map((movieName, index) => (
        <MovieList key={movieName} title={movieName[0]} movies={gptResults[index]} />
      ))}

    </div>
  )
}

export default GptMovieSuggestions;
