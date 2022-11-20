export const mapTasks = (rawTasks) =>
  rawTasks.reduce((tasksRows, item) => {
    const { rowIndex, columnIndex } = item.position;

    if (!tasksRows[rowIndex]) {
      return { ...tasksRows, [rowIndex]: { [columnIndex]: [item] } };
    } else {
      const newTaskRowsAtIndex = tasksRows[rowIndex];

      if (!newTaskRowsAtIndex[columnIndex]) {
        newTaskRowsAtIndex[columnIndex] = [item];
      } else {
        const newTasksAtColumnIndex = [
          ...newTaskRowsAtIndex[columnIndex],
          item,
        ];

        newTaskRowsAtIndex[columnIndex] = newTasksAtColumnIndex.sort(
          (itemA, itemB) =>
            itemA.position.positionIndex - itemB.position.positionIndex
        );
      }

      return { ...tasksRows, [rowIndex]: newTaskRowsAtIndex };
    }
  }, {});

export const mapTasksForAdminPanel = (rawTasks) => {
  let maxRowIndex = 0;

  const reducedTasks = rawTasks.reduce((tasksRows, item) => {
    const { rowIndex, columnIndex } = item.position;

    if (rowIndex > maxRowIndex) {
      maxRowIndex = rowIndex;
    }

    if (!tasksRows[rowIndex]) {
      const newColumnAtRow = {
        [columnIndex]: [item],
      };

      return {
        ...tasksRows,
        [rowIndex]: { 0: [], 1: [], ...newColumnAtRow },
      };
    } else {
      const newTaskRowsAtIndex = tasksRows[rowIndex];

      if (!newTaskRowsAtIndex[columnIndex]) {
        newTaskRowsAtIndex[columnIndex] = [item];
      } else {
        const newTasksAtColumnIndex = [
          ...newTaskRowsAtIndex[columnIndex],
          item,
        ];

        newTaskRowsAtIndex[columnIndex] = newTasksAtColumnIndex.sort(
          (itemA, itemB) =>
            itemA.position.positionIndex - itemB.position.positionIndex
        );
      }

      return { ...tasksRows, [rowIndex]: newTaskRowsAtIndex };
    }
  }, {});

  let newReducedTasks = {};

  const emptyRow = { 0: [], 1: [] };
  for (let loopRowIndex = 0; loopRowIndex <= maxRowIndex + 1; loopRowIndex++) {
    newReducedTasks = { ...newReducedTasks, [loopRowIndex]: emptyRow };
  }

  newReducedTasks = { ...newReducedTasks, ...reducedTasks };

  return newReducedTasks;
};

export const isMyDog = (dogId, userDogs) =>
  userDogs.some(({ _id }) => _id === dogId);
