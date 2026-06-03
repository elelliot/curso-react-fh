import { useParams } from "react-router";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomJumboTron } from "@/shop/components/CustomJumboTron";
import { ProductsGrid } from "@/shop/components/ProductsGrid";
import { products } from "@/mocks/products.mock";

export const GenderPage = () => {
  const { gender } = useParams();
  const genderLabel =
    gender === "men" ? "Hombres" : gender === "women" ? "Mujeres" : "Niños";

  return (
    <>
      <CustomJumboTron title={`Productos para ${genderLabel}`} />

      <ProductsGrid products={products} />

      <CustomPagination totalPages={7} />
    </>
  );
};
