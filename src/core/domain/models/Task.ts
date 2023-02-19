import APIResponse from "../types/http/APIResponse";
import Model from "./model";

class Task extends Model {
    private _id?: string;
    private _description: string;
    private _done: boolean;
    private _publishedAt: number;

    constructor() {
        super();
        this._description = "";
        this._done = false;
        this._publishedAt = Date.now();
    }

    static fromJSON(json: APIResponse): Task {
        const task = new Task();
        task._id = String(json["id"]);
        task._description = String(json["description"]);
        task._done = Boolean(json["done"]);
        task._publishedAt = Number(json["publishedAt"]);
        return task;
    }

    override toJSON(): APIResponse {
        const dto = {} as APIResponse;
        dto["description"] = this._description;
        dto["done"] = this._done;
        dto["publishedAt"] = this._publishedAt;
        return dto;
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