import { useDispatch, useSelector } from "react-redux";
import { languages } from "../constants/languages";
import { useRef, useCallback, useMemo } from "react";
import ai from "../utils/vertexai";
import { API_OPTIONS } from "../constants/constants";
import { addGPTMovieResult } from "../utils/gptSlice";
import useDebounce from "../Hooks/useDebounce";

const GptSearchBar = () => {
    const dispatch = useDispatch();
    const langkey = useSelector((store) => store.config.language);
    const searchText = useRef(null);

    const searchMovieTMDB = useCallback(async (movie) => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
                    movie
                )}&include_adult=false&language=en-US&page=1`,
                API_OPTIONS
            );
            const data = await response.json();
           
            return data.results;
        } catch (error) {
            console.error("Error searching movie from TMDB:", error);
            return [];
        }
    }, []);

    const performSearch = useCallback(
        async (searchQuery) => {
            if (!searchQuery || searchQuery.trim() === "") return;
            // console.log("PerformSearch triggered with query: ", searchQuery);
            try {
                const query = `
                            You are a precise entertainment recommendation system. Analyze the user's query and determine what type of content they're looking for (movies, TV shows, web series, or anime).

                            User Query: "${searchQuery}"

                            Based on the query, provide exactly 10 recommendations that match their request. Follow these rules:

                            1. If they ask for MOVIES - recommend only movies
                            2. If they ask for TV SHOWS/SERIES - recommend only TV shows/web series  
                            3. If they ask for ANIME - recommend only anime
                            4. If the query is general (like "action" or "comedy") - recommend movies by default
                            5. If they mention multiple types, prioritize the first mentioned type

                            Output format: Provide ONLY the titles separated by commas, no asterisks (*), no numbers, no explanations, no bullet points.

                            Example outputs:
                            - For movies: "The Dark Knight, Inception, Interstellar, The Matrix, Fight Club"
                            - For anime: "Attack on Titan, Demon Slayer, One Piece, Naruto, Death Note"
                            - For TV shows: "Breaking Bad, Game of Thrones, Peaky Blinders, The Office, Friends"

                            Provide your 10 recommendations now:
`;

                const geminiResults = await ai.models.generateContent({
                    model: "gemini-2.0-flash",
                    contents: query,
                });

                const moviesRecommendation = geminiResults.text.split(", ");
                // console.log("gpt recommendations:", moviesRecommendation);
                const tmdbResults = await Promise.allSettled(
                    moviesRecommendation.map((movie) => searchMovieTMDB(movie))
                );

                const successfulResults = tmdbResults.map((result) =>
                    result.status === "fulfilled" ? result.value : []
                );
                // console.log("tmdb results :", successfulResults);
                dispatch(
                    addGPTMovieResult({
                        movieNames: moviesRecommendation,
                        gptResults: successfulResults,
                    })
                );
            } catch (error) {
                console.error("Error fetching movie recommendations:", error);
            }
        },
        [dispatch, searchMovieTMDB]
    );

    const handleManualSearch = useCallback(
        (e) => {
            e.preventDefault();
            const searchQuery = searchText.current?.value?.trim();
            if (!searchQuery) return;
            performSearch(searchQuery);
        },
        [performSearch]
    );

    // Debounce logic to clear results only when input is empty
    const [debouncedClearInput] = useDebounce((value) => {
        // console.log("debounce input handler", value)
        if (value.trim() === "") {
            // console.log("clearing results for empty")
            dispatch(addGPTMovieResult({ movieNames: null, gptResults: null }));
        }
    }, 500);

    const handleInputChange = useCallback(
        (e) => {
            const value = e.target.value;
            debouncedClearInput(value);
        },
        [debouncedClearInput]
    );

    const placeholder = useMemo(
        () => languages[langkey].gptSearchPlaceholder,
        [langkey]
    );

    const searchButtonText = useMemo(() => languages[langkey].search, [langkey]);

    return (
        <div className="flex items-center justify-center pt-[10%]">
            <form
                onSubmit={handleManualSearch}
                className="flex flex-col sm:flex-row items-center gap-4 w-full"
            >
                <div className="relative flex-1 w-full">
                    <input
                        type="text"
                        ref={searchText}
                        onChange={handleInputChange}
                        className="flex-1 rounded-lg p-3 border border-gray-300 focus:border-silver-500 focus:outline-none transition-all text-white w-full"
                        placeholder={placeholder}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full sm:w-auto py-3 px-6 rounded-lg cursor-pointer bg-red-600 hover:bg-red-700 text-white font-semibold transition"
                >
                    {searchButtonText}
                </button>
            </form>
        </div>
    );
};

export default GptSearchBar;
