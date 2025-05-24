import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    // gptMovies: null,
    movieNames: null,
    gptResults: null,
  },
  reducers: {
    toggleGPTSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGPTMovieResult: (state, action) => {
      const { movieNames, gptResults } = action.payload;
      // state.gptMovies = action.payload;
      state.movieNames = movieNames;
      state.gptResults = gptResults;
    },
  },
});

export const { toggleGPTSearchView, addGPTMovieResult } = gptSlice.actions;
export default gptSlice.reducer;
