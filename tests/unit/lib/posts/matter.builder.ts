export class MatterMockBuilder {
  private data = {
    title: "Default Title",
    date: "2023-08-16",
    preview: "Default Preview",
    tags: ["default-tag"],
  };

  private content = "Default Content";
  private orig = Buffer.from("Default Content");
  private language = "markdown";
  private matter = "---";
  private stringifyFn = (lang: string) => this.content;

  withData(data: {
    title?: string;
    date?: string;
    preview?: string;
    tags?: string[];
  }) {
    if (data.title) this.data.title = data.title;
    if (data.date) this.data.date = data.date;
    if (data.preview) this.data.preview = data.preview;
    if (data.tags) this.data.tags = data.tags;
    return this;
  }

  withContent(content: string) {
    this.content = content;
    return this;
  }

  withOrig(orig: Buffer) {
    this.orig = orig;
    return this;
  }

  withLanguage(language: string) {
    this.language = language;
    return this;
  }

  withMatter(matter: string) {
    this.matter = matter;
    return this;
  }

  withStringifyFn(fn: (lang: string) => string) {
    this.stringifyFn = fn;
    return this;
  }

  build() {
    return {
      data: this.data,
      content: this.content,
      orig: this.orig,
      language: this.language,
      matter: this.matter,
      stringify: this.stringifyFn,
    };
  }
}
