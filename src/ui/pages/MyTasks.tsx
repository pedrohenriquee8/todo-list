import { FormEvent, useContext, useEffect, useState } from "react";
import { PlusCircle } from "phosphor-react";

import { Header } from "../components/Header";
import { TaskCTX } from "../contexts/TaskCTX";
import { TaskContainer } from "../components/TaskContainer";

import clipboardIcon from "../assets/clipboard.svg";

import styles from "./MyTasks.module.css";

export function MyTasks() {
    const { data, fetchTasks } = useContext(TaskCTX);
    const [tasksDone, setTasksDone] = useState<number>(0);

    useEffect(() => {
        fetchTasks();
    }, []);

    function handleCreateNewTask(event: FormEvent) {
        event.preventDefault();
    }

    return (
        <div>
            <Header />

            <div onSubmit={handleCreateNewTask} className={styles.wrapper}>
                <form className={styles.formAddTask}>
                    <input type="text" placeholder="Adicione uma nova tarefa" />
                    <button>Criar <PlusCircle size={16} /></button>
                </form>

                <div className={styles.tasksInfo}>
                    <div className={styles.tasksCreatedAndCompleted}>
                        <div className={styles.tasksCreated}>
                            <p>Tarefas Criadas</p>
                            <span>0</span>
                        </div>
                        <div className={styles.tasksCompleted}>
                            <p>Concluídas</p>
                            {data! ? <span>{tasksDone} de {data.length}</span> : <span>0</span>}
                        </div>
                    </div>

                    {data! ? <div className={styles.haveTask}>
                        {data.map(task => {
                            return (
                                <TaskContainer
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