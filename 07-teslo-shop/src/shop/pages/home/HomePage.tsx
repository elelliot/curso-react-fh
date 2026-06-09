import { CustomPagination } from "@/components/custom/CustomPagination";
import { Spinner } from "@/components/ui/spinner";
import { CustomJumboTron } from "@/shop/components/CustomJumboTron";
import { ProductsGrid } from "@/shop/components/ProductsGrid";
import { useProducts } from "@/shop/hooks/useProducts";

export const HomePage = () => {
  const { data, isLoading } = useProducts();

  if (isLoading && !data)
    return (
      <div className="flex items-center justify-center">
        <Spinner className="size-12" />
      </div>
    );

  if (data)
    return (
      <>
        <CustomJumboTron title="Todos los Productos" />

        <ProductsGrid products={data.products || []} />

        {data.products.length > 0 && (
          <CustomPagination totalPages={data.pages} />
        )}
      </>
    );
};
