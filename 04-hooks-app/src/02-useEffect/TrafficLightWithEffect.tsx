import { useEffect, useState } from "react";

const colors = {
  red: "bg-red-500 animate-pulse",
  yellow: "bg-yellow-500 animate-pulse",
  green: "bg-green-500 animate-pulse",
};

type TrafficLightColor = keyof typeof colors; // Asi podremos agregar mas props al `colors` y TypeScript ya nos va sugerir el nuevo valor al usar el `setLight`

export const TrafficLightWithEffect = () => {
  const [light, setLight] = useState<TrafficLightColor>("red");
  const [countdown, setCountdown] = useState(5);

  //   Los effects, solo deben tener una tarea
  useEffect(() => {
    if (countdown === 0) return;

    const intervalId = setInterval(() => {
      console.log("Set Interval");
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Debemos limpiar el `setInterval` por que si no provoca memory leak
    return () => {
      clearInterval(intervalId);
    };
  }, [countdown]);

  //   Change light color effect
  useEffect(() => {
    if (countdown > 0) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCountdown(5);

    if (light === "red") {
      setLight("green");
      return;
    }
    if (light === "yellow") {
      setLight("red");
      return;
    }
    if (light === "green") {
      setLight("yellow");
      return;
    }
  }, [countdown, light]);

  // const setLightAction = useEffectEvent(() => {
  //   setCountdown(5);

  //   if (light === "red") {
  //     setLight("green");
  //     return;
  //   }

  //   if (light === "yellow") {
  //     setLight("red");
  //     return;
  //   }

  //   if (light === "green") {
  //     setLight("yellow");
  //     return;
  //   }
  // });

  // useEffect(() => {
  //   if (countdown > 0) return;

  //   setLightAction();
  // }, [countdown]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-white text-3xl font-thin">
          Semaforo con useEffect
        </h1>
        <h2 className="text-white text-xl">Countdown: {countdown}</h2>

        <div className="w-64 bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${(countdown / 5) * 100}%` }}
          ></div>
        </div>

        <div
          className={`w-32 h-32 ${light === "red" ? colors[light] : "bg-gray-500"} rounded-full`}
        ></div>

        <div
          className={`w-32 h-32 ${light === "yellow" ? colors[light] : "bg-gray-500"} rounded-full`}
        ></div>
        <div
          className={`w-32 h-32 ${light === "green" ? colors[light] : "bg-gray-500"} rounded-full`}
        ></div>
      </div>
    </div>
  );
};
