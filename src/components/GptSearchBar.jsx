import { useDispatch, useSelector } from "react-redux";
import { languages } from "../constants/languages";
import { useRef } from "react";
import ai from "../utils/vertexai";
import { API_OPTIONS } from "../constants/constants";
import { addGPTMovieResult } from "../utils/gptSlice";




const GptSearchBar = () => {
    const dispatch = useDispatch();
    const langkey = useSelector((store) => store.config.language);
    const searchText = useRef(null);

    //search movie in tmdb database
    const searchMovieTMDB = async (movie) => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie)}&include_adult=false&language=en-US&page=1`,
                API_OPTIONS
            );

            const data = await response.json();
            // console.log(data); // or return data if you want to use it elsewhere
            return data.results;
        } catch (error) {
            console.error("Error searching movie from TMDB:", error);
        }
    };

    const handleGPTSearch = async () => {
        try {
            const query = `
                Act as a professional Movie Recommendation System. Based on the following user query, recommend only 5 movie names  (including anime if relevant) that best match the theme, genre, or keywords in the query.

                User Query: ${searchText.current.value}

                Strictly follow this output format:
                Movie1, Movie2, Movie3, Movie4, Movie5

                Do not include any explanations, numbers, or bullet points — just the names of the 5 movies, separated by commas.
`;

            const geminiResults = await ai.models.generateContent({
                model: 'gemini-2.0-flash',
                contents: query,
            });

            console.log(geminiResults.text);

            //converting results into array
            const moviesRecommendation = geminiResults.text.split(", ");
            console.log(moviesRecommendation);

            //[Avatar, Avengers: Endgame, Avatar: The Way of Water, Titanic, Star Wars: The Force Awakens]
            //for each movie i will search in tmdb 

            const promiseArray = moviesRecommendation.map((movie) => searchMovieTMDB(movie));
            //for each movie we get 5 promises [promise, promise, promise, promise, promise]
            const tmdbResults = await Promise.all(promiseArray);
            console.log(tmdbResults);
            // dispatch(addGPTMovieResult(tmdbResults));

            //we will see here how to dispatch multiple (movieNames, tmdbResults) using redux, we have to create a object 

            dispatch(addGPTMovieResult({ movieNames: moviesRecommendation, gptResults: tmdbResults }))

        } catch (error) {
            console.error("Error fetching movie recommendations:", error);
        }
    };

    return (
        <div className="flex items-center justify-center pt-[10%]">
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col md:flex-row items-center gap-4 w-full max-w-xl">
                <input
                    type="text"
                    ref={searchText}
                    className="rounded-lg p-2 border border-gray-300 focus:border-blue-500 focus:outline-none transition-all text-black w-full"
                    placeholder={languages[langkey].gptSearchPlaceholder}
                />
                <button onClick={handleGPTSearch} className="py-2 px-4 rounded-lg cursor-pointer bg-red-500 text-white w-full md:w-auto">
                    {languages[langkey].search}
                </button>
            </form>
        </div>
    );
};

export default GptSearchBar;
