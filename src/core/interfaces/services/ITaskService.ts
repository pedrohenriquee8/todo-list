import Task from "../../domain/models/Task";
import TaskAdapter from "../adapter/TaskAdapter";

abstract class ITaskService {
    constructor(protected readonly adapter: TaskAdapter) {};

    abstract fetch(): Promise<Array<Task>>;
    abstract create(task: Task): Promise<void>; 
    abstract update(taskId: number, task: Task): Promise<void>;
    abstract delete(taskId: number): Promise<void>;
}

export default ITaskService;