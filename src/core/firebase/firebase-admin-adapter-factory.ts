import {FirebaseAdminEnvironmentConfig} from "@/core/firebase/firebase-admin-config";
import {FirebaseAdminAdapterInitializer} from "@/core/firebase/firebase-admin-adapter";

export class FirebaseAdminAdapterFactory {
    static create() {
        const config = FirebaseAdminEnvironmentConfig.create();
        return FirebaseAdminAdapterInitializer.create(config);
    }
}