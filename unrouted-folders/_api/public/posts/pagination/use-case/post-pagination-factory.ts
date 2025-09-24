import {PostPaginationService} from "@/app/api/public/posts/pagination/use-case/post-pagination-service";
import {FirebasePostRepository} from "@/app/api/admin/blog/posts/repository/firebase-post-repository";
import {FirebaseAdminAdapterFactory} from "@/core/firebase/firebase-admin-adapter-factory";
import {ConsoleLoggerFactory} from "@/core/logging/console-logger-factory";

export class PostPaginationFactory {
    static create() {
        const adapter = FirebaseAdminAdapterFactory.create();
        const logger = ConsoleLoggerFactory.create();
        const postRepository = new FirebasePostRepository(adapter, logger);
        return new PostPaginationService(postRepository);
    }
}