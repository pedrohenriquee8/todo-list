import { ChangeEvent, FormEvent, useContext, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Clock, Pencil, Trash } from "phosphor-react";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [descriptionCurrentTask, setDescriptionCurrentTask] = useState<string>("");

    const formatCreatedTaskDate = format(
        publishedAt,
        "d'/'LL HH:mm",
        { locale: ptBR }
    )

    function successMessageWhenTaskEdited() {
        toast.info('Tarefa editada com sucesso', {
            position: "top-right",
            autoClose: 3500,
            closeOnClick: true,
            pauseOnHover: false,
            theme: "dark",
        });
    }

    function errorMessageWhenTaskEdited() {
        toast.error('Não foi possível editar a tarefa', {
            position: "top-right",
            autoClose: 3500,
            closeOnClick: true,
            pauseOnHover: false,
            theme: "dark",
        });
    }

    function successMessageWhenTaskDeleted() {
        toast.info('Tarefa deletada com sucesso', {
            position: "top-right",
            autoClose: 3500,
            closeOnClick: true,
            pauseOnHover: false,
            theme: "dark",
        });
    }

    function errorMessageWhenTaskDeleted() {
        toast.error('Tarefa deletada com sucesso', {
            position: "top-right",
            autoClose: 3500,
            closeOnClick: true,
            pauseOnHover: false,
            theme: "dark",
        });
    }


    function handleChangeTask(event: ChangeEvent<HTMLTextAreaElement>) {
        setDescriptionCurrentTask(event.target.value);
    }

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

    async function handleDeleteTask() {
        const result = await deleteTask(id);

        if (result) {
            successMessageWhenTaskDeleted();
        } else {
            errorMessageWhenTaskDeleted();
        }
    }

    async function handleEditCurrentTask(event: FormEvent) {
        event.preventDefault();

        const currentTaskEdited = {
            description: descriptionCurrentTask,
        }

        const task = Task.fromForm(currentTaskEdited);
        const result = await updateTask(id, task);

        if (result) {
            setDescriptionCurrentTask("");
            successMessageWhenTaskEdited();
        } else {
            errorMessageWhenTaskEdited();
        }

        setOpenDialog(!openDialog);
    }

    function handleOpenDialogWithTaskInfo() {
        return (
            <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
                <Dialog.Portal>
                    <Dialog.Overlay className={styles.overlayDialog} />
                    <Dialog.Content className={styles.contentDialog}>
                        <form onSubmit={handleEditCurrentTask}>
                            <textarea
                                placeholder="Edite sua tarefa..."
                                value={descriptionCurrentTask}
                                onChange={handleChangeTask}
                                required
                            />

                            <button type="submit">Concluir</button>
                        </form>
                    </Dialog.Content>
                </Dialog.Portal>

                <ToastContainer />
            </Dialog.Root>

        );
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
                    {!done &&
                        <button onClick={() => setOpenDialog(!openDialog)}>
                            <Pencil size={18} />
                        </button>
                    }

                    <button onClick={handleDeleteTask}>
                        <Trash size={18} />
                    </button>
                </div>

                <div className={styles.infoPublishedTask}>
                    <Clock size={14} />
                    <span>{formatCreatedTaskDate}</span>
                </div>
            </div>

            {openDialog && handleOpenDialogWithTaskInfo()}
        </article>
    );
}