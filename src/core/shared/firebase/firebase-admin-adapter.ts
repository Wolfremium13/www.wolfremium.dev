import {App, initializeApp} from 'firebase-admin/app';
import {Auth, getAuth} from "firebase-admin/auth";
import * as admin from 'firebase-admin';
import {FirebaseAdminEnvironmentConfig} from "@/core/shared/firebase/firebase-admin-config";

export interface FirebaseAdminAdapter {
    adminApp: App;
    auth: Auth;
    firestore: FirebaseFirestore.Firestore;
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
                },
            );
            this.savedAdminInstance = adminApp;
            const auth = getAuth(adminApp);
            const firestore = admin.firestore();
            return {adminApp, auth, firestore};
        }

        return {
            adminApp: this.savedAdminInstance,
            auth: getAuth(this.savedAdminInstance),
            firestore: admin.firestore()
        };
    }
}
