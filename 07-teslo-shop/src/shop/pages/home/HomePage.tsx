import { CustomPagination } from "@/components/custom/CustomPagination";
import { products } from "@/mocks/products.mock";
import { CustomJumboTron } from "@/shop/components/CustomJumboTron";
import { ProductsGrid } from "@/shop/components/ProductsGrid";

export const HomePage = () => {
  return (
    <>
      <CustomJumboTron title="Todos los Productos" />

      <ProductsGrid products={products} />

      <CustomPagination totalPages={7} />
    </>
  );
};
