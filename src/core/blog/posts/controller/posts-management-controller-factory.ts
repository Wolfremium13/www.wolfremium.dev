import {PostManagementService} from "@/core/blog/posts/use-case/post-management-service";
import {FirebasePostRepository} from "@/core/blog/posts/repository/firebase-post-repository";
import {ConsoleLoggerFactory} from "@/core/shared/logging/console-logger-factory";
import {PostAuthenticationService} from "@/core/blog/posts/use-case/post-authentication-service";
import {JwtWebFactory} from "@/core/shared/auth/jwt-web-factory";
import {PostsManagementController} from "@/core/blog/posts/controller/posts-management-controller";
import {FirebaseAdminAdapterFactory} from "@/core/shared/firebase/firebase-admin-adapter-factory";
import {TimeManagerFactory} from "@/core/shared/time-manager/time-manager-factory";

export class PostsManagementControllerFactory {
    static create() {
        const adapter = FirebaseAdminAdapterFactory.create();
        const logger = ConsoleLoggerFactory.create();
        const postRepository = new FirebasePostRepository(adapter, logger);
        const postManagement = new PostManagementService(postRepository);
        const jwtApi = JwtWebFactory.create();
        const postAuth = new PostAuthenticationService(jwtApi, logger);
        const timeManager = TimeManagerFactory.create();
        return new PostsManagementController(postManagement, postAuth, timeManager);
    }
}