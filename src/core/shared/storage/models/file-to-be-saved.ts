import {InvalidParameterException, MissingParameterException} from "@/core/shared/exceptions";

export class FileToBeSaved {
  private constructor(
    private readonly content: string,
    private readonly fileName: string,
  ) {
  }

  static create(
    content: string,
    fileName: string
  ): FileToBeSaved {
    if (!content) {
      throw new MissingParameterException("Content is required")
    }
    if (!fileName) {
      throw new MissingParameterException("File name is required")
    }
    if (fileName.split(".").length !== 2) {
      throw new InvalidParameterException("File name must have only one dot")
    }
    return new FileToBeSaved(content, fileName)
  }

  Content(): Buffer {
    return Buffer.from(this.content, "base64")
  }

  Name(): string {
    return this.fileName.split(".")[0]
  }

  Extension(): string {
    return this.fileName.split(".")[1]
  }
}
