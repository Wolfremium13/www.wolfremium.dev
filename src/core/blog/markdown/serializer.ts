import {PostContent} from "@/core/blog/shared/models/post-content";
import {SerializedPost} from "@/core/blog/markdown/models/serialized.post";

export interface Serializer {
    serialize(content: PostContent): Promise<SerializedPost>;
}