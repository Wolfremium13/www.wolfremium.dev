import {FileToBeSaved} from "./file-to-be-saved"

describe("File to be saved should", () => {
  it("be created", () => {
    const content = "file"
    const fileName = "name.jpeg"

    const file = FileToBeSaved.create(content, fileName)

    expect(file.Content()).toEqual(Buffer.from(content, "base64"))
    expect(file.Name()).toEqual("name")
    expect(file.Extension()).toEqual("jpeg")
  })

  it("not allow missing file", () => {
    expect(() => FileToBeSaved.create("", "file.jpg")).toThrow("Content is required")
  })

  it("not allow missing file name", () => {
    expect(() => FileToBeSaved.create("file", "")).toThrow("File name is required")
  })

  it("not allow file name with more than one dot", () => {
    expect(() => FileToBeSaved.create("file", "file.name.jpg")).toThrow("File name must have only one dot")
  })
})
