import { create } from "zustand";
import { loginAction } from "../actions/login.action";
import type { User } from "@/interfaces/user.interface";

type AuthStatus = "authenticated" | "not-authenticated" | "checking";

// Con el type declaramos la estructura del state
type AuthState = {
  // Properties
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;

  // Getters (computed values)
  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

// Funcion que retorna otra funcion y la invoca, entre el 'set' y retorna un object, ahi es donde declaramos el state. 'set' es como el setState (?)
export const useAuthStore = create<AuthState>()((set) => ({
  // tambien tenemos un 'get' que podemos llamar -> 'get().user'
  // Implementacion del store
  user: null,
  token: null,
  authStatus: "checking",

  // Actions
  login: async (email, password) => {
    try {
      const data = await loginAction(email, password);
      localStorage.setItem("token-teslo", data.token);

      // Guardamos en el state
      set({ user: data.user, token: data.token });
      return true;
    } catch {
      // get().logout() // Podriamos hacer esto
      localStorage.removeItem("token-teslo");
      set({ user: null, token: null }); //Borramos el local storage
      return false;
    }
  },
  logout: () => {
    localStorage.removeItem("token-teslo");
    set({ user: null, token: null });
  },
}));
