import { useCallback, useState } from "react";
import { MyTitle } from "./ui/MyTitle";
import { MySubtitle } from "./ui/MySubtitle";

/*
NOTE: Component Memoization (React.memo)
Updates `title` -> `MemoHook` runs again (normal behavior because of the state update) 
and in this case, Re-renders <MyTitle /> & <MySubtitle />

But, what if <MySubtitle /> handles a heavy task ?

We can wrap <MyTitle /> & <MySubtitle /> in `memo` which accepts a functional component as argument to
memoize the component. 

So if we now update either `title` or `subtitle` -> ONLY the component handling that state will
re-render.

Ahora, si el valor de actualizacion fuera el mismo, gracias al Virtual-Dom, 
React es lo suficientemente inteligente para detectar que no hay cambios
por tanto no re-renderiza aun sin haber `memo`
-------------------------------------------------------------------------------

NOTE: Function memoization (useCallback)
AHORA, que pasa si mandamos una funcion por ejemplo a <MySubtititle /> ?

Considering both having `memo`:
If we update `title` -> BOTH components re-render again... (which only <MyTitle /> should)

`MemoHook` code runs again on each state update, and in this case, `handleMyAPICall`, 
which IS DEFINED IN THE COMPONENT AND we're sending as a prop to <MySubtitle /> is a pure function 
that is being Re-Located in memory (basically re-defined) therefore, 
triggering the re-render in <MySubtititle />

We can wrap `handleMyAPICall` in `useCallback` hook and it'll fix the issue.

Update `title` -> now it re-renders ONLY <MyTitle />

Hay alternativas como definir la funcion fuera del componente
*/

// NOTE: Ejemplo SIN useCallback
// const handleMyAPICall = (value: string) => console.log("CALLING API", value);

export const MemoHook = () => {
  const [title, setTitle] = useState("Hola");
  const [subtitle, setSubtitle] = useState("Mundo");

  const handleMyAPICall = useCallback(
    () => console.log("CALLING API", subtitle),
    [subtitle],
  ); // Dependency Array so if some state(s) updates, the function now will be redefined with that new state(s) value(s)

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl font-thin text-white">MemoApp</h1>

      <MyTitle title={title} />
      <MySubtitle subtitle={subtitle} callMyAPI={handleMyAPICall} />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => setTitle("Hello" + new Date().getTime())}
      >
        Cambiar titulo
      </button>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        // onClick={() => setSubtitle("World" + new Date().getTime())}
        onClick={() => setSubtitle("World")}
      >
        Cambiar Subtitulo
      </button>
    </div>
  );
};
