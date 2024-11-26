import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";
import { FirebaseConfig } from "./firebase-config";
import { Auth, getAuth } from "firebase/auth";

export interface FirebaseAdapter {
  app: FirebaseApp;
  firestore: Firestore;
  storage: FirebaseStorage;
  auth: Auth;
}

export class FirebaseAdapterInitializer {
  // TODO: review emulators from firebase and how to use them in the tests
  static create(config: FirebaseConfig): FirebaseAdapter {
    const app = initializeApp(config);
    const firestore = getFirestore(app);
    const storage = getStorage(app);
    const auth = getAuth(app);
    return { app, firestore, storage, auth };
  }
}
