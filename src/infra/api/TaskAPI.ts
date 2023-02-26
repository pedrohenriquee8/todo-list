import { BackendClient } from "./BackendClient";
import Task from "../../core/domain/models/Task";
import TaskAdapter from "../../core/interfaces/adapter/TaskAdapter";
import APIResponse from "../../core/domain/types/http/APIResponse";

class TaskAPI extends TaskAdapter {
    async fetch(): Promise<Task[]> {
        const response = await BackendClient.get<APIResponse[]>("/tasks");
        return response.data.map(Task.fromJSON);
    }
    async create(task: Task): Promise<void> {
        await BackendClient.post("/tasks", task.toJSON());
    }
    async update(taskId: number, task: Task): Promise<void> {
        await BackendClient.patch(`/tasks/${taskId}`, task.toJSON());
    }
    async delete(taskId: number): Promise<void> {
        await BackendClient.delete(`/tasks/${taskId}`);
    }
}

export default TaskAPI;