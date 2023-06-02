import { getMappedItemsToUpdate } from "../helpers/dragNDrop";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { useSocketContext } from "./useSocketContext";

export const useMoveTasksCell = () => {
  const { socket } = useSocketContext();
  const { tasks, setTasks } = useContext(AppContext);

  return (result, mappedTasks) => {
    const { destination, source, draggableId } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const mappedItemsToUpdate = getMappedItemsToUpdate(
      destination,
      source,
      mappedTasks,
      draggableId
    );

    const updatedTasksListWithChanges = tasks.map((task) => {
      const updatedTaskFound = mappedItemsToUpdate.find(
        ({ _id: mappedTaskId }) => mappedTaskId === task._id
      );

      if (!updatedTaskFound) return task;

      return { ...task, ...updatedTaskFound };
    });

    setTasks(updatedTasksListWithChanges);

    socket.emit("update_tasks_order", { tasks: mappedItemsToUpdate });
  };
};
