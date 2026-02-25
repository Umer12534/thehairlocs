import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const ADMIN_EMAILS = ["umer12345@gmail.com"];

export const getDefaultRoleByEmail = (email = "") => {
  const normalizedEmail = email.trim().toLowerCase();
  return ADMIN_EMAILS.includes(normalizedEmail) ? "admin" : "user";
};

export const resolveAndSyncUserRole = async (user) => {
  if (!user) return "user";

  const fallbackRole = getDefaultRoleByEmail(user.email || "");
  const userRef = doc(db, "users", user.uid);

  try {
    const snapshot = await getDoc(userRef);
    const existingRole = snapshot.exists() ? snapshot.data()?.role : undefined;

    if (fallbackRole === "admin" && existingRole !== "admin") {
      await setDoc(
        userRef,
        {
          email: user.email || "",
          role: "admin",
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      return "admin";
    }

    if (existingRole === "admin" || existingRole === "user") {
      return existingRole;
    }

    await setDoc(
      userRef,
      {
        email: user.email || "",
        role: fallbackRole,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    return fallbackRole;
  } catch (error) {
    return fallbackRole;
  }
};
