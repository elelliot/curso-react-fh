import { useState, type SubmitEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { SkipForward, Play } from "lucide-react";
import confetti from "canvas-confetti";

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

export const ScrambleWords = () => {
  const [words, setWords] = useState(shuffleArray(GAME_WORDS)); // Todas las palabras a adivinar

  const [currentWord, setCurrentWord] = useState(words[0]); // Current Word to Guess
  const [scrambledWord, setScrambledWord] = useState(scrambleWord(currentWord)); // Scrambled word to display as the clue
  const [guess, setGuess] = useState(""); // User input guess
  const [points, setPoints] = useState(0); // User current points
  const [errorCounter, setErrorCounter] = useState(0);
  const [maxAllowErrors] = useState(3);

  const [skipCounter, setSkipCounter] = useState(0);
  const [maxSkips] = useState(3);

  const [isGameOver, setIsGameOver] = useState(false);

  const handleGuessSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    // Previene el refresh de la página
    e.preventDefault();

    // Comparamos...
    // Correcto
    const isCorrectWord = guess === currentWord;
    if (isCorrectWord) {
      confetti({ particleCount: 100, spread: 120 });

      // Aumentamos +1 punto
      setPoints((prevState) => prevState + 1);

      // Remove current word from `words` since we passed it.
      const newWords = words.slice(1); // Quitamos la current, que seria la primera
      setWords(newWords);

      // Aqui hacemos lo de los effect...
      setCurrentWord(newWords[0]); // New current word after we slice the array
      setScrambledWord(scrambleWord(newWords[0])); // New scrambled word...

      // Reset Input
      setGuess("");
      return;
    }

    // Incorrecto

    // Error + 1
    setErrorCounter((prevErrorCounter) => prevErrorCounter + 1);
    // Reset Input
    setGuess("");

    if (errorCounter + 1 >= maxAllowErrors) {
      setIsGameOver(true);
    }
  };

  const handleSkip = () => {
    // If we dont have skips
    if (skipCounter >= maxSkips) return;

    setSkipCounter((prevSkipCounter) => prevSkipCounter + 1); // Skip counter + 1

    const updatedWords = words.slice(1); // Remove the skipped word from `words`
    setWords(updatedWords); // Updates Words

    // NOTE: the following updates are like this because if we use the new `words` value after the `setWords`, the state won't sync correctly because of how react works updating the state, so we update the new states like this (without depending on the updated `words` state)
    setCurrentWord(updatedWords[0]); // Set current word with the new value
    setScrambledWord(scrambleWord(updatedWords[0])); // Also set the new scrambled word with the new value
    setGuess("");
  };

  const handlePlayAgain = () => {
    const newArray = shuffleArray(GAME_WORDS);
    // Reset Input and counters
    setGuess("");
    setErrorCounter(0);
    setPoints(0);
    setSkipCounter(0);
    setWords(newArray);
    setCurrentWord(newArray[0]);
    setScrambledWord(scrambleWord(newArray[0]));
    setIsGameOver(false);
  };

  //! Si ya no hay palabras para jugar, se muestra el mensaje de fin de juego
  if (words.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Palabras desordenadas
          </h1>
          <p className="text-gray-600">No hay palabras para jugar</p>
          <br />
          <div>Puntaje: {points}</div>
          <br />
          <div>Errores: {errorCounter}</div>
          <br />
          <div>Saltos: {skipCounter}</div>
          <br />
          <Button onClick={handlePlayAgain}>Jugar de nuevo</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Palabras desordenadas
          </h1>
          <p className="text-gray-600">
            Desordena las letras para encontrar la palabra!
          </p>
        </div>

        {/* Main Game Card */}
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <CardContent className="p-8">
            {/* Scrambled Word Display */}
            <div className="mb-8">
              <h2 className="text-center text-sm font-medium text-gray-500 mb-4 uppercase tracking-wide flex items-center justify-center gap-2">
                Palabra Desordenada
                {isGameOver && (
                  <span className="text-red-500 text-xl"> {currentWord}</span>
                )}
              </h2>

              <div className="flex justify-center gap-2 mb-6">
                {scrambledWord.split("").map((letter, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg transform hover:scale-105 transition-transform duration-200"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animation: "fadeInUp 0.6s ease-out forwards",
                    }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
            </div>

            {/* Guess Input */}
            <form onSubmit={handleGuessSubmit} className="mb-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="guess"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Adivina la palabra
                  </label>
                  <Input
                    id="guess"
                    type="text"
                    value={guess}
                    onChange={(e) =>
                      setGuess(e.target.value.toUpperCase().trim())
                    }
                    placeholder="Ingresa tu palabra..."
                    className="text-center text-lg font-semibold h-12 border-2 border-indigo-200 focus:border-indigo-500 transition-colors"
                    maxLength={scrambledWord.length}
                    disabled={isGameOver}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                  disabled={!guess.trim() || isGameOver}
                >
                  Enviar Adivinanza
                </Button>
              </div>
            </form>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 text-center border border-green-200">
                <div className="text-2xl font-bold text-green-600">
                  {points} / {GAME_WORDS.length}
                </div>
                <div className="text-sm text-green-700 font-medium">Puntos</div>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-lg p-4 text-center border border-red-200">
                <div className="text-2xl font-bold text-red-600">
                  {errorCounter}/{maxAllowErrors}
                </div>
                <div className="text-sm text-red-700 font-medium">Errores</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleSkip}
                variant="outline"
                className="border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                disabled={isGameOver || skipCounter >= maxSkips}
              >
                <SkipForward className="w-4 h-4" />
                Saltar ({skipCounter} / {maxSkips})
              </Button>
              <Button
                onClick={handlePlayAgain}
                variant="outline"
                className="border-2 border-indigo-300 hover:border-indigo-400 hover:bg-indigo-50 text-indigo-600 transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                Jugar de nuevo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Desafíate con palabras desordenadas!
            <br />
            <br />
            {words.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};
