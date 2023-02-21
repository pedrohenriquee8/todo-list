import { createContext } from "react";
import Task from "../../core/domain/models/Task";

interface Props {
    data?: Array<Task>;
    tasksDone: number;
    fetchTasks(): Promise<void>;
    createTask(task: Task): Promise<boolean>;
    updateTask(taskId: number, task: Task): Promise<boolean>;
    deleteTask(taskId: number): Promise<boolean>;
}

export const TaskCTX = createContext({} as Props);