import { useContext, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Clock, Pencil, Trash } from "phosphor-react";

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
    const { updateTask, deleteTask } = useContext(TaskCTX);

    const [checkStatus, setCheckStatus] = useState<boolean>(done);

    const formatCreatedTaskDate = format(
        publishedAt,
        "d'/'LL HH:mm",
        { locale: ptBR }
    )

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

    function handleEditTask() {

    }

    function handleDeleteTask() {
        deleteTask(id);
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

            <div className={styles.infoTask}>
                <div className={styles.buttonsEditTask}>
                    {!done ? <button onClick={handleEditTask}>
                        <Pencil size={18} />
                    </button> : []}

                    <button onClick={handleDeleteTask}>
                        <Trash size={18} />
                    </button>
                </div>

                <div className={styles.infoPublishedTask}>
                    <Clock size={14} />
                    <span>{formatCreatedTaskDate}</span>
                </div>
            </div>
        </article>
    );
}