import Link from "next/link";

type PostPreviewProps = {
  title: string;
  slug: string;
  preview: string;
};

const PostPreview: React.FC<PostPreviewProps> = ({ title, slug, preview }) => {
  return (
    <div className="border-2 border-darkGreen hover:border-lightGreen rounded-lg overflow-hidden hover:scale-105 transform transition-transform">
      <Link href={`/blog/posts/${slug}`}>
        <img src={preview} alt={title} className="w-full h-full object-cover" />
        <div className="p-4 absolute bottom-0 bg-gray-900/60 w-full">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-gray-300">Leer más</p>
        </div>
      </Link>
    </div>
  );
};

export { PostPreview };
