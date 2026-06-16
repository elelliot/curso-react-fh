import { tesloApi } from "@/api/tesloApi";
import { sleep } from "@/lib/sleep";
import type { Product } from "@/interfaces/product.interface";

// La respuesta al subir un file
export interface FileUploadResponse {
  secureUrl: string;
  fileName: string;
}

// Partial es un utility type que hace todas las props opcionales (en este caso por que no tenemos el id ya que estamos creando un producto)
export const createUpdateProductAction = async (
  productLike: Partial<Product> & { files?: File[] },
): Promise<Product> => {
  await sleep(1500);

  // Hay que saber si actualizamos o editamos (extraemos props que no usamos y el resto se queda en el spread)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, user, images = [], files = [], ...rest } = productLike;

  const isCreating = id === "new";

  // Convertimos los valores a numeros (para mas sanitizacion)
  rest.stock = Number(rest.stock || 0);
  rest.price = Number(rest.price || 0);

  // Preparar las imagenes para subirlas
  if (files.length > 0) {
    const newImageNames = await uploadFiles(files);
    images.push(...newImageNames); // NOTE: Si el producto ya tenia imagenes, esas aún tienen la URL...
  }

  // Quitamos URL de la imagen (las que lo tengan)
  const imagesToSave = images.map((image) => {
    if (image.includes("http") || image.includes("https")) {
      return image.split("/").pop() || "";
    }
    return image;
  });

  // No ocupamos mandar toda la data, el backend actualiza lo que le mande
  const { data } = await tesloApi<Product>({
    url: isCreating ? "/products" : `/products/${id}`,
    method: isCreating ? "POST" : "PATCH",
    data: {
      ...rest,
      images: imagesToSave, // Para este punto, solo actualizamos el array de imagenes con las que YA subimos
    }, // Crear y editar no manda ni el user ni las imagenes (aqui ya enviamos las imagenes creadas desde el backend)
  });

  return {
    ...data,
    images: data.images.map((image) => {
      if (image.includes("http") || image.includes("https")) return image;
      return `${import.meta.env.VITE_API_URL}/files/product/${image}`;
    }),
  };
};

// Retornamos los nombres de los archivos al subirlos
export const uploadFiles = async (files: File[]) => {
  // Por cada file, subimos al backend y obtenemos un array de promises
  const uploadPromises = files.map(async (file) => {
    const formData = new FormData();
    // Asi se llama en el backend `file` por eso lo ponemos asi
    formData.append("file", file);

    const { data } = await tesloApi<FileUploadResponse>({
      url: "/files/product",
      method: "POST",
      data: formData,
    });

    return data.fileName;
  });

  // En cuanto una falle, tiramos error
  const uploadedFileNames = await Promise.all(uploadPromises);
  return uploadedFileNames;
};
