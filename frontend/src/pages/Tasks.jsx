import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const tasks = [
  {
    position: { columnIndex: 0, rowIndex: 0, positionIndex: 0 },
  },

  {
    position: { columnIndex: 0, rowIndex: 1, positionIndex: 0 },
  },

  {
    position: { columnIndex: 0, rowIndex: 2, positionIndex: 0 },
  },
  {
    position: { columnIndex: 0, rowIndex: 2, positionIndex: 2 },
  },

  {
    position: { columnIndex: 1, rowIndex: 0, positionIndex: 0 },
  },
  {
    position: { columnIndex: 1, rowIndex: 0, positionIndex: 1 },
  },
  {
    position: { columnIndex: 1, rowIndex: 0, positionIndex: 3 },
  },
];

const Tasks = () => {
  const data = tasks.reduce((tasksRows, item) => {
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
        ].sort(
          (itemA, itemB) =>
            itemA.position.positionIndex < itemB.position.positionIndex
        );

        newTaskRowsAtIndex[columnIndex] = newTasksAtColumnIndex;
      }

      return { ...tasksRows, [rowIndex]: newTaskRowsAtIndex };
    }
  }, {});

  console.log("data => ", data);

  // .singleColumn {
  //     grid-template-columns: 1fr;
  //   }
  //
  // .leftColumnTask {
  //     grid-column: 1/2;
  //   }
  //
  // .rightColumnTask {
  //     grid-column: 2/3;
  //   }

  return (
    <Box
      sx={{
        display: "grid",
        gridAutoFlow: "row",
        gridGap: 16,
        alignItems: "flex-start",
      }}
    >
      {Object.entries(data).map(([rowIndex, columns]) => (
        <Box>
          {rowIndex + 1}

          <Box
            key={rowIndex}
            sx={{
              gridRow: `${Number(rowIndex) + 1} / ${Number(rowIndex) + 2}`,
              display: "grid",
              gridGap: 4,
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            {Object.entries(columns).map(([columnIndex, items]) => (
              <Box
                key={columnIndex}
                sx={{
                  gridColumn: `${Number(columnIndex) + 1} / ${
                    Number(columnIndex) + 2
                  }`,
                  display: "grid",
                  gridGap: 4,
                  gridTemplateColumns: "1fr",
                  gridAutoFlow: "row",
                  gridAutoRows: "1fr",
                  alignItems: "flex-start",
                }}
              >
                {items.map((item) => (
                  <Box
                    sx={{
                      background: rowIndex % 2 === 0 ? "#d6df28" : "#f15",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "baseline",
                      }}
                    >
                      {/*Move that to whole section instead every element*/}
                      <Box
                        sx={{
                          border: "1px solid $main-bg",
                          padding: 4,
                          background: "#555",
                          color: "#fff",
                          borderRadius: 6,
                          marginRight: 8,
                        }}
                      >
                        #{Number(rowIndex) + 1}
                      </Box>

                      {/*TODO: do me*/}
                      {/*{task.dogs.length === 0 && (*/}
                      {/*  <>Brak wybranych psów do tego zadania</>*/}
                      {/*)}*/}
                      {/*TODO: need dogs for that*/}
                      {/*{task.dogs.map((dog) => (*/}
                      {/*  <Dog*/}
                      {/*    name={dog.name}*/}
                      {/*    key={dog.id}*/}
                      {/*    hasTwoColumns={hasTwoColumns}*/}
                      {/*  />*/}
                      {/*))}*/}

                      <Box>dogs later one here</Box>
                    </Box>

                    <Box>Description here</Box>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Tasks;
