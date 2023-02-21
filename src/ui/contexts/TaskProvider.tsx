import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";

import Task from "../../core/domain/models/Task";
import TaskService from "../../core/services/TaskService";
import TaskAPI from "../../infra/api/TaskAPI";
import { TaskCTX } from "./TaskCTX";

export function TaskProvider({ children }: PropsWithChildren) {
    const [data, setData] = useState<Array<Task>>();
    const [tasksDone, setTasksDone] = useState<number>(0);
    const service = useMemo(() => new TaskService(new TaskAPI), []);

    function getTasksDone(tasks: Task[]) {
        let counterTasks = tasksDone;

        tasks.map(task => {
            if (task.done) {
                counterTasks++;
            }
        });

        setTasksDone(counterTasks);
    }

    const fetchTasks = useCallback(async () => {
        try {
            const tasks = await service.fetch();

            getTasksDone(tasks);
            setData(tasks);
        } catch (e) {
            console.error(e);
            setData([]);
        }
    }, []);

    const createTask = useCallback(async (task: Task): Promise<boolean> => {
        try {
            await service.create(task);
            const tasks = await service.fetch();

            getTasksDone(tasks);
            setData(tasks);

            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }, []);

    const updateTask = useCallback(async (taskId: number, task: Task): Promise<boolean> => {
        try {
            await service.update(taskId, task);
            const tasks = await service.fetch();

            getTasksDone(tasks);
            setData(tasks);

            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }, []);

    const deleteTask = useCallback(async (taskId: number): Promise<boolean> => {
        try {
            await service.delete(taskId);
            const tasks = await service.fetch();

            getTasksDone(tasks);
            setData(tasks);

            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }, []);

    return (
        <TaskCTX.Provider value={{ data, tasksDone, fetchTasks, createTask, updateTask, deleteTask }}>
            {children}
        </TaskCTX.Provider>
    );
}