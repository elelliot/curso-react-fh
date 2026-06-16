import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductByIdAction } from "../actions/get-product-by-id.action";
import { createUpdateProductAction } from "../actions/create-update-product.action";

export const useProduct = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["product", { id }],
    queryFn: () => getProductByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 Mins
    // enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: createUpdateProductAction,
    onSuccess: (product) => {
      // Invalidar Cache de products y product
      queryClient.invalidateQueries({ queryKey: ["products"] });
      // NOTE: Este invalidate es para que al terminar de ACTUALIZAR, el form se refresque con esa data
      queryClient.invalidateQueries({
        queryKey: ["product", { id: product.id }],
      });

      /* NOTE:  Actualizar query data: 
      Esto es para que al CREAR, actualizamos manualmente el cache con la data que obtuvimos de la respuesta al crear el producto.
      Asi que una vez que navegamos a la pagina de editar, nos ahorramos un request a la DB (Network Tab de las devtools lo confirman)
      por que ya no estariamos pidiendo la info que acabamos de crear, la obtendriamos de ese cache.
      */
      queryClient.setQueryData(["product", { id: product.id }], product);
    },
  });

  return {
    ...query, // Las props de la query son devueltas individualmente por el spread
    mutation, // Pero las de mutation deben accederse desde esta
  };
};
