import { useParams, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getProductsAction } from "../actions/get-products.action";

export const useProducts = () => {
  // Recuperamos los query params de la URL y del path
  const { gender } = useParams(); // Asi le pusimos en el router `gender`
  const [searchParams] = useSearchParams();

  const limit = searchParams.get("limit") || 9;
  const page = searchParams.get("page") || 1;
  const sizes = searchParams.get("sizes") || undefined;

  // offset -> Cuantos records se salta dependiendo de la pagina y el limit
  const offset = (Number(page) - 1) * Number(limit);

  const price = searchParams.get("price") || "any"; // Por defecto 'any'
  let minPrice = undefined;
  let maxPrice = undefined;

  switch (price) {
    case "any":
      // Es redundante por que ya es undefined por defecto, pero lo ponemos nomas por ilustracion
      break;
    case "0-50":
      minPrice = 0;
      maxPrice = 50;
      break;
    case "50-100":
      minPrice = 50;
      maxPrice = 100;
      break;
    case "100-200":
      minPrice = 100;
      maxPrice = 200;
      break;
    case "200+":
      minPrice = 200;
      maxPrice = undefined;
      break;
  }

  return useQuery({
    queryKey: [
      "products",
      { offset, limit, gender, sizes, minPrice, maxPrice },
    ],
    queryFn: () =>
      getProductsAction({
        limit: isNaN(+limit) ? 9 : limit,
        offset: isNaN(offset) ? 0 : offset, // Validamos si no es numero, si no es , ponemos 0
        gender,
        sizes,
        minPrice,
        maxPrice,
      }),
    staleTime: 1000 * 60 * 5,
  });
};
