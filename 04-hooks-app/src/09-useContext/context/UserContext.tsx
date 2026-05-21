import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { users, type User } from "../data/user-mock.data";

/* 
* Hay varias formas de tipar al `children`

?---------- Interface con `ReactNode` para el `children`
interface UserContextProps {
    children: ReactNode
}

?---------- Si solo recibimos el `children` podemos usar:
export const UserContextProvider:= ({ children }: PropsWithChildren) =>...

?o con el FC y mandarle 'PropsWithChildren' con Generic:
export const UserContextProvider: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
*/

/* El `Context` es un HOC (Higher Order Component) que provee estado o funciones a sus hijos.
NOTE: HOC es un componente que tiene hijos.

Por convencion termina con `provider` (no necesariamente el archivo, pero si el FC)

Los hijos acceden al Context con:
1- Pre React 19 -> con `useContext` ----------- Debe ser llamado en lo mas alto del componente (como casi cualquier Hook)
2- React 19 -> con `use` API ----------- Puede ser llamado en `condicionales` y `loops`
*/

// *La idea es que el context tenga el estado y logica que los hijos puedan usar
type AuthStatus = "checking" | "authenticated" | "not-authenticated";

interface UserContextProps {
  // state
  authStatus: AuthStatus;
  isAuthenticated: boolean;
  user: User | null;

  //methods
  login: (userId: number) => boolean;
  logout: () => void;
}

// ! Creamos el contexto con react, y si le mandamos un Generic, pide un estado inicial, pero si no queremos ponerlo, solo casteamos
// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext({} as UserContextProps);

// HOC
export const UserContextProvider = ({ children }: PropsWithChildren) => {
  // State
  const [authStatus, setAuthStatus] = useState<AuthStatus>("checking"); // what about `checking` ?
  const [user, setUser] = useState<User | null>(null);

  // Logic
  const handleLogin = (userId: number) => {
    const user = users.find((user) => user.id === userId);

    if (!user) {
      console.log(`USER NOT FOUND ${userId}`);
      setUser(null);
      setAuthStatus("not-authenticated");
      return false;
    }

    setUser(user);
    setAuthStatus("authenticated");
    localStorage.setItem("userId", userId.toString());
    return true;
  };

  const handleLogout = () => {
    console.log("Log Out");
    setAuthStatus("not-authenticated");
    setUser(null);
    localStorage.removeItem("userId");
  };

  // ! Tira warning but fuck it
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      handleLogin(+storedUserId);
      return;
    }

    handleLogout();
  }, []);

  return (
    // Idealmente, no deberiamos poner HTML en un Context Provider, solo deberia tener informacion o acciones para que los otros componentes accedan
    //? Wrapeamos el `children` con el `UserContext` que creamos, y debemos declarar las piezas de estado y logica que queremos mandar.
    // Antes era necesario poner en el componente que regresa el `createContext` `<UserContext.Provider` ... Ya no
    <UserContext
      value={{
        authStatus,
        isAuthenticated: authStatus === "authenticated",
        user,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </UserContext>
  );
};
