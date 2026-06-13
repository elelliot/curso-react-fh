import { Link } from "react-router";
import { PencilIcon, PlusIcon } from "lucide-react";
import { AdminTitle } from "@/admin/components/AdminTitle";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useProducts } from "@/shop/hooks/useProducts";
import { Spinner } from "@/components/ui/spinner";
import { currencyFormatter } from "@/lib/currency-formatter";

export const AdminProductsPage = () => {
  const { data, isLoading } = useProducts();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner className="size-12" />
      </div>
    );

  if (data)
    return (
      <>
        <div className="flex justify-between items-center">
          <AdminTitle
            title="Productos"
            subtitle="Aqui puedes ver y administrar tus productos"
          />

          <div className="flex justify-end mb-10 gap-4">
            <Link to="/admin/products/new">
              <Button>
                <PlusIcon />
                Nuevo Producto
              </Button>
            </Link>
          </div>
        </div>

        <Table className="bg-white p-10 shadow-2xs border-gray-200 mb-10">
          <TableHeader>
            <TableRow>
              <TableHead>Imagen</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Inventario</TableHead>
              <TableHead>Tallas</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img
                    src={product.images[0]}
                    alt={product.slug}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </TableCell>

                <TableCell>
                  <Link
                    to={`/admin/products/${product.id}`}
                    className="hover:text-blue-600 underline"
                  >
                    {product.title}
                  </Link>
                </TableCell>
                <TableCell>{currencyFormatter(product.price)}</TableCell>
                <TableCell className="capitalize">{product.gender}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.sizes.join(", ")}</TableCell>
                <TableCell className="text-right">
                  <Link to={`/admin/products/${product.id}`}>
                    <Button variant="outline">
                      <PencilIcon className="text-blue-500" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {data.products.length > 0 && (
          <CustomPagination totalPages={data.pages} />
        )}
      </>
    );
};
