import { API_OPTIONS } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { addNowPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useNowPopularMovies = () => {
  const dispatch = useDispatch();

  //removing unneccessary api calls
  const nowPopularMovies = useSelector(
    (store) => store.movies.nowPopularMovies
  );

  const getNowPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1",
      API_OPTIONS
    );
    const json = await data.json();

    dispatch(addNowPopularMovies(json.results));
  };
  useEffect(() => {
    !nowPopularMovies && getNowPopularMovies();
  }, []);
};
export default useNowPopularMovies;
