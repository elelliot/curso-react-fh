import { useRef, useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { X, SaveAll, Tag, Plus, Upload } from "lucide-react";
import { AdminTitle } from "@/admin/components/AdminTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { Product, Size } from "@/interfaces/product.interface";

interface Props {
  title: string;
  subTitle: string;
  product: Product;
  isPending: boolean;

  // Methods
  onSubmit: (productLike: Partial<Product>) => Promise<void>;
}

const availableSizes: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

export const ProductForm = ({
  title,
  subTitle,
  product,
  isPending,
  onSubmit,
}: Props) => {
  const labelInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  // Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm({
    defaultValues: product,
  });

  const selectedSizes = watch("sizes");
  const selectedTags = watch("tags");
  const currentStock = watch("stock");

  const addTag = () => {
    const newTag = labelInputRef.current!.value;
    if (newTag === "") return;

    const newTagSet = new Set(getValues("tags"));
    newTagSet.add(newTag);
    setValue("tags", Array.from(newTagSet));

    labelInputRef.current!.value = "";
  };

  const removeTag = (tag: string) => {
    const newTagSet = new Set(getValues("tags"));
    newTagSet.delete(tag);
    setValue("tags", Array.from(newTagSet));
  };

  const addSize = (size: Size) => {
    // `Set` Es una estructura que permite mantener valores unicos
    const sizeSet = new Set(getValues("sizes"));
    sizeSet.add(size); // Si ya esta no lo agrega, y si no está, lo agrega asi nos ahorramos las condiciones
    setValue("sizes", Array.from(sizeSet)); // Creamos un array basado en el Set
  };

  const removeSize = (size: Size) => {
    const sizeSet = new Set(getValues("sizes"));
    sizeSet.delete(size);
    setValue("sizes", Array.from(sizeSet));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // NOTE: Cuando arrastramos y justo llegamos al dropzone es `dragenter` y si mantenemos arrastrando y nos quedamos encima del elemento `dropable` entonces es `dragover`
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      // NOTE: dragleave no es 100% preciso pero es cuando nos salimos de la dropzone mientras drageamos un elemento
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    console.log(files);

    if (!files) return;
    setFiles((prev) => [...prev, ...Array.from(files)]);
  };

  //NOTE: Esto solo se ejecuta cuando subimos el archivo haciendo click y seleccionando (osea desde el input)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(files);

    if (!files) return;

    // FileList y File[] son diferentes types (no se por que no solo pone `FileList` en el state)
    setFiles((prev) => [...prev, ...Array.from(files)]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center">
        <AdminTitle title={title} subtitle={subTitle} />
        <div className="flex justify-end mb-10 gap-4">
          <Button type="button" variant="outline">
            <Link to="/admin/products" className="flex items-center gap-2">
              <X className="w-4 h-4" />
              Cancelar
            </Link>
          </Button>

          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <Spinner className="w-4 h-4" />
            ) : (
              <SaveAll className="w-4 h-4" />
            )}
            Guardar cambios
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Información del producto
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Título del producto
                  </label>
                  <Input
                    type="text"
                    // NOTE: Para registrar un campo y configuraciones
                    {...register("title", {
                      required: true,
                    })}
                    placeholder="Título del producto"
                    className={`${errors.title && "border-red-500"}`}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">
                      El titulo es requerido
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Precio ($)
                    </label>
                    <Input
                      type="number"
                      {...register("price", { required: true, min: 1 })}
                      placeholder="Precio del producto"
                      className={`${errors.price && "border-red-500"}`}
                    />
                    {errors.price && (
                      <p className="text-red-500 text-sm">
                        El precio debe ser mayor a 0
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Stock del producto
                    </label>
                    <Input
                      type="number"
                      {...register("stock", { required: true, min: 1 })}
                      placeholder="Stock del producto"
                      className={`${errors.stock && "border-red-500"}`}
                    />
                    {errors.stock && (
                      <p className="text-red-500 text-sm">
                        El inventario debe ser mayor a 0
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Slug del producto
                  </label>
                  <Input
                    type="text"
                    {...register("slug", {
                      required: true,
                      validate: (value) =>
                        // NOTE: No whitespaces or error message
                        !/\s/.test(value) ||
                        "El Slug no puede contener espacios en blanco",
                    })}
                    placeholder="Slug del producto"
                    className={`${errors.slug && "border-red-500"}`}
                  />
                  {errors.slug && (
                    <p className="text-red-500 text-sm">
                      {errors.slug.message || "El slug es requerido"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Género del producto
                  </label>
                  <NativeSelect {...register("gender")} className="w-full">
                    <NativeSelectOption value="men">Hombre</NativeSelectOption>
                    <NativeSelectOption value="women">Mujer</NativeSelectOption>
                    <NativeSelectOption value="unisex">
                      Unisex
                    </NativeSelectOption>
                    <NativeSelectOption value="kids">Niño</NativeSelectOption>
                  </NativeSelect>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Descripción del producto
                  </label>
                  <Textarea
                    {...register("description", { required: true })}
                    rows={5}
                    placeholder="Descripción del producto"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">
                      La descripcion es requerida
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Sizes */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Tallas disponibles
              </h2>

              <div className="space-y-4">
                {/* Available Sizes */}
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <span
                      key={size}
                      className={cn(
                        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200",
                        {
                          hidden: !selectedSizes.includes(size),
                        },
                      )}
                    >
                      {size}
                      <button
                        type="button"
                        onClick={() => removeSize(size)}
                        className="cursor-pointer ml-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>

                {/* Add Sizes */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200">
                  <span className="text-sm text-slate-600 mr-2">
                    Añadir tallas:
                  </span>
                  {availableSizes.map((size) => (
                    <button
                      type="button"
                      key={size}
                      onClick={() => addSize(size)}
                      disabled={getValues("sizes").includes(size)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedSizes.includes(size)
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                          : "bg-slate-200 text-slate-700 hover:bg-slate-300 cursor-pointer"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Etiquetas
              </h2>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-green-600 hover:text-green-800 transition-colors duration-200 cursor-pointer"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    type="text"
                    ref={labelInputRef}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " " || e.key === ",") {
                        e.preventDefault(); // Gracias a esto no se propagan el submit, el espacio y la coma, asi que despues ya se limpia correctamente el input, de lo contrario, habria comportamientos raros, como el que si se pone la coma o el espacio en el input
                        addTag();
                      }
                    }}
                    placeholder="Añadir nueva etiqueta..."
                  />
                  <Button type="button" onClick={addTag} className="px-4">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Product Images */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Imágenes del producto
              </h2>

              {/* Drag & Drop Zone */}
              <div
                className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
                  dragActive
                    ? "border-blue-400 bg-blue-50"
                    : "border-slate-300 hover:border-slate-400"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
                <div className="space-y-4">
                  <Upload className="mx-auto h-12 w-12 text-slate-400" />
                  <div>
                    <p className="text-lg font-medium text-slate-700">
                      Arrastra las imágenes aquí
                    </p>
                    <p className="text-sm text-slate-500">
                      o haz clic para buscar
                    </p>
                  </div>
                  <p className="text-xs text-slate-400">
                    PNG, JPG, WebP hasta 10MB cada una
                  </p>
                </div>
              </div>

              {/* Current Images */}
              <div className="mt-6 space-y-3">
                <h3 className="text-sm font-medium text-slate-700">
                  Imágenes actuales
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center">
                        <img
                          src={image}
                          alt="Product"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <button className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <X className="h-3 w-3" />
                      </button>
                      <p className="mt-1 text-xs text-slate-600 truncate">
                        {image}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Imagenes por cargar */}
              <div
                className={cn("mt-6 space-y-3", {
                  hidden: files.length === 0,
                })}
              >
                <h3 className="text-sm font-medium text-slate-700">
                  Imágenes por cargar
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {files.map((file, index) => (
                    <img
                      // En este caso el index es suficiente, pero tambien podemos usar UUID
                      // Aqui creamos el source con `createObjectURL` para poder ver el archivo temporalmente
                      src={URL.createObjectURL(file)}
                      key={index}
                      alt="Product"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Product Status */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Estado del producto
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">
                    Estado
                  </span>
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Activo
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">
                    Inventario
                  </span>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      currentStock > 5
                        ? "bg-green-100 text-green-800"
                        : currentStock > 0
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {currentStock > 5
                      ? "En stock"
                      : currentStock > 0
                        ? "Bajo stock"
                        : "Sin stock"}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">
                    Imágenes
                  </span>
                  <span className="text-sm text-slate-600">
                    {product.images.length} imágenes
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">
                    Tallas disponibles
                  </span>
                  <span className="text-sm text-slate-600">
                    {selectedSizes.length} tallas
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
