import { useState } from "react"

export const useUploadImage = () => {
  const [fileUrl, setFileUrl] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getBase64Of = async (file: File): Promise<string> => new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onloadend = () => {
        const result = reader.result?.toString()

        if (!result) {
          reject(new Error("Error reading file"))
        } else {
          resolve(result.split(",")[1])
        }
      }

      reader.onerror = reject
      reader.readAsDataURL(file)
    })

  const handleUpload = async (file: File | undefined): Promise<string> => {
    setIsLoading(true)
    try {
      if (!file) {
        throw new Error("No file to upload")
      }

      const base64String = await getBase64Of(file)
      const response = await fetch("/api/posts/upload-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          file: base64String,
          fileName: file.name,
          mimeType: file.type,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message)
      }

      setFileUrl(data.url)
      setIsLoading(false)

      return data.url
    }
    catch (error) {
      setFileUrl(undefined)
      setIsLoading(false)
      throw error
    }
  }
  const handleCopy = () => {
    if (fileUrl) {
      navigator.clipboard.writeText(fileUrl)
    }
  }
  
  return { 
    fileUrl,
    isLoading,
    upload: handleUpload,
    copy: handleCopy,
  }
}
