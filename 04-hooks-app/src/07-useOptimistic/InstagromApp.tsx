import { useOptimistic, useState, useTransition } from "react";
import { toast } from "sonner";
interface Comment {
  id: number;
  text: string;
  optimistic?: boolean;
}
let lastId = 2;

/*
1- Actualizamos el state `optimista` basado en el `real` (useOptimistic) asumiendo que el request sera un exito
2- Con `useTransition` hariamos el HTTP request y con el `isPending` controlariamos la UI
`isPending` es `true` cuando el `action` esta ejecutandose

3- En caso de fallar la request, dentro del `action` de useTransition podemos hacer fallback al `state` anterior
transformando el state `real` a su mismo valor anterior y React deja de tomar en cuenta el `optimista` y renderea el `real`
*/

export const InstagromApp = () => {
  /* Con useTransition, podemos aplicar un `isPending` cuando usemos el `action`
  que nos devuelve el hook. */
  const [isPending, startTransition] = useTransition();

  const [comments, setComments] = useState<Comment[]>([
    { id: 1, text: "¡Gran foto!" },
    { id: 2, text: "Me encanta 🧡" },
  ]);

  /* NOTE: Sirve para aplicar updates en la UI a partir de un `state` de forma optimista.
  Con esto asumimos que el server va dar una respuesta positiva. 
  En caso de fallar, podemos hacer un rollback hacia el state anterior.

  Mandamos 2 args, 
  -El `state` al que queremos updatear de forma optimista
  - Dispatch function con el que retornas el nuevo state
    La funcion acepta 2 args 
    -> El estado actual (como el useState que tambien se le dice el prevValue)
    -> Y el nuevo valor con el que actualizamos el `state`

  Se desestructura como `useState` y funciona en esa parte igual
  
  //* TLDR: Actualizamos la UI antes del HTTP request asumiendo que sera exitoso usando ambos `useOptimistic` 
  para actualizar el `state` y `useTransition` con su `action` (startTransition) para 

  */
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    // El state optimista
    comments,
    // Dispatcher para actualizar el `currentState` usando el valor que le enviamos.
    (currentComments, newComment: string) => {
      lastId++;
      return [
        ...currentComments,
        {
          id: lastId,
          text: newComment,
          optimistic: true,
        },
      ];
    },
  ); // React 19 >

  // FormData es un objeto del form con los campos
  const handleAddComment = async (formData: FormData) => {
    // Accedemos mediante la key para obtener el valor del campo
    const messageText = formData.get("post-message") as string; // Lo ideal es validar con Zod en vez de Castear por que el tipo es `FormDataEntryValue | null`

    // Antes de llamar al server, suponemos que el server responde bien y actualizamos la UI
    addOptimisticComment(messageText);

    // En cuanto actualizamos la UI hacemos el "request" y actualizamos el `state`
    startTransition(async () => {
      // Simulamos http request
      await new Promise((resolve) => setTimeout(resolve, 1500));

      //   Simular success
      //   setComments((prev) => [
      //     ...prev,
      //     {
      //       id: new Date().getTime(),
      //       text: messageText, //Como no mandamos el optimistic, no se ve `enviando` ya que aqui es donde se actualiza la UI al final
      //     },
      //   ]);

      // Revert process (El estado "real" no se actualiza por tanto se descarta el "optimistic" )
      setComments((prev) => prev);
      toast("Error al agregar comentario", {
        description: "Intente nuevamente",
        duration: 10000,
        position: "top-right",
        action: {
          label: "Cerrar",
          onClick: () => toast.dismiss(),
        },
      });
    });
  };

  return (
    <div className="bg-slate-700 h-screen flex flex-col items-center justify-center">
      {/* Post de ejemplo */}
      <div className="flex flex-col items-center justify-center bg-gray-300 rounded-t-3xl p-4 w-[500px]">
        <img
          src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=500&fit=crop"
          alt="Instagrom"
          className="object-cover rounded-xl mb-4"
        />
        <p className="text-black font-bold mb-4">
          Mira que interesante esta funcionalidad de la API de React.
        </p>
      </div>

      {/* Comentarios */}
      <ul className="flex flex-col items-start bg-gray-300 w-[500px] p-4">
        {/* {comments.map((comment) => ( */}
        {optimisticComments.map((comment) => (
          <li key={comment.id} className="flex items-center gap-2 mb-2">
            <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-white text-center">A</span>
            </div>
            <p className="text-black">{comment.text}</p>
            {comment.optimistic && (
              <span className="text-gray-500 text-sm">enviando... </span>
            )}
          </li>
        ))}
      </ul>

      {/* Formulario de comentarios */}
      <form
        action={handleAddComment}
        className="flex flex-col items-center justify-center bg-gray-300 w-[500px] rounded-b-3xl p-4"
      >
        <input
          type="text"
          name="post-message"
          placeholder="Escribe un comentario"
          required
          className="w-full p-2 rounded-md mb-2 text-black bg-white"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 text-white p-2 rounded-md w-full disabled:bg-blue-300"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};
