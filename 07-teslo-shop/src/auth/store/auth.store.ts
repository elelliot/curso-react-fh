import { create } from "zustand";
import { loginAction } from "../actions/login.action";
import type { User } from "@/interfaces/user.interface";
import { checkAuthAction } from "../actions/check-auth.action";

type AuthStatus = "authenticated" | "not-authenticated" | "checking";

// Con el type declaramos la estructura del state
type AuthState = {
  // Properties
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;

  // Getters (computed values)
  isAdmin: () => boolean;

  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
};

// Funcion que retorna otra funcion y la invoca, entre el 'set' y retorna un object, ahi es donde declaramos el state. 'set' es como el setState (?)
export const useAuthStore = create<AuthState>()((set, get) => ({
  // tambien tenemos un 'get' que podemos llamar -> 'get().user'
  // Implementacion del store
  user: null,
  token: null,
  authStatus: "checking",

  // Getters
  isAdmin: () => {
    const roles = get().user?.roles || [];
    return roles?.includes("admin");
  },

  // Actions
  login: async (email, password) => {
    try {
      const data = await loginAction(email, password);
      localStorage.setItem("token-teslo", data.token);

      // Guardamos en el state
      set({ user: data.user, token: data.token, authStatus: "authenticated" });
      return true;
    } catch {
      // get().logout() // Podriamos hacer esto
      localStorage.removeItem("token-teslo");
      set({ user: null, token: null, authStatus: "not-authenticated" }); //Borramos el local storage
      return false;
    }
  },
  logout: () => {
    localStorage.removeItem("token-teslo");
    set({ user: null, token: null, authStatus: "not-authenticated" });
  },

  checkAuthStatus: async () => {
    try {
      const { user, token } = await checkAuthAction();
      set({
        user,
        token,
        authStatus: "authenticated",
      });

      return true;
    } catch (error) {
      console.error(error);
      set({
        user: undefined,
        token: undefined,
        authStatus: "not-authenticated",
      });

      return false;
    }
  },
}));
