export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export class FireBaseEnvironmentConfig implements FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;

  private constructor(
    apiKey: string,
    authDomain: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
    appId: string
  ) {
    this.apiKey = apiKey;
    this.authDomain = authDomain;
    this.projectId = projectId;
    this.storageBucket = storageBucket;
    this.messagingSenderId = messagingSenderId;
    this.appId = appId;
  }

  static create() {
    const apiKey =
      process.env.FIREBASE_API_KEY ??
      (() => {
        throw new Error("FIREBASE_API_KEY not found");
      })();
    const authDomain =
      process.env.FIREBASE_AUTH_DOMAIN ??
      (() => {
        throw new Error("FIREBASE_AUTH_DOMAIN not found");
      })();
    const projectId =
      process.env.FIREBASE_PROJECT_ID ??
      (() => {
        throw new Error("FIREBASE_PROJECT_ID not found");
      })();
    const storageBucket =
      process.env.FIREBASE_STORAGE_BUCKET ??
      (() => {
        throw new Error("FIREBASE_STORAGE_BUCKET not found");
      })();
    const messagingSenderId =
      process.env.FIREBASE_MESSAGING_SENDER_ID ??
      (() => {
        throw new Error("FIREBASE_MESSAGING_SENDER_ID not found");
      })();
    const appId =
      process.env.FIREBASE_APP_ID ??
      (() => {
        throw new Error("FIREBASE_APP_ID not found");
      })();

    return new FireBaseEnvironmentConfig(
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      messagingSenderId,
      appId
    );
  }
}
