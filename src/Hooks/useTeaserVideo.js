//fetching teaser video and updateing store with videoData
import React, { useEffect } from "react";
import { API_OPTIONS } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTeaserVideo } from "../utils/moviesSlice";
const useTeaserVideo = (movieId) => {
  const dispatch = useDispatch();
  const teaserVideo = useSelector((state) => state.movies.teaserVideo);
  const getMovieVideos = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );
    const json = await data.json();

    const teaser = json.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );
    dispatch(addTeaserVideo(teaser));
  };
  useEffect(() => {
    getMovieVideos();
  }, []);
  return teaserVideo;
};
export default useTeaserVideo;
