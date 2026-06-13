import { tesloApi } from "@/api/tesloApi";
import type { Product } from "@/interfaces/product.interface";

// Partial es un utility type que hace todas las props opcionales (en este caso por que no tenemos el id ya que estamos creando un producto)
export const createUpdateProductAction = async (
  productLike: Partial<Product>,
): Promise<Product> => {
  // Pa que regresa el product ????

  // Hay que saber si actualizamos o editamos (extraemos props que no usamos y el resto se queda en el spread)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, user, images = [], ...rest } = productLike;

  const isCreating = id === "new";

  // Convertimos los valores a numeros (para mas sanitizacion)
  rest.stock = Number(rest.stock || 0);
  rest.price = Number(rest.price || 0);

  // No ocupamos mandar toda la data, el backend actualiza lo que le mande
  const { data } = await tesloApi<Product>({
    url: isCreating ? "/products" : `/products/${id}`,
    method: isCreating ? "POST" : "PATCH",
    data: rest, // Crear y editar no manda ni el user ni las imagenes
  });

  return {
    ...data,
    images: data.images.map((image) => {
      if (image.includes("http") || image.includes("https")) return image;
      return `${import.meta.env.VITE_API_URL}/files/product/${image}`;
    }),
  };
};
