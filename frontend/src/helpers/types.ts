export enum Roles {
  ADMIN = "ADMIN",
}

export interface User {
  _id: string;

  dogs: Dog[];
  name: string;
  email: string;
  password: string;
  // TODO: add enums
  roles: Roles[];
}

export interface Task {
  _id: string;

  dogs: Dog[];
  description: string;
  position: Position;
}

export interface Position {
  columnIndex: number;
  rowIndex: number;
  positionIndex: number;
}

export interface Dog {
  _id: string;
  name: string;
}

export interface Event {
  _id: string;
  date: string;
  name: string;
  dogs: { status: string; _id: string }[];
  users: {
    status: string;
    _id: string;
  }[];
}

export interface DogTask {
  _id: string;
  name: string;
}

export interface EventTemplate {
  _id: string;
  name: string;
  tasks: Task[];
}
