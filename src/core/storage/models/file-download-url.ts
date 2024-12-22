import {MissingParameterException} from "@/core/exceptions/exceptions";

export class FileDownloadUrl {
  private constructor(public readonly url: string) {
  }

  static create(url: string): FileDownloadUrl {
    if (!url) {
      throw new MissingParameterException("The url is required");
    }
    return new FileDownloadUrl(url);
  }
}
