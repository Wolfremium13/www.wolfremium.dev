import {App, initializeApp} from 'firebase-admin/app';
import {Auth, getAuth} from "firebase-admin/auth";
import * as admin from 'firebase-admin';
import {FirebaseAdminEnvironmentConfig} from "@/core/firebase/firebase-admin-config";
import {Bucket} from "@google-cloud/storage";

export interface FirebaseAdminAdapter {
    adminApp: App;
    auth: Auth;
    firestore: FirebaseFirestore.Firestore;
    bucket: Bucket;
}

export class FirebaseAdminAdapterInitializer {
    private static savedAdminInstance: App;

    static create(config: FirebaseAdminEnvironmentConfig): FirebaseAdminAdapter {
        if (!admin.apps.length) {
            const adminApp = initializeApp(
                {
                    credential: admin.credential.cert(
                        {
                            projectId: config.projectId,
                            clientEmail: config.clientEmail,
                            privateKey: config.privateKey,
                        }
                    ),
                    storageBucket: config.storageBucket,
                },
            );
            this.savedAdminInstance = adminApp;
            const auth = getAuth(adminApp);
            const firestore = admin.firestore();
            const storage = admin.storage();
            const bucket = storage.bucket(config.storageBucket);
            return {adminApp, auth, firestore, bucket};
        }

        return {
            adminApp: this.savedAdminInstance,
            auth: getAuth(this.savedAdminInstance),
            firestore: admin.firestore(),
            bucket: admin.storage().bucket(config.storageBucket),
        };
    }
}
