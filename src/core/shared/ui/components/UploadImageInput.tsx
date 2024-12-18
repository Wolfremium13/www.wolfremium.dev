"use client"
import React, {useCallback, useEffect, useRef, useState} from "react"
import {useUploadImage} from "@/core/blog/images/ui/hooks/use.upload.image";
import {GiGamepadCross, GiImbricatedArrows} from "react-icons/gi";

interface UploadImageInputProps {
    value: string | undefined
    placeholder?: string
    onChange?: (value: string) => void
}

export const UploadImageInput: React.FC<UploadImageInputProps> = (
    {
        value: defaultValue = "",
        placeholder = "",
        onChange = () => {
        },
    }) => {
    const [value, setValue] = useState<string>(defaultValue)
    const inputFileRef = useRef<HTMLInputElement>(undefined as any)
    const {fileUrl, isLoading, upload} = useUploadImage()

    useEffect(() => updateImage(fileUrl), [fileUrl])
    useEffect(() => updateImage(value), [value])

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.item(0)) {
            const fileToUpload = event.target.files.item(0)

            if (fileToUpload) await upload(fileToUpload)
        }
    }

    const handleIconClick = () => {
        updateImage("")
        inputFileRef.current?.click()
    }

    const updateImage = useCallback((value: string = "") => {
        setValue(value)
        onChange(value)
    }, [onChange])

    return (
        <div className="rounded overflow-hidden border border-darkGreen">
            {isLoading && (
                <div className="w-96 h-96 bg-neutral-mid-light flex items-center justify-center cursor-pointer
                     hover:bg-opacity-25 transition-colors duration-300 ease-in-out"
                >
                    <GiImbricatedArrows className="w-8 h-8 text-primary animate-spin"/>
                </div>
            )}
            {value === "" && !isLoading && (
                <div
                    onClick={handleIconClick}
                    className="w-96 h-96 bg-primary-dark flex flex-col items-center justify-center cursor-pointer
                     hover:bg-primary transition-colors duration-300 ease-in-out"
                >
                    <GiGamepadCross className="w-20 h-20 text-neutral-light text-opacity-40"/>
                    {placeholder &&
                        <figcaption className="text-neutral-light text-opacity-40 text-sm">{placeholder}</figcaption>}
                </div>
            )}
            {value.length > 0 && !isLoading && (
                <figure
                    onClick={handleIconClick}
                    className="w-96 h-96 bg-neutral-mid-light flex items-center justify-center cursor-pointer relative"
                >
                    <div className="absolute inset-0 opacity-0 flex flex-col items-center justify-center cursor-pointer z-10
                          bg-neutral-mid-light hover:opacity-80 transition-opacity duration-300 ease-in-out">
                        <GiGamepadCross className="w-20 h-20 text-neutral bg-opacity-40"/>
                        {placeholder && <figcaption className="text-neutral text-sm">{placeholder}</figcaption>}
                    </div>
                    <img src={value} alt="Image" className="w-full h-full object-cover"/>
                </figure>
            )}
            <input
                ref={inputFileRef}
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept="image/png,image/jpeg,image/jpg,image/svg+xml"
            />
        </div>
    )
}
