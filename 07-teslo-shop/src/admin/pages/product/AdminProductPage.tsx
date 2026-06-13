import { Navigate, useParams } from "react-router";
import { Spinner } from "@/components/ui/spinner";
import { useProduct } from "@/admin/hooks/useProduct";
import { ProductForm } from "./ui/ProductForm";

export const AdminProductPage = () => {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    isError,
    handleSubmitForm,
  } = useProduct(id || "");

  const title = id === "new" ? "Nuevo producto" : "Editar producto";
  const subtitle =
    id === "new"
      ? "Aquí puedes crear un nuevo producto."
      : "Aquí puedes editar el producto.";

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
      onSubmit={handleSubmitForm}
    />
  );
};
