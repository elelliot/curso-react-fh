interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskState {
  todos: Todo[];
  length: number;
  completed: number;
  pending: number;
}

/* Las acciones son definidas por convencion dentro de un object con el `type` del `action` y
 su `payload` osea, el argumento que recibimos.
*/
export type TaskAction =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: number }
  | { type: "DELETE_TODO"; payload: number };

// Estado inicial (lo obtenemos de local storage o lo creamos de 0)
export const getTasksInitialState = (): TaskState => {
  const localStorageState = localStorage.getItem("tasks-state");

  if (!localStorageState) {
    return {
      todos: [],
      completed: 0,
      pending: 0,
      length: 0,
    };
  }

  // Esto puede haber sido manipulado desde el browser
  return JSON.parse(localStorageState);
};

// NOTE: Reducer es una funcion que resuelve un nuevo state basado en los argumentos. Es un patron agnostico del framework o lenguaje
export const taskReducer = (
  state: TaskState,
  action: TaskAction,
): TaskState => {
  switch (action.type) {
    case "ADD_TODO": {
      // if (inputValue.length === 0) return;
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload.trim(),
        completed: false,
      };

      const updatedTodos = [...state.todos, newTodo];
      return {
        ...state, // Como el completed no se afecta aqui, lo dejamos en el `spread`
        todos: updatedTodos,
        length: updatedTodos.length,
        pending: state.pending + 1, // Por defecto los task creados son `pending`
      };
    }
    case "DELETE_TODO": {
      const updatedTodos = state.todos.filter(
        (todo) => todo.id !== action.payload,
      );

      const completedTodos = updatedTodos.filter(
        (todo) => todo.completed,
      ).length;
      const pendingTodos = updatedTodos.length - completedTodos;

      return {
        ...state,
        todos: updatedTodos,
        length: updatedTodos.length,
        completed: completedTodos,
        pending: pendingTodos,
      };
    }
    case "TOGGLE_TODO": {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });

      return {
        ...state,
        todos: updatedTodos,
        completed: updatedTodos.filter((todo) => todo.completed).length,
        pending: updatedTodos.filter((todo) => !todo.completed).length,
      };
    }

    default:
      return state; // SIEMPRE hay que retornar el state, regla de reducers
  }
};
