import {FirebaseAdminEnvironmentConfig} from "@/core/shared/firebase/firebase-admin-config";
import {FirebaseAdminAdapterInitializer} from "@/core/shared/firebase/firebase-admin-adapter";

export class FirebaseAdminAdapterFactory {
    static create() {
        const config = FirebaseAdminEnvironmentConfig.create();
        return FirebaseAdminAdapterInitializer.create(config);
    }
}