import {MarkdownSerializer} from "@/core/blog/markdown/markdown.serializer";
import {Serializer} from "@/core/blog/markdown/serializer";

export class SerializerFactory {
    static create(): Serializer {
        return new MarkdownSerializer();
    }
}