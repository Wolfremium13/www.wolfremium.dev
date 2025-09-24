import {UploadImage} from "@/app/api/admin/blog/upload-image/use-case/upload-image";
import {FileToBeSaved} from "@/core/storage/models/file-to-be-saved";
import {ClientSideException} from "@/core/exceptions/exceptions";
import {JwtToken} from "@/core/auth/models/jwt-token";
import {PostAuthentication} from "@/app/api/admin/blog/posts/use-case/post-authentication";

export class UploadPostImageController {
    constructor(
        private readonly uploadImage: UploadImage,
        private readonly postAuth: PostAuthentication,
    ) {
    }

    async post(request: Request): Promise<Response> {
        try {
            const token = JwtToken.fromAuthRequest(request);
            await this.postAuth.authenticate(token);
            const data = await request.json();
            const fileToBeSaved = FileToBeSaved.create(data.file, data.fileName);
            const postImageUrl = await this.uploadImage.upload(fileToBeSaved);
            return new Response(JSON.stringify({url: postImageUrl.value()}), {status: 201});
        } catch (error) {
            if (error instanceof ClientSideException) {
                return new Response(error.message, {status: 500});
            }

            if (error instanceof Error) {
                return new Response(error.message, {status: 500});
            }
            return new Response("An error occurred while uploading an image for post", {status: 500});
        }
    };
}