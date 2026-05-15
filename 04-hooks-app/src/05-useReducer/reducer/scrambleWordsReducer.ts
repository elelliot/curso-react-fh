export interface ScrambleWordsState {
  currentWord: string;
  errorCounter: number;
  guess: string;
  isGameOver: boolean;
  maxAllowErrors: number;
  maxSkips: number;
  points: number;
  scrambledWord: string;
  skipCounter: number;
  words: string[];
  totalWords: number;
}

const GAME_WORDS = [
  "REACT",
  "JAVASCRIPT",
  "TYPESCRIPT",
  "HTML",
  "ANGULAR",
  "SOLID",
  "NODE",
  "VUEJS",
  "SVELTE",
  "EXPRESS",
  "MONGODB",
  "POSTGRES",
  "DOCKER",
  "KUBERNETES",
  "WEBPACK",
  "VITE",
  "TAILWIND",
];

// Esta función mezcla el arreglo para que siempre sea aleatorio
const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

// Esta función mezcla las letras de la palabra
const scrambleWord = (word: string = "") => {
  return word
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};

export type ScrambleWordsAction =
  | { type: "SET_GUESS"; payload: string }
  | { type: "CHECK_ANSWER" }
  | { type: "SKIP_WORD" }
  | { type: "START_NEW_GAME"; payload: ScrambleWordsState };

export const getInitialState = (): ScrambleWordsState => {
  const shuffledWords = shuffleArray([...GAME_WORDS]);

  return {
    currentWord: shuffledWords[0],
    errorCounter: 0,
    guess: "",
    isGameOver: false,
    maxAllowErrors: 3,
    maxSkips: 3,
    points: 0,
    scrambledWord: scrambleWord(shuffledWords[0]),
    skipCounter: 0,
    words: shuffledWords,
    totalWords: shuffledWords.length,
  };
};

/* NOTE: Los reducers deben ser puros, solo debe depender de las entradas (estado y accion).
si queremos hacer algo en base a un cambio de state (por ejemplo el confetti), eso hay que hacerlo fuera del reducer por ejemplo con useEffect 
*/
export const scrambleWordsReducer = (
  state: ScrambleWordsState,
  action: ScrambleWordsAction,
): ScrambleWordsState => {
  switch (action.type) {
    case "SET_GUESS":
      return {
        ...state,
        guess: action.payload.trim().toUpperCase(),
      };

    case "CHECK_ANSWER": {
      // Comparamos...
      // Correcto
      const isCorrectWord = state.guess === state.currentWord;
      if (isCorrectWord) {
        const newWords = state.words.slice(1);
        return {
          ...state,
          words: newWords,
          points: state.points + 1,
          currentWord: newWords[0],
          scrambledWord: scrambleWord(newWords[0]), // Normalmente no queremos usar una funcion externa al reducer pero como esta en el mismo archivo, no hay tanto pex...
          guess: "",
        };
        //   confetti({ particleCount: 100, spread: 120 });
      }

      // Incorrecto
      return {
        ...state,
        guess: "",
        errorCounter: state.errorCounter + 1,
        isGameOver: state.errorCounter + 1 >= state.maxAllowErrors,
      };
    }

    case "SKIP_WORD": {
      if (state.skipCounter >= state.maxSkips) return state; // Aunque no pase nada, siempre hay que regresar el state

      const updatedWords = state.words.slice(1);

      return {
        ...state,
        skipCounter: state.skipCounter + 1,
        words: updatedWords,
        currentWord: updatedWords[0],
        scrambledWord: scrambleWord(updatedWords[0]),
        guess: "",
      };
    }

    case "START_NEW_GAME": {
      // return getInitialState() // En teoria esta bien, pero la idea es no usar funciones externas.
      return action.payload;
    }

    default:
      return state;
  }
};
