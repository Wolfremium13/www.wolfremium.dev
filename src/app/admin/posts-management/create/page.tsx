import Section from "@/core/shared/ui/components/Section";
import {Title} from "@/core/shared/ui/components/Title";
import {CreatePost} from "@/core/blog/posts/ui/components/CreatePost";

export default function CreatePostPage() {
    return (
        <Section>
            <div className="flex flex-col gap-4 mt-16">
                <header>
                    <Title as="h1" size="lg">Blog</Title>
                </header>
                <section>
                    <CreatePost/>
                </section>
            </div>
        </Section>
    );
}