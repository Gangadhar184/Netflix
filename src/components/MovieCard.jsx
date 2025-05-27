import { IMG_URL } from '../constants/constants';

const MovieCard = ({ posterPath, vote_average }) => {
  if (!posterPath) return null;

  const ratingColor =
    vote_average > 8
      ? 'bg-green-500'
      : vote_average >= 5
        ? 'bg-blue-400'
        : 'bg-red-500';

  return (
    <div className="min-w-[120px] sm:min-w-[140px] md:min-w-[160px] lg:min-w-[180px] relative">
      <img
        src={IMG_URL + posterPath}
        alt="Movie Poster"
        className="w-full h-auto rounded-md cursor-pointer object-cover"
      />
      <span
        className={`absolute top-2 right-2 ${ratingColor} text-white text-xs font-semibold rounded-full w-8 h-8 flex items-center justify-center shadow-md`}
      >
        {vote_average?.toFixed(1)}
      </span>
    </div>
  );
};

export default MovieCard;
