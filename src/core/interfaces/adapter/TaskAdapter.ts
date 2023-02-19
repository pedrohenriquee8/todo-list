import Task from "../../domain/models/Task";

abstract class TaskAdapter {
    abstract fetch(): Promise<Array<Task>>;
    abstract create(task: Task): Promise<void>; 
    abstract update(taskId: number, task: Task): Promise<void>;
    abstract delete(taskId: number): Promise<void>;
}

export default TaskAdapter;