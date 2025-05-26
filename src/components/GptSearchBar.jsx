import { useDispatch, useSelector } from "react-redux";
import { languages } from "../constants/languages";
import { useRef, useState, useCallback, useMemo } from "react";
import ai from "../utils/vertexai";
import { API_OPTIONS } from "../constants/constants";
import { addGPTMovieResult } from "../utils/gptSlice";
import useDebounce from "../Hooks/useDebounce";




const GptSearchBar = () => {
    const dispatch = useDispatch();
    const langkey = useSelector((store) => store.config.language);
    const searchText = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const lastSearchQuery = useRef("");

    //search movie in tmdb database
    // Memoize TMDB search function
    const searchMovieTMDB = useCallback(async (movie) => {
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
    }, [])

    const handleGPTSearch = useCallback(async (searchQuery) => {
        if (!searchQuery || searchQuery.trim() === "" || searchQuery === lastSearchQuery.current) {
            return;
        }

        // Prevent duplicate searches
        lastSearchQuery.current = searchQuery;
        setIsLoading(true);

        try {
            const query = `
You are a precise entertainment recommendation system. Analyze the user's query and determine what type of content they're looking for (movies, TV shows, web series, or anime).

User Query: "${searchQuery}"

Based on the query, provide exactly 5 recommendations that match their request. Follow these rules:

1. If they ask for MOVIES - recommend only movies
2. If they ask for TV SHOWS/SERIES - recommend only TV shows/web series  
3. If they ask for ANIME - recommend only anime
4. If the query is general (like "action" or "comedy") - recommend movies by default
5. If they mention multiple types, prioritize the first mentioned type

Output format: Provide ONLY the titles separated by commas, no asterisks (*), no numbers, no explanations, no bullet points.

Example outputs:
- For movies: "The Dark Knight, Inception, Interstellar, The Matrix, Fight Club"
- For anime: "Attack on Titan, Demon Slayer, One Piece, Naruto, Death Note"
- For TV shows: "Breaking Bad, Game of Thrones, Stranger Things, The Office, Friends"

Provide your 5 recommendations now:
            `;

            const geminiResults = await ai.models.generateContent({
                model: 'gemini-2.0-flash',
                contents: query,
            });

            // Converting results into array
            const moviesRecommendation = geminiResults.text.split(", ");

            // Batch TMDB searches for better performance
            const tmdbResults = await Promise.allSettled(
                moviesRecommendation.map(movie => searchMovieTMDB(movie))
            );

            // Filter successful results
            const successfulResults = tmdbResults.map(result =>
                result.status === 'fulfilled' ? result.value : []
            );

            // Only dispatch if component is still mounted and this is the latest search
            if (searchQuery === lastSearchQuery.current) {
                dispatch(addGPTMovieResult({
                    movieNames: moviesRecommendation,
                    gptResults: successfulResults
                }));
            }

        } catch (error) {
            console.error("Error fetching movie recommendations:", error);
        } finally {
            // Only update loading if this is still the current search
            if (searchQuery === lastSearchQuery.current) {
                setIsLoading(false);
            }
        }
    }, [dispatch, searchMovieTMDB]);

    // Use the optimized debounce hook
    const [debouncedSearch, clearDebounce] = useDebounce(handleGPTSearch, 1000);

    // Memoize input change handler
    const handleInputChange = useCallback((e) => {
        const value = e.target.value;

        // Clear results if input is empty
        if (value.trim() === "") {
            dispatch(addGPTMovieResult({ movieNames: null, gptResults: null }));
            clearDebounce();
            setIsLoading(false);
            lastSearchQuery.current = "";
            return;
        }

        // Trigger debounced search
        debouncedSearch(value);
    }, [dispatch, debouncedSearch, clearDebounce]);

    // Memoize manual search handler
    const handleManualSearch = useCallback((e) => {
        e.preventDefault();

        // Clear existing debounce timer
        clearDebounce();

        // Execute search immediately
        const searchQuery = searchText.current.value;
        handleGPTSearch(searchQuery);
    }, [clearDebounce, handleGPTSearch]);

    // Memoize placeholder text
    const placeholder = useMemo(() =>
        languages[langkey].gptSearchPlaceholder, [langkey]
    );

    // Memoize search button text
    const searchButtonText = useMemo(() =>
        languages[langkey].search, [langkey]
    );


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
                        disabled={isLoading}
                    />
                    {isLoading && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto py-3 px-6 rounded-lg cursor-pointer bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white font-semibold transition"
                >
                    {isLoading ? "Searching..." : searchButtonText}
                </button>
            </form>
        </div>
    );
};

export default GptSearchBar;
