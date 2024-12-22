"use client";
import {Title} from "@/app/shared/components/Title";
import {PostList} from "@/app/admin/blog/components/PostList";
import {Section} from "@/app/shared/components/Section";

export default function PostsManagementPage() {
    return (
        <div className={"md:mt-24 mt-12"}>
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
        </div>

    )
}
