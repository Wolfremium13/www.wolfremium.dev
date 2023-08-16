import { PostsLocalRepository } from "@/lib/posts/infrastructure/posts.local.repository";
import { vi, describe, it, beforeEach, afterEach, expect } from "vitest";
import { PostBuilder } from "./posts.builder";
import fs from "fs";
import matter, { Input } from "gray-matter";
import { MatterMockBuilder } from "./matter.builder";
import { serialize } from "next-mdx-remote/serialize";

describe("Posts local repository should", () => {
  const POSTS_PER_PAGE = 9;
  let repo: PostsLocalRepository;
  let mockedMatter: jest.MockedFunction<typeof matter>;

  beforeEach(() => {
    repo = new PostsLocalRepository();
    vi.mock("fs");
    vi.mock("path");
    vi.mock("gray-matter");
    vi.mock("next-mdx-remote/serialize");
    mockedMatter = matter as jest.MockedFunction<typeof matter>;
  });

  afterEach(() => {
    vi.resetAllMocks();
    vi.resetModules();
  });

  describe("get posts", () => {
    const postPaths = ["post1.mdx", "post2.mdx"];
    it("gives all posts", async () => {
      (fs.readdirSync as jest.Mock).mockReturnValue(postPaths);
      (fs.readFileSync as jest.Mock).mockReturnValue(undefined);
      mockedMatter.mockImplementation(
        (input: Input | { content: Input }, options?: any) => {
          return new MatterMockBuilder().build();
        }
      );

      const posts = await repo.getPosts();

      expect(posts.length).toBe(postPaths.length);
    });

    it("gives all posts sorted by date", async () => {
      const recentDate = "2020-01-01";
      const olderDate = "2019-02-21";
      (fs.readdirSync as jest.Mock).mockReturnValue(postPaths);
      (fs.readFileSync as jest.Mock)
        .mockImplementationOnce(() =>
          JSON.stringify(
            new PostBuilder().date(olderDate).content("irrelevant").build()
          )
        )
        .mockImplementationOnce(() =>
          JSON.stringify(
            new PostBuilder().date(recentDate).content("irrelevant").build()
          )
        );
      mockedMatter
        .mockImplementationOnce(() =>
          new MatterMockBuilder().withData({ date: olderDate }).build()
        )
        .mockImplementationOnce(() =>
          new MatterMockBuilder().withData({ date: recentDate }).build()
        );

      const posts = await repo.getPosts();

      expect(new Date(posts[0].date).getTime()).toBeGreaterThan(
        new Date(posts[1].date).getTime()
      );
    });

    it("gives all posts with title", async () => {
      const title = "post1";
      (fs.readdirSync as jest.Mock).mockReturnValue(postPaths);
      (fs.readFileSync as jest.Mock).mockReturnValue(undefined);
      mockedMatter.mockImplementation(
        (input: Input | { content: Input }, options?: any) => {
          return new MatterMockBuilder().withData({ title }).build();
        }
      );

      const posts = await repo.getPosts();

      expect(posts[0].title).toBe(title);
    });

    it("gives empty if there is no supported files", async () => {
      (fs.readdirSync as jest.Mock).mockReturnValue([]);

      const posts = await repo.getPosts();

      expect(posts.length).toBe(0);
    });
  });

  describe("get post", () => {
    it("filters by slug", async () => {
      const postTitle = "post1";
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readFileSync as jest.Mock).mockReturnValue(undefined);
      mockedMatter.mockImplementation(
        (input: Input | { content: Input }, options?: any) => {
          return new MatterMockBuilder().withData({ title: postTitle }).build();
        }
      );
      (serialize as jest.Mock).mockImplementationOnce(() => undefined);

      const post = await repo.getPost(postTitle);

      expect(post?.title).toBe(postTitle);
    });

    it("gives nothing if post does not exist", async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(false);

      const post = await repo.getPost("unknown-post");

      expect(post).toBeUndefined();
    });
  });

  describe("get total pages", () => {
    it("is empty if there is no posts", async () => {
      (fs.readdirSync as jest.Mock).mockReturnValue([]);

      const totalPages = await repo.getTotalPages();

      expect(totalPages).toBe(0);
    });

    it("have one page if lower or equal than the number of posts per page", async () => {
      (fs.readdirSync as jest.Mock).mockReturnValue(["post1.mdx"]);

      const totalPages = await repo.getTotalPages();

      expect(totalPages).toBe(1);
    });

    it("have more pages if major than the number of posts per page", async () => {
      const postPaths = Array.from(
        { length: POSTS_PER_PAGE + 1 },
        (_, index) => `post${index + 1}.mdx`
      );
      (fs.readdirSync as jest.Mock).mockReturnValue(postPaths);

      const totalPages = await repo.getTotalPages();

      expect(totalPages).toBe(Math.ceil(postPaths.length / POSTS_PER_PAGE));
    });
  });

  describe("get posts by page", () => {
    const allPosts = Array.from({ length: POSTS_PER_PAGE + 1 }, (_, index) =>
      new PostBuilder().title(`post${index + 1}`).build()
    );
    it("gives only the posts of the first page", async () => {
      const firstPage = 1;

      vi.spyOn(repo, "getPosts").mockResolvedValue(allPosts);

      const posts = await repo.getPaginatedPosts(firstPage);

      expect(posts.length).toBe(POSTS_PER_PAGE);
    });

    it("gives only the posts of other pages", async () => {
      const secondPage = 2;

      vi.spyOn(repo, "getPosts").mockResolvedValue(allPosts);

      const posts = await repo.getPaginatedPosts(secondPage);

      expect(posts.length).toBeLessThanOrEqual(
        allPosts.length - POSTS_PER_PAGE
      );
    });
  });

  describe("get all file paths", () => {
    it("gives all file paths", async () => {
      const postPaths = ["post1.mdx", "post2.mdx"];
      (fs.readdirSync as jest.Mock).mockReturnValue(postPaths);

      const paths = await repo.getAllFilePaths();

      expect(paths.length).toBe(postPaths.length);
    });

    it("gives empty if there is no supported files", async () => {
      (fs.readdirSync as jest.Mock).mockReturnValue(["file1.txt", "file2.txt"]);

      const paths = await repo.getAllFilePaths();

      expect(paths.length).toBe(0);
    });

    it("gives empty if there is no files", async () => {
        (fs.readdirSync as jest.Mock).mockReturnValue([]);
    
        const paths = await repo.getAllFilePaths();
    
        expect(paths.length).toBe(0);
        }
    );
    
  });
});
