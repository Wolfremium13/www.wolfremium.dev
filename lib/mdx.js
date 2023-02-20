import { serialize } from "next-mdx-remote/serialize";
import readingTime from "reading-time";
import { getNode, getAllNodes } from "next-mdx/server";

export const getAllFiles = async () => {
  let posts = await getAllNodes("post");
  posts.map((p) => (p.frontMatter["readingTime"] = readingTime(p.content)));
  return posts;
};

export const getFileBySlug = async (slug) => {
  let post = await getNode("post", slug);
  post.frontMatter["readingTime"] = readingTime(post.content);
  post.frontMatter["slug"] = post.url;
  const removeLinksRegex = /(\[.*?\])(\(.*?\))/g;
  const removeLineBreaks = /\n/g;
  post.frontMatter["description"] =
    post.content
      .replaceAll(removeLinksRegex, "")
      .replaceAll(removeLineBreaks, "")
      .split("")
      .slice(0, 150)
      .join("") + "...";
  console.log(post);
  post["serialize"] = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [require("remark-code-titles")],
      rehypePlugins: [require("mdx-prism")],
    },
  });

  return post;
};
