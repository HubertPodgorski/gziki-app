import { Task } from "../../helpers/types";

export const getNewTaskPosition = (tasks: Task[]): number => {
  if (!tasks.length) return 0;

  return tasks.reduce((currentPosition: number, task: Task) => {
    const {
      position: { positionIndex },
    } = task;

    return currentPosition <= positionIndex
      ? positionIndex + 1
      : currentPosition;
  }, 0);
};
