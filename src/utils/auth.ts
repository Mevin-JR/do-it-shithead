import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { FirebaseError } from "firebase/app";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

/**
 * Maps firebase auth error codes to user friendly messages
 * Multiple codes may intentionally map to the same message
 *
 * TODO:
 * - Add i18n support if app becomes multi-lingual
 */
const AUTH_ERROR_MESSAGES: Record<string, string> = {
  "auth/email-already-exists": "This email is already in use",
  "auth/email-already-in-use": "This email is already in use",
  "auth/internal-error": "Internal error, please try again later",
  "auth/invalid-email": "Please enter a valid email",
  "auth/invalid-password": "Password must contain atleast 6 characters",
  "auth/weak-password": "Password must contain atleast 6 characters",
  "auth/invalid-credential": "Invalid email or password",
  "auth/user-mismatch": "Invalid email or password",
  "auth/user-not-found": "No account found with this email",
  "auth/user-disabled": "Account disabled by an administrator",
  "auth/too-many-requests": "Too many attempts, try again later",
  "auth/session-cookie-expired":
    "Session timeout, please restart and try again",
  "auth/timeout": "Operation timeout, please restart and try again",
  "auth/network-request-failed": "Request failed, please try again",
};

const DEFAULT_AVATAR_LINK: string = "/default-avatar.png";

/**
 * Converts firebase auth errors into user friendly messages
 *
 * NOTE:
 * - Accepts 'unknown' to safely handle non-firebase errors
 * - Falls back to a generic message for unmapped codes
 *
 * @param error Error thrown during authentication
 * @returns Safe, user friendly error message
 */
export const parseAuthErrorMessage = (error: unknown): string => {
  if (error instanceof FirebaseError) {
    return (
      AUTH_ERROR_MESSAGES[error.code] ??
      "Authentication failed. Please try again."
    );
  }
  return "Authentication failed. Please try again.";
};

/**
 * Creates a new user using email/password authentication
 * and initialize their profile in Firebase
 *
 * NOTE:
 * - Authentication is handled by Firebase Auth's `createUserWithEmailAndPassword()`
 * - Manually updates the user profile with the `username`
 * - Creates a curresponding Firestore `users` document
 * - Firestore write is required for a successful signup
 *
 * WARNING:
 * - If Firestore write fails, the Auth user will still exist
 * - Cleanup must be handled manually if needed
 *
 * @param username Display name for the user
 * @param email The user's email address
 * @param password The user's plain text password
 * @returns The created Firebase Auth user
 * @throws FirebaseError on authentication or Firestore failure
 */
export const signUpWithEmailAndPassword = async (
  username: string,
  email: string,
  password: string,
): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  await updateProfile(userCredential.user, {
    displayName: username,
  });

  await setDoc(doc(db, "users", userCredential.user.uid), {
    uid: userCredential.user.uid,
    username,
    email,
    createdAt: serverTimestamp(),
    lastLogin: serverTimestamp(),
    emailVerified: userCredential.user.emailVerified,
    userIcon: DEFAULT_AVATAR_LINK,
  });

  return userCredential.user;
};

/**
 * Logs in an existing user using email/password authentication
 * and update their `lastLogin` value in corresponding user document on Firestore
 *
 * WARNING:
 * - Login succeeds even if Firestore write fails
 *
 * @param email The user's email address
 * @param password The user's plain text password
 * @returns The logged in Firebase Auth user
 */
export const loginWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );

  await updateDoc(doc(db, "users", userCredential.user.uid), {
    lastLogin: serverTimestamp(),
  });

  return userCredential.user;
};

// FIXME: Create types dir and move exported types into it
export type UserDataType = {
  uid: string;
  email: string;
  userIcon: string;
  username: string;
  createdAt: string;
  emailVerified: boolean;
};

/**
 * Fetches the user's profile data from Firestore
 *
 * NOTE:
 * - Reads from the `users/{uid}` document
 * - Returned data is cast to `UserDataType` and assumes schema validity
 *
 * WARNING:
 * - Throws if user document does not exist
 *
 * @param uid Firebase Auth user `uid`
 * @returns User profile data stored in Firestore as `UserDataType`
 * @throws Error if user data is unavailable
 */
export const getUserData = async (uid: string): Promise<UserDataType> => {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) {
    throw new Error("User data unavailable, please retry");
  }

  return snap.data() as UserDataType;
};
