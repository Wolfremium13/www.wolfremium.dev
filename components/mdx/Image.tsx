interface ImageProps {
  src: string;
  alt: string;
}

const Image: React.FC<ImageProps> = ({ src, alt }) => {
  return (
    <div className="flex justify-center m-4">
      <img src={src} alt={alt} className="rounded-lg" />
    </div>
  );
};

export { Image };
