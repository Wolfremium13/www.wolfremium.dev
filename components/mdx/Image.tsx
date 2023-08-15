import Image from "next/image";

interface MdxImageProps {
  src: string;
  alt: string;
}

const MdxImage: React.FC<MdxImageProps> = ({ src, alt }) => {
  return (
    <div className="flex justify-center m-4">
      <Image
        width={500}
        height={500}
        src={src}
        alt={alt}
        className="rounded-lg"
      />
    </div>
  );
};

export { MdxImage };
