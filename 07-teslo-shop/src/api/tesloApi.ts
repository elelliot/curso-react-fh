import axios from "axios";

const tesloApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// NOTE: Interceptors, configuramos para que la request tenga el token
// Los interceptors toman un config object y siempre hay que retornalo al final
tesloApi.interceptors.request.use((config) => {
  // Verificamos si hay un token...
  const token = localStorage.getItem("token-teslo");
  if (token) {
    // Incluimos el token en los headers de authorization, asi cada request de esta instancia de axios lo tendrá
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { tesloApi };
