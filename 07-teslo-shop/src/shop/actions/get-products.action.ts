import { tesloApi } from "@/api/tesloApi";
import type { ProductsResponse } from "@/interfaces/products.response";

export const getProductsAction = async (): Promise<ProductsResponse> => {
  const { data } = await tesloApi<ProductsResponse>("/products");

  // Hay que agregar el URL a las imagenes de los productos
  const productsWithImageUrls = data.products.map((product) => ({
    ...product,
    images: product.images.map(
      (image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`,
    ),
  }));

  return { ...data, products: productsWithImageUrls };
};
