import APIResponse from "../types/http/APIResponse";
import Model from "./model";

class Task extends Model {
    private _id?: number;
    private _description: string;
    private _done: boolean;
    private _publishedAt: number;

    constructor() {
        super();
        this._description = "";
        this._done = false;
        this._publishedAt = Date.now();
    }

    override toJSON(): APIResponse {
        const dto = {} as APIResponse;
        dto["description"] = this._description;
        dto["done"] = this._done;
        dto["publishedAt"] = this._publishedAt;
        return dto;
    }

    static fromJSON(json: APIResponse): Task {
        const task = new Task();
        task._id = Number(json["id"]);
        task._description = String(json["description"]);
        task._done = Boolean(json["done"]);
        task._publishedAt = Number(json["publishedAt"]);
        return task;
    }

    static fromForm(json: APIResponse): Task {
        const task = new Task();
        task._description = String(json["description"]);
        task._done = Boolean(json["done"]);
        task._publishedAt = Number(json["publishedAt"]);
        return task;
    }

    get id() {
        return this._id;
    }

    get description() {
        return this._description;
    }

    get done() {
        return this._done;
    }

    get publishedAt() {
        return this._publishedAt;
    }
}

export default Task;