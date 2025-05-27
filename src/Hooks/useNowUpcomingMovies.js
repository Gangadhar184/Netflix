
import { API_OPTIONS } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { addNowUpcomingMovies} from "../utils/moviesSlice";
import { useEffect } from "react";

const useNowUpcomingMovies = () => {
  const dispatch = useDispatch();

  //removing unneccessary api calls
  const nowUpcomingMovies = useSelector(
    (store) => store.movies.nowUpcomingMovies
  );

  const getNowUpcomingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      API_OPTIONS
    );
    const json = await data.json();

    dispatch(addNowUpcomingMovies(json.results));
  };
  useEffect(() => {
    !nowUpcomingMovies && getNowUpcomingMovies();
  }, []);
};
export default useNowUpcomingMovies;
