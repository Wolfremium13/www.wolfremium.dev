import {Section} from "@/app/shared/components/Section";
import {Title} from "@/app/shared/components/Title";
import {CreatePost} from "@/app/admin/blog/create/components/CreatePost";

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