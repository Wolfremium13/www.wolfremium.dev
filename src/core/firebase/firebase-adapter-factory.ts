import {FireBaseEnvironmentConfig} from "@/core/firebase/firebase-config";
import {FirebaseAdapter, FirebaseAdapterInitializer} from "@/core/firebase/firebase-adapter";

export class FirebaseAdapterFactory {
  static create(): FirebaseAdapter {
    const config = FireBaseEnvironmentConfig.create();
    return FirebaseAdapterInitializer.create(config);
  }
}
