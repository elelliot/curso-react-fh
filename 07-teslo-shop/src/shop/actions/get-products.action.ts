import { tesloApi } from "@/api/tesloApi";
import type { ProductsResponse } from "@/interfaces/products.response";

interface Options {
  limit?: number | string;
  offset?: number | string;
  sizes?: string;
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
  query?: string;
}

export const getProductsAction = async (
  options: Options,
): Promise<ProductsResponse> => {
  const { limit, offset, sizes, gender, minPrice, maxPrice, query } = options;

  const { data } = await tesloApi<ProductsResponse>("/products", {
    params: {
      limit,
      offset,
      sizes,
      gender,
      minPrice,
      maxPrice,
      q: query,
    },
  });

  // Hay que agregar el URL a las imagenes de los productos
  const productsWithImageUrls = data.products.map((product) => ({
    ...product,
    images: product.images.map(
      (image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`,
    ),
  }));

  return { ...data, products: productsWithImageUrls };
};
