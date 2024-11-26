import {FireBaseEnvironmentConfig} from "@/core/shared/firebase/firebase-config";
import {FirebaseAdapter, FirebaseAdapterInitializer} from "@/core/shared/firebase/firebase-adapter";

export class FirebaseAdapterFactory {
  static create(): FirebaseAdapter {
    const config = FireBaseEnvironmentConfig.create();
    return FirebaseAdapterInitializer.create(config);
  }
}
