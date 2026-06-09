import { useParams } from "react-router";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { Spinner } from "@/components/ui/spinner";
import { CustomJumboTron } from "@/shop/components/CustomJumboTron";
import { ProductsGrid } from "@/shop/components/ProductsGrid";
import { useProducts } from "@/shop/hooks/useProducts";

export const GenderPage = () => {
  const { gender } = useParams();
  const genderLabel =
    gender === "men" ? "Hombres" : gender === "women" ? "Mujeres" : "Niños";

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
        <CustomJumboTron title={`Productos para ${genderLabel}`} />

        <ProductsGrid products={data.products || []} />

        {data.products.length > 0 && (
          <CustomPagination totalPages={data.pages} />
        )}
      </>
    );
};
