import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import readingTime from "reading-time";
import mdxPrism from "mdx-prism";

const root = process.cwd();

export const getFiles = () => fs.readdirSync(path.join(root, "data", "posts"));

export const getFilesBySlug = async (slug) => {
  const mdxSource = slug
    ? fs.readFileSync(path.join(root, "data", "post", `${slug}.mdx`), "utf8")
    : fs.readFileSync(path.join(root, "data", `${slug}.mdx`), "utf8");

  const { data, content } = matter(mdxSource);

  const source = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [require("remark-code-titles")],
      rehypePlugins: [mdxPrism],
    },
  });

  return {
    source,
    frontmatter: {
      readingTime: readingTime(content),
      slug: slug || null,
      ...data,
    },
  };
};

export const getAllFilesMetadata = () => {
  const files = getFiles();

  return files.reduce((allPosts, postSlug) => {
    console.log(postSlug);
    const mdxSource = fs.readFileSync(
      path.join(root, "data", "posts",postSlug),
      "utf8"
    );

    const { data } = matter(mdxSource);

    return [{ ...data, slug: postSlug.replace(".mdx", "") }, ...allPosts];
  }, []);
};
