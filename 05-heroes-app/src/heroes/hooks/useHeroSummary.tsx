import { useQuery } from "@tanstack/react-query";
import { getSummaryAction } from "../actions/get-summary-action";

export const useHeroSummary = () => {
  // Regresamos todo el object
  return useQuery({
    queryKey: ["summary-information"],
    queryFn: getSummaryAction,
    staleTime: 1000 * 60 * 5, // 5 Mins
  });
};
