import {PostsManagementController} from "@/core/blog/posts/controller/posts.management.controller";
import {SerializerFactory} from "@/core/blog/markdown/serializer.factory";
import {PostManagementService} from "@/core/blog/posts/use-case/post-management-service";
import {FirebasePostRepository} from "@/core/blog/posts/repository/firebase-post-repository";
import {FirebaseAdapterFactory} from "@/core/shared/firebase/firebase-adapter-factory";
import {ConsoleLoggerFactory} from "@/core/shared/logging/console-logger-factory";
import {PostAuthenticationService} from "@/core/blog/posts/use-case/post-authentication-service";
import {JwtFactory} from "@/core/shared/auth/jwt-factory";

export class PostsManagementControllerFactory {
    static create() {
        const adapter = FirebaseAdapterFactory.create();
        const logger = ConsoleLoggerFactory.create();
        const postRepository = new FirebasePostRepository(adapter, logger);
        const postManagement = new PostManagementService(postRepository);
        const serializer = SerializerFactory.create();
        const jwtApi = JwtFactory.create();
        const postAuth = new PostAuthenticationService(jwtApi, logger);
        return new PostsManagementController(postManagement, postAuth, serializer);
    }
}