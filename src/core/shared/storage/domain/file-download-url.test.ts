import {FileDownloadUrl} from "./file-download-url"

describe("File Download Url should", () => {
  it("be created", () => {
    const fileDownloadUrl = FileDownloadUrl.create("url");

    expect(fileDownloadUrl.url).toEqual("url");
  });

  it("not allow empty", () => {
    expect(() => FileDownloadUrl.create("")).toThrow("The url is required");
  });
})
