import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    teaserVideo: null,
    nowPlayingMovies: null,
    nowPopularMovies: null,
    nowTopRatedMovies: null,
    nowUpcomingMovies: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addNowPopularMovies: (state, action) => {
      state.nowPopularMovies = action.payload;
    },
    addNowTopRatedMovies: (state, action) => {
      state.nowTopRatedMovies = action.payload;
    },
    addNowUpcomingMovies: (state, action) => {
      state.nowUpcomingMovies = action.payload;
    },
    addTeaserVideo: (state, action) => {
      state.teaserVideo = action.payload;
    },
  },
});
export const { addNowPlayingMovies, addNowPopularMovies, addNowTopRatedMovies, addNowUpcomingMovies, addTeaserVideo } =
  moviesSlice.actions;
export default moviesSlice.reducer;
