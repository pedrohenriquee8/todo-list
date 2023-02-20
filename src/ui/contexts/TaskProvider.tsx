import { PropsWithChildren, useCallback, useMemo, useState } from "react";

import Task from "../../core/domain/models/Task";
import TaskService from "../../core/services/TaskService";
import TaskAPI from "../../infra/api/TaskAPI";
import { TaskCTX } from "./TaskCTX";

export function TaskProvider({ children }: PropsWithChildren) {
    const [data, setData] = useState<Array<Task>>();
    const service = useMemo(() => new TaskService(new TaskAPI), []);

    const fetchTasks = useCallback(async () => {
        try {
            const tasks = await service.fetch();
            setData(tasks);
        } catch (e) {
            console.error(e);
            setData([]);
        }
    }, []);

    const createTask = useCallback(async (task: Task): Promise<boolean> => {
        try {
            await service.create(task);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }, []);

    const updateTask = useCallback(async (taskId: number, task: Task): Promise<boolean> => {
        try {
            await service.update(taskId, task);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }, []);

    const deleteTask = useCallback(async (taskId: number): Promise<boolean> => {
        try {
            await service.delete(taskId);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }, []);

    return (
        <TaskCTX.Provider value={{ data, fetchTasks, createTask, updateTask, deleteTask }}>
            {children}
        </TaskCTX.Provider>
    );
}