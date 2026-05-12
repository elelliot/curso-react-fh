import { useEffect, useState } from "react";

// Si no depende del state, mejor ponerlo afuera asi nos ahorramos un useMemo o que se reescriba en memoria, lo cual puede ocasionar compportamientos no deseados
export const colors = {
  red: "bg-red-500 animate-pulse",
  yellow: "bg-yellow-500 animate-pulse",
  green: "bg-green-500 animate-pulse",
};

type TrafficLightColor = keyof typeof colors; // Asi podremos agregar mas props al `colors` y TypeScript ya nos va sugerir el nuevo valor al usar el `setLight`

export const useTrafficLight = () => {
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

  // Change light color effect (Supuestamente debo usar un useEffectEvent() por un warning de react, pero aun asi me tira el warning)
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

  return {
    // Props
    colors,
    countdown,
    light,

    // Computed (basicamente se calculan en cada render)
    percentage: (countdown / 5) * 100,
    greenLight: light === "green" ? colors.green : "bg-gray-500",
    redLight: light === "red" ? colors.red : "bg-gray-500",
    yellowLight: light === "yellow" ? colors.yellow : "bg-gray-500",
  };
};
