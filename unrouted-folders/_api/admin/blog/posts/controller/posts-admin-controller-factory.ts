import {PostManagementService} from "@/app/api/admin/blog/posts/use-case/post-management-service";
import {FirebasePostRepository} from "@/app/api/admin/blog/posts/repository/firebase-post-repository";
import {ConsoleLoggerFactory} from "@/core/logging/console-logger-factory";
import {PostAuthenticationService} from "@/app/api/admin/blog/posts/use-case/post-authentication-service";
import {JwtWebFactory} from "@/core/auth/jwt-web-factory";
import {PostsAdminController} from "@/app/api/admin/blog/posts/controller/posts-admin-controller";
import {FirebaseAdminAdapterFactory} from "@/core/firebase/firebase-admin-adapter-factory";
import {TimeManagerFactory} from "@/core/time-manager/time-manager-factory";

export class PostsAdminControllerFactory {
    static create() {
        const adapter = FirebaseAdminAdapterFactory.create();
        const logger = ConsoleLoggerFactory.create();
        const postRepository = new FirebasePostRepository(adapter, logger);
        const postManagement = new PostManagementService(postRepository);
        const jwtApi = JwtWebFactory.create();
        const postAuth = new PostAuthenticationService(jwtApi, logger);
        const timeManager = TimeManagerFactory.create();
        return new PostsAdminController(postManagement, postAuth, timeManager);
    }
}