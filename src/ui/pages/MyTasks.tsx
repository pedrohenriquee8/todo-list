import { ChangeEvent, FormEvent, InvalidEvent, useContext, useEffect, useState } from "react";
import { PlusCircle } from "phosphor-react";

import Task from "../../core/domain/models/Task";
import { Header } from "../components/Header";
import { TaskCTX } from "../contexts/TaskCTX";
import { TaskContainer } from "../components/TaskContainer";

import clipboardIcon from "../assets/clipboard.svg";

import styles from "./MyTasks.module.css";

export function MyTasks() {
    const { data, tasksDone, fetchTasks, createTask } = useContext(TaskCTX);
    const [descriptionTask, setDescriptionTask] = useState<string>("");

    useEffect(() => {
        fetchTasks();
    }, []);

    function handleChangeTask(event: ChangeEvent<HTMLInputElement>) {
        setDescriptionTask(event.target.value);
    }

    async function handleCreateNewTask(event: FormEvent) {
        event.preventDefault();

        const taskCreatedNow = {
            description: descriptionTask,
            done: false,
            publishedAt: Date.now(),
        }

        const task = Task.fromForm(taskCreatedNow);
        const result = await createTask(task);

        if (result) {
            alert("Tarefa criada com sucesso!");
            setDescriptionTask("");
        } else {
            alert("Ocorreu um erro na criação!");
        }
    }

    return (
        <div>
            <Header />

            <div onSubmit={handleCreateNewTask} className={styles.wrapper}>
                <form className={styles.formAddTask}>
                    <input
                        type="text"
                        name="description"
                        placeholder="Adicione uma nova tarefa"
                        value={descriptionTask}
                        onChange={handleChangeTask}
                        required
                    />
                    <button>
                        Criar
                        <PlusCircle size={16} />
                    </button>
                </form>

                <div className={styles.tasksInfo}>
                    <div className={styles.tasksCreatedAndCompleted}>
                        <div className={styles.tasksCreated}>
                            <p>Tarefas Criadas</p>
                            <span>{data?.length}</span>
                        </div>
                        <div className={styles.tasksCompleted}>
                            <p>Concluídas</p>
                            {data! ? <span>{tasksDone} de {data?.length}</span> : <span>0</span>}
                        </div>
                    </div>

                    {data?.length ? <div className={styles.haveTask}>
                        {data.map(task => {
                            return (
                                <TaskContainer
                                    key={task.id!}
                                    id={task.id!}
                                    description={task.description}
                                    done={task.done}
                                    publishedAt={task.publishedAt}
                                />
                            );
                        })}
                    </div> : <div className={styles.registeredTasks}>
                        <img src={clipboardIcon} alt="Clipboard Icon" />
                        <div>
                            <p>Você ainda não tem tarefas cadastradas</p>
                            <span>Crie tarefas e organize seus itens a fazer</span>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
}