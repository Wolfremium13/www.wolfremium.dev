import { Post } from "@/lib/posts/domain/post";
import Image from "next/image";
import Link from "next/link";

type PostPreviewProps = {
  post: Post;
};

const PostPreview: React.FC<PostPreviewProps> = ({ post }) => {
  const isAEspecialPost = post.tags.some((tag) =>
    tag.toLowerCase().includes("especial")
  );
  const bgBorderColor = isAEspecialPost
    ? "border-yellow-500"
    : "border-darkGreen";
  return (
    <div
      className={`border-2 ${bgBorderColor} hover:border-lightGreen rounded-lg overflow-hidden hover:scale-105 transform transition-transform`}
    >
      <Link href={`/blog/posts/${post.slug}`}>
        <Image
          width={500}
          height={500}
          src={post.preview}
          alt={post.title}
          className="w-full h-80 object-cover"
          priority={true}
        />
        {isAEspecialPost && (
          <div className="p-4 absolute bottom-0 bg-gray-900/70 w-full">
            <h2 className="text-xl font-semibold">
              {post.title}
              <p className="text-sm text-yellow-500">✨ Edición Especial</p>
            </h2>
            <p className="text-gray-300 text-sm mt-2">📅 {post.date}</p>
          </div>
        )}

        {!isAEspecialPost && (
          <div className="p-4 absolute bottom-0 bg-gray-900/60 w-full">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-400 text-sm mt-2">📅 {post.date}</p>
          </div>
        )}
      </Link>
    </div>
  );
};

export { PostPreview };
