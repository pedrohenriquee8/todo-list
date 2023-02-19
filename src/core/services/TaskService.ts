import Task from "../domain/models/Task";
import ITaskService from "../interfaces/services/ITaskService";

class TaskService extends ITaskService {
    fetch(): Promise<Task[]> {
        return this.adapter.fetch();
    }
    create(task: Task): Promise<void> {
        return this.adapter.create(task);
    }
    update(taskId: number, task: Task): Promise<void> {
        return this.adapter.update(taskId, task);
    }
    delete(taskId: number): Promise<void> {
        return this.adapter.delete(taskId);
    }
}

export default TaskService;