import { Dog, DogTask, EventTemplate, Task, User } from "../helpers/types";
import { Dispatch, SetStateAction } from "react";
import { Socket } from "socket.io-client";

export interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  setUser: Dispatch<SetStateAction<User>>;
  socket: Socket<any, any> | null;
  setSocket: (socket: Socket<any, any> | null) => void;
}

export interface AppContextType {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  dogs: Dog[];
  setDogs: Dispatch<SetStateAction<Dog[]>>;
  events: Event[];
  setEvents: Dispatch<SetStateAction<Event[]>>;
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  dogTasks: DogTask[];
  setDogTasks: Dispatch<SetStateAction<DogTask[]>>;
  eventTemplates: EventTemplate[];
  setEventTemplates: Dispatch<SetStateAction<EventTemplate[]>>;
}
