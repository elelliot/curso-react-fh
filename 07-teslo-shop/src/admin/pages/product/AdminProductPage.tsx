import { Navigate, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useProduct } from "@/admin/hooks/useProduct";
import { ProductForm } from "./ui/ProductForm";
import type { Product } from "@/interfaces/product.interface";

export const AdminProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading, isError, mutation } = useProduct(id || "");

  const title = id === "new" ? "Nuevo producto" : "Editar producto";
  const subtitle =
    id === "new"
      ? "Aquí puedes crear un nuevo producto."
      : "Aquí puedes editar el producto.";

  const handleSubmit = async (
    productLike: Partial<Product> & { files?: File[] },
  ) => {
    await mutation.mutateAsync(productLike, {
      onSuccess: (data) => {
        toast.success("Producto actualizado correctamente", {
          position: "top-right",
        });

        //NOTE: Una vez creado, nos vamos a la pagina de edicion para poder aplicar cambios de inmediato (y hace otro request para esa misma info gracias al `setQueryData` que aplicamos al `useProduct`)
        navigate(`/admin/products/${data.id}`);
      },
      onError: (error) => {
        console.log(error);
        toast.error("Error al actualizar el producto", {
          position: "top-right",
        });
      },
    });
  };

  // Redirects
  if (isError) return <Navigate to="/admin/products" />;
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner className="size-12" />
      </div>
    );
  if (!product) return <Navigate to="/admin/products" />;

  return (
    <ProductForm
      title={title}
      subTitle={subtitle}
      product={product}
      onSubmit={handleSubmit}
      isPending={mutation.isPending}
    />
  );
};
