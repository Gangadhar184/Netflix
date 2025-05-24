import useTeaserVideo from '../Hooks/useTeaserVideo';

const VideoBackground = ({ movieId }) => {
  const teaserVideo = useTeaserVideo(movieId);

  if (!teaserVideo) return null;

  return (
    <div className="relative w-full h-[56.25vw] overflow-hidden sm:h-[60vh] md:h-[80vh] lg:h-screen">
      <iframe
        className="absolute top-0 left-0 w-[120%] h-[120%] -translate-x-[10%] -translate-y-[10%] scale-110"
        src={`https://www.youtube.com/embed/${teaserVideo.key}?start=2&end=30&autoplay=1&mute=1&loop=1&controls=0&playlist=${teaserVideo.key}`}
        title="YouTube video player"
        allow="accelerometer; autoplay;"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
};

export default VideoBackground;
