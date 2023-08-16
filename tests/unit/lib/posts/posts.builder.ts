import { Post } from "@/lib/posts/domain/post";

export class PostBuilder {
  private _title: string = "irrelevant title";
  private _slug: string = "irrelevant-slug";
  private _date: string = "irrelevant date";
  private _preview: string = "irrelevant preview";
  private _tags: string[] = [];
  private _content?: string;
  private _mdxSource?: any;

  title(title: string): PostBuilder {
    this._title = title;
    return this;
  }

  slug(slug: string): PostBuilder {
    this._slug = slug;
    return this;
  }

  date(date: string): PostBuilder {
    this._date = date;
    return this;
  }

  preview(preview: string): PostBuilder {
    this._preview = preview;
    return this;
  }

  tags(tags: string[]): PostBuilder {
    this._tags = tags;
    return this;
  }

  content(content: string): PostBuilder {
    this._content = content;
    return this;
  }

  mdxSource(mdxSource: any): PostBuilder {
    this._mdxSource = mdxSource;
    return this;
  }

  build(): Post {
    return {
      title: this._title,
      slug: this._slug,
      date: this._date,
      preview: this._preview,
      tags: this._tags,
      content: this._content,
      mdxSource: this._mdxSource,
    };
  }
}
