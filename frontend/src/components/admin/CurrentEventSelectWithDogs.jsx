import React, { useCallback, useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormSelect from "../inputs/FormSelect";
import { getFormattedDate } from "../../helpers/calendar";
import ChipsGrid from "../ChipsGrid";
import { Chip } from "@mui/material";
import { AppContext } from "../../contexts/AppContext";

const CurrentEventSelectWithDogs = () => {
  const { events, tasks, dogs } = useContext(AppContext);

  const formMethods = useForm({
    defaultValues: { event: [] },
  });

  const selectedEvent = formMethods.watch("event");

  const selectedEventDogs = useMemo(() => {
    if (!selectedEvent) return [];

    const event = events.find(({ _id }) => _id === selectedEvent);

    if (!event) return [];

    return event.dogs.map((eventDogData) => {
      const foundDog = dogs.find(
        ({ _id: dogId }) => eventDogData._id === dogId
      );

      if (!foundDog) return eventDogData;

      return { ...foundDog, status: eventDogData.status };
    });
  }, [selectedEvent, events, dogs]);

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
          {selectedEventDogs.map(({ _id, name, status }) => (
            <Chip
              label={name}
              key={_id}
              color={isDogPlanned(_id, status) ? "success" : "error"}
            />
          ))}
        </ChipsGrid>
      )}
    </>
  );
};

export default CurrentEventSelectWithDogs;
