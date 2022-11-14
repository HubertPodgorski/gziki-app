export const getNewAndOldPositionIndexes = (destination, source) => {
  const [newRowIndexString, newColumnIndexString] =
    destination.droppableId.split("_");
  const newCellIndex = destination.index;
  const newColumnIndex = +newColumnIndexString;
  const newRowIndex = +newRowIndexString;

  const [oldRowIndexString, oldColumnIndexString] =
    source.droppableId.split("_");
  const oldCellIndex = destination.index;
  const oldColumnIndex = +oldColumnIndexString;
  const oldRowIndex = +oldRowIndexString;

  return {
    newIndexes: {
      cell: newCellIndex,
      column: newColumnIndex,
      row: newRowIndex,
    },
    oldIndexes: {
      cell: oldCellIndex,
      column: oldColumnIndex,
      row: oldRowIndex,
    },
  };
};

export const getMappedItemsToUpdate = (
  destination,
  source,
  mappedTasks,
  draggableId
) => {
  const {
    oldIndexes: {
      cell: oldCellIndex,
      row: oldRowIndex,
      column: oldColumnIndex,
    },
    newIndexes: {
      cell: newCellIndex,
      row: newRowIndex,
      column: newColumnIndex,
    },
  } = getNewAndOldPositionIndexes(destination, source);

  const newColumnTasks = [...mappedTasks[newRowIndex][newColumnIndex]];

  let itemsToUpdate = [];

  if (destination.droppableId === source.droppableId) {
    newColumnTasks.splice(newCellIndex, 0, {
      _id: draggableId,
      position: {
        rowIndex: newRowIndex,
        columnIndex: newColumnIndex,
        positionIndex: newCellIndex,
      },
    });

    itemsToUpdate = [...newColumnTasks];
  } else {
    const oldColumnTasks = [...mappedTasks[oldRowIndex][oldColumnIndex]];

    oldColumnTasks.splice(oldCellIndex, 1);

    newColumnTasks.splice(newCellIndex, 0, {
      _id: draggableId,
      position: {
        rowIndex: newRowIndex,
        columnIndex: newColumnIndex,
        positionIndex: newCellIndex,
      },
    });

    itemsToUpdate = [...oldColumnTasks, ...newColumnTasks];
  }

  return itemsToUpdate
    .reduce((currentList, item) => {
      const foundItem = currentList.find(({ _id }) => _id === item._id);

      if (foundItem) return currentList;

      return [...currentList, item];
    }, [])
    .map(({ _id, position }, index) => {
      if (_id === draggableId) {
        return {
          _id,
          position: {
            columnIndex: newColumnIndex,
            rowIndex: newRowIndex,
            positionIndex: index,
          },
        };
      }

      return {
        _id,
        position: { ...position, positionIndex: index },
      };
    });
};
