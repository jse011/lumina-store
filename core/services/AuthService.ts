import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User 
} from "firebase/auth";
import { auth, googleProvider } from "@/core/lib/firebase";

export const AuthService = {
  /**
   * Inicia sesión con Google
   */
  async loginWithGoogle(): Promise<User> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      console.error("Error in loginWithGoogle:", error);
      throw error;
    }
  },

  /**
   * Cierra la sesión
   */
  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error in logout:", error);
      throw error;
    }
  },

  /**
   * Se suscribe a los cambios del estado de autenticación
   */
  subscribeToAuthChanges(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }
};
