import {SerializedPost} from "@/core/blog/markdown/models/serialized.post";
import {PostContent} from "@/core/blog/shared/models/post-content";
import {Serializer} from "@/core/blog/markdown/serializer";
import {serialize} from "next-mdx-remote/serialize";

export class MarkdownSerializer implements Serializer {
    async serialize(content: PostContent): Promise<SerializedPost> {
        const mdxSource = await serialize(content.value());
        return SerializedPost.create(mdxSource.compiledSource);
    }
}