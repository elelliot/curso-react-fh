import { use, type Usable } from "react";
import { type User } from "./api/get-user.action";

interface Props {
  getUser: Usable<User>; // Con un generic, decimos que tipo de data retorna el `Usable`
}

/**
 * ! El problema es que `use` trigerea re-render.
Si tenemos `getUserAction` dentro del componente, ya que se vuelve a re-definir y
al terminar de traer la data, `getUserAction` se vuelve a re-definir y se vuelve a re-renderear, quedando en un Loop Infinito

Por eso sacamos la funcion fuera del componente, para que no sufra por el Component LifeCycle de React

const userPromise = getUserAction(1);

--------------------------
 *? PERO Y SI QUEREMOS MANDAR UN ARGUMENTO AL `Usable` ?
Tendriamos que crear una prop para poder mandar el argumento al `Usable`, por que de nuevo; 
** si lo movemos al componente para recibir el argumento -> LOOP INFINITO
/

/** 
 * * Lesson Intro:
Si quisieramos fetchear dentro de un componente tendriamos que usar `useEffect` y `useState` y 🤮
por que aparte de que `useEffect` no puede ser `async`; debemos tener varios estados para la data y el loading,
y considerar el initial state de la data.

Para evitar manejar varios estados, podemos usar `use` de React; no es Hook, es API; 
Junto con el componente <Suspense />
que maneja la carga de un elemento mientras ejecuta el `use` (el cual es una Promesa o Context que React conoce como `Usable`)
*?Tambien `use` a diferencia de los hooks SI se pueden usar dentro de bucles o condicionales

Los server-components permiten que un componente sea `async` y asi evitamos el `use` pero eso solo se puede con NextJS o
en un entorno que lo soporte, React lo hace pero es algo experimental.

CONCLUSION:
`use` y <Suspense /> evitan varios estados y efectos por tanto optimiza el codigo.
*/
export const ClientInformation = ({ getUser }: Props) => {
  // NOTE: si queremos mandar una prop para la funcion `Usable`
  const user = use(getUser);
  // const user = use(userPromise); // Debemos pasar un `Usable` , en este caso la funcion; no hay que poner`async`, ya lo maneja `use`
  // const user = use(getUserAction(1)); //* LOOP Infinito por el re-render READ TOP^

  // useEffect(() => {
  //    getUserAction(id).then((user) => console.log(user));
  // }, []);

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h2 className="text-4xl font-thin text-white">
        {user.name} - #{user.id}
      </h2>

      <p className="text-white text-xl">{user.location}</p>
      <p className="text-white text-xl">{user.role}</p>
    </div>
  );
};
