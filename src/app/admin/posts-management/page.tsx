"use client";
import {Title} from "@/core/shared/ui/components/Title";
import {PostList} from "@/core/blog/posts/ui/components/PostList";
import {Section} from "@/core/shared/ui/components/Section";

export default function PostsManagementPage() {
    return (
        <Section>
            <div className="flex flex-col gap-4 mt-8">
                <header>
                    <Title as="h1" size="lg">Administrador de Posts</Title>
                </header>
                <section>
                    <PostList/>
                </section>
            </div>
        </Section>

    )
}
