import {PostsPaginationController} from "@/core/blog/pagination/controller/posts-pagination-controller";
import {PostPaginationService} from "@/core/blog/pagination/use-case/post-pagination-service";
import {FirebasePostRepository} from "@/core/blog/posts/repository/firebase-post-repository";
import {FirebaseAdminAdapterFactory} from "@/core/shared/firebase/firebase-admin-adapter-factory";
import {ConsoleLoggerFactory} from "@/core/shared/logging/console-logger-factory";

export class PostsPaginationControllerFactory {
    static create() {
        const firebaseAdapter = FirebaseAdminAdapterFactory.create();
        const logger = ConsoleLoggerFactory.create();
        const repository = new FirebasePostRepository(firebaseAdapter, logger);
        const postPaginationService = new PostPaginationService(repository);
        return new PostsPaginationController(postPaginationService);
    }
}