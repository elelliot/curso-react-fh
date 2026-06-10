import type { User } from "@/interfaces/user.interface";

// Login, Register, CheckStatus (para refrescar token enviando el current token)
export interface AuthResponse {
  user: User;
  token: string;
}
