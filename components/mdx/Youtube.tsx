interface YouTubeProps {
  videoId: string;
}

const YouTube: React.FC<YouTubeProps> = ({ videoId }) => {
  return (
    <div className="relative pt-56.25 w-full overflow-hidden rounded-lg shadow-md">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export { YouTube };
