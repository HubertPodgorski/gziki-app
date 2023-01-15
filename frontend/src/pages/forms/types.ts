import { Dog, Position } from "../../helpers/types";

export interface CreateEditTaskFormType {
  description: string;
  dogs: string[];
  position: Position;
}

export interface CreateEditTaskRequestType {
  description: string;
  dogs: Dog[];
  position: Position;
}
