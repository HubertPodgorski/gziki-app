import { SelectOption } from "./types";

export enum EventType {
  TRAINING = "TRAINING",
  COMPETITION = "COMPETITION",
  SEMINARY = "SEMINARY",
}

const eventTypes: EventType[] = [
  EventType.TRAINING,
  EventType.COMPETITION,
  EventType.SEMINARY,
];

const getEventTypeLabelByType = (eventType: EventType) => {
  switch (eventType) {
    case EventType.COMPETITION:
      return "Competition";
    case EventType.SEMINARY:
      return "Seminary";
    case EventType.TRAINING:
      return "Training";
    default:
      return "";
  }
};

export const eventTypeOptions: SelectOption[] = eventTypes.map((type) => ({
  value: type,
  label: getEventTypeLabelByType(type),
}));
