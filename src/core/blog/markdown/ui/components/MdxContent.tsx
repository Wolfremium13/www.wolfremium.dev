"use client";
import {MDXRemote, MDXRemoteSerializeResult} from "next-mdx-remote";
import {CustomMDXComponents} from "@/core/blog/markdown/ui/components/CustomMDXComponents";

export default function MdxContent({serializedContent}: { serializedContent: MDXRemoteSerializeResult; }) {
    // It's wrapped because MDXRemote uses react hooks internally
    return <MDXRemote {...serializedContent} components={CustomMDXComponents} />;
}
