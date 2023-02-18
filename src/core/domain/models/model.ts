import APIResponse from "../types/http/APIResponse";

abstract class Model {
    abstract toJSON(): APIResponse;

    static fromJSON(_: Record<string, unknown>): Model {
        throw new Error("You need to implement the fromJSON method");
    }
}

export default Model;