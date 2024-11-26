export class FilePath {
  private constructor(private readonly path: string) {
  }

  static create(value: string): FilePath {
    return new FilePath(value)
  }

  value(): string {
    return this.path + "/"
  }
}
