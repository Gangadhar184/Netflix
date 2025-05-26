const VideoTitle = ({ title, overview }) => {
  return (
    <div className="text-white">
      <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold drop-shadow-md">
        {title}
      </h2>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl w-full sm:w-3/4 md:w-1/2 lg:w-1/3 mt-3 py-4 drop-shadow-md">
        {overview}
      </p>
    </div>
  );
};

export default VideoTitle;
