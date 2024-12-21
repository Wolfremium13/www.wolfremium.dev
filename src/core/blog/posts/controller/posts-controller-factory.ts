import {PostsController} from "@/core/blog/posts/controller/posts-controller";
import {PostManagementService} from "@/core/blog/posts/use-case/post-management-service";
import {FirebaseAdminAdapterFactory} from "@/core/shared/firebase/firebase-admin-adapter-factory";
import {ConsoleLoggerFactory} from "@/core/shared/logging/console-logger-factory";
import {FirebasePostRepository} from "@/core/blog/posts/repository/firebase-post-repository";

export class PostsControllerFactory {
    static create() {
        const adapter = FirebaseAdminAdapterFactory.create();
        const logger = ConsoleLoggerFactory.create();
        const postRepository = new FirebasePostRepository(adapter, logger);
        return new PostsController(new PostManagementService(postRepository));
    }
}