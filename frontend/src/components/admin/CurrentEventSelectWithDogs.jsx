import React, { useCallback, useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormSelect from "../inputs/FormSelect";
import { getFormattedDate } from "../../helpers/calendar";
import ChipsGrid from "../ChipsGrid";
import { Chip, useTheme } from "@mui/material";
import { AppContext } from "../../contexts/AppContext";

const CurrentEventSelectWithDogs = () => {
  const theme = useTheme();
  const { events, tasks, dogs } = useContext(AppContext);

  const formMethods = useForm({
    defaultValues: { event: [] },
  });

  const selectedEvent = formMethods.watch("event");

  const selectedEventDogs = useMemo(() => {
    if (!selectedEvent) return [];

    const event = events.find(({ _id }) => _id === selectedEvent);

    if (!event) return [];

    return event.dogs;
  }, [selectedEvent, events]);

  const isDogPlanned = useCallback(
    (dogId) =>
      tasks.some(({ dogs }) =>
        dogs.some(({ _id: taskDogId }) => dogId === taskDogId)
      ),
    [tasks]
  );

  return (
    <>
      <FormProvider {...formMethods}>
        <FormSelect
          multi={false}
          name="event"
          label="Event"
          options={[
            { value: "", label: "Brak" },
            ...events.map(({ name, _id: value, date }) => ({
              value,
              label: `${name} ${getFormattedDate(date)}`,
            })),
          ]}
        />
      </FormProvider>

      {selectedEventDogs.length > 0 && (
        <ChipsGrid>
          {dogs.map(({ _id, name }) => (
            <Chip
              label={name}
              key={_id}
              color={isDogPlanned(_id) ? "success" : "error"}
            />
          ))}
        </ChipsGrid>
      )}
    </>
  );
};

export default CurrentEventSelectWithDogs;
