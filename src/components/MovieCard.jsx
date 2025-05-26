
import { IMG_URL } from '../constants/constants'

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;

  return (
    <div className="min-w-[120px] sm:min-w-[140px] md:min-w-[160px] lg:min-w-[180px]">
      <img
        src={IMG_URL + posterPath}
        alt="Movie Poster"
        className="w-full h-auto rounded-md cursor-pointer object-cover"
      />
    </div>
  );
};

export default MovieCard
