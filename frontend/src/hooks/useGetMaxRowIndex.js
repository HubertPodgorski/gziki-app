import { useMemo } from "react";

export const useGetMaxRowIndex = (mappedTasks) => {
  return useMemo(() => {
    if (!mappedTasks) {
      return 0;
    }

    return Math.max(...Object.keys(mappedTasks).map((rowIndex) => +rowIndex));
  }, [mappedTasks]);
};
