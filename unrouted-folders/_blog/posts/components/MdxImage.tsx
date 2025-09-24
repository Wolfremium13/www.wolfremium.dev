"use client";
import React from "react";
import Image from "next/image";

interface MdxImageProps extends React.HTMLAttributes<HTMLElement> {
    src: string;
    alt: string;
}

export const MdxImage: React.FC<MdxImageProps> = (
    {
        src,
        alt,
        className,
        ...rest
    }) => {
    return (
        <div className={`flex justify-center m-4 ${className ?? ""}`} {...rest}>
            <Image
                width={500}
                height={500}
                src={src}
                alt={alt}
                className="rounded-lg"
            />
        </div>
    );
};
