export interface FirebaseAdminConfig {
    projectId: string
    privateKey: string
    clientEmail: string
}

export class FirebaseAdminEnvironmentConfig implements FirebaseAdminConfig {
    private constructor(
        public readonly projectId: string,
        public readonly privateKey: string,
        public readonly clientEmail: string,
        public readonly storageBucket: string
    ) {
    }

    static create() {
        const projectId = process.env.FIREBASE_PROJECT_ID ??
            (() => {
                throw new Error("FIREBASE_PROJECT_ID not found");
            })();
        const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') ??
            (() => {
                throw new Error("FIREBASE_PRIVATE_KEY not found");
            })();
        const clientEmail = process.env.FIREBASE_CLIENT_EMAIL ??
            (() => {
                throw new Error("FIREBASE_CLIENT_EMAIL not found");
            })();
        const storageBucket = process.env.FIREBASE_STORAGE_BUCKET ??
            (() => {
                throw new Error("FIREBASE_STORAGE_BUCKET not found");
            })();

        return new FirebaseAdminEnvironmentConfig(projectId, privateKey, clientEmail, storageBucket);
    }
}