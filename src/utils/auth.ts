import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { FirebaseError } from "firebase/app";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

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

export const parseAuthErrorMessage = (error: unknown): string => {
  if (error instanceof FirebaseError) {
    return (
      AUTH_ERROR_MESSAGES[error.code] ??
      "Authentication failed. Please try again."
    );
  }
  return "Unexpected error occurred.";
};

export const signUpWithEmailAndPassword = async (
  username: string,
  email: string,
  password: string
): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
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

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateDoc(doc(db, "users", userCredential.user.uid), {
    lastLogin: serverTimestamp(),
  });

  return userCredential.user;
};
