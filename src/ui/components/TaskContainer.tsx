import { useContext, useState } from "react";
import { Trash } from "phosphor-react";

import Task from "../../core/domain/models/Task";
import { TaskCTX } from "../contexts/TaskCTX";

import checkOn from "../assets/checkOn.svg";
import checkOff from "../assets/checkOff.svg";

import styles from "./TaskContainer.module.css";


interface TaskProps {
    id: number;
    description: string;
    done: boolean;
    publishedAt: number;
}

export function TaskContainer({ id, description, done, publishedAt }: TaskProps) {
    const { updateTask } = useContext(TaskCTX);
    const [checkStatus, setCheckStatus] = useState<boolean>(done);

    function taskCompletedOrNotCompleted() {
        const statusTaskCompleted = !checkStatus;

        const updatedTask = {
            id: id,
            description: description,
            done: statusTaskCompleted,
            publishedAt: publishedAt,
        };

        setCheckStatus(statusTaskCompleted);
        updateTask(id, Task.fromJSON(updatedTask));
    }

    return (
        <article className={styles.taskContainer}>
            <button onClick={taskCompletedOrNotCompleted}>
                {checkStatus ?
                    <img src={checkOn} alt="Check on" /> :
                    <img src={checkOff} alt="Check off" />
                }
            </button>
            <span className={!checkStatus ? styles.descriptionTaskDone : styles.descriptionTaskNotDone}>{description}</span>
            <Trash />
        </article>
    );
}