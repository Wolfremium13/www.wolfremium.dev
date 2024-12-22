import {FirebaseAdminAdapterFactory} from "@/core/firebase/firebase-admin-adapter-factory";
import {ConsoleLoggerFactory} from "@/core/logging/console-logger-factory";
import {FirebasePostRepository} from "@/app/api/admin/blog/posts/repository/firebase-post-repository";
import {PostManagementService} from "@/app/api/admin/blog/posts/use-case/post-management-service";

export class PostManagementServiceFactory {
    static create() {
        const adapter = FirebaseAdminAdapterFactory.create();
        const logger = ConsoleLoggerFactory.create();
        const postRepository = new FirebasePostRepository(adapter, logger);
        return new PostManagementService(postRepository);
    }
}