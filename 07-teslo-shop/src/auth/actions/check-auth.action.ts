import { tesloApi } from "@/api/tesloApi";
import type { AuthResponse } from "../interfaces/auth.response";

export const checkAuthAction = async (): Promise<AuthResponse> => {
  // Checamos si hay token en local storage
  const token = localStorage.getItem("token-teslo");
  // Si no hay token, hay error y hay que loguearse
  if (!token) throw new Error("No token found");

  try {
    // Validamos el token y si resuelve correctamente, lo seteamos de nuevo en local storage y retornamos `user data`
    const { data } = await tesloApi.get<AuthResponse>("/auth/check-status");
    localStorage.setItem("token-teslo", data.token);

    return data;
  } catch {
    // Si truena `check-status` es por que el token estaba expirado o era invalido, asi que borramos lo que sea que este guardado y hay que loguearse
    localStorage.removeItem("token-teslo");
    throw new Error("Token Expired or not valid");
  }
};
