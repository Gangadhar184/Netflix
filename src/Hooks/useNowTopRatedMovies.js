
import { API_OPTIONS } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { addNowTopRatedMovies} from "../utils/moviesSlice";
import { useEffect } from "react";

const useNowTopRatedMovies = () => {
  const dispatch = useDispatch();

  //removing unneccessary api calls
  const nowTopRatedMovies = useSelector(
    (store) => store.movies.nowTopRatedMovies
  );

  const getNowTopRatedMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?page=1",
      API_OPTIONS
    );
    const json = await data.json();

    dispatch(addNowTopRatedMovies(json.results));
  };
  useEffect(() => {
    !nowTopRatedMovies && getNowTopRatedMovies();
  }, []);
};
export default useNowTopRatedMovies;
