import { Post } from "@/lib/posts/domain/post";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GiWarlockEye } from "react-icons/gi";

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim()) {
        setIsDropdownVisible(true);
        try {
          const response = await fetch(`/api/posts?search=${searchTerm}`);
          const posts = await response.json();
          setPosts(posts);
        } catch (error) {
          console.error("Error fetching the posts", error);
          setPosts([]);
        }
      } else {
        setIsDropdownVisible(false);
        setPosts([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="relative text-white/80">
      <div className="flex justify-center space-x-2 items-center px-2 lg:px-4 focus:ring-2  focus:ring-lightGreen/80 text-lightGreen bg-darkViolet border border-darkGreen hover:border-lightGreen rounded-lg">
        <GiWarlockEye size={30}></GiWarlockEye>
        <input
          type="text"
          className="px-4 py-2 bg-darkViolet  focus:outline-none  "
          placeholder="Buscar posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {isDropdownVisible && (
        <ul className="absolute bg-gray-900/90 backdrop-blur-sm shadow-md max-h-80 overflow-y-auto border border-darkGreen hover:border-lightGreen rounded-lg">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="px-4 py-2 hover:bg-lightViolet border-b-2 border-lightGreen/40 hover:border-lightGreen/80"
            >
              <Link
                href={`/blog/posts/${post.slug}`}
                onClick={() => setSearchTerm("")}
              >
                <span>{post.title}</span>
                <p>📅 {post.date}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { SearchBar };
