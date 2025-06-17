import styles from './TasksListPanel.module.css'
import Task from "./Task"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FormEvent, useContext, useRef, useState } from 'react'
import { DayInformationContext } from '../../../context/DayInformationContext'
import { TasksContext } from '../../../context/TasksContext'

type TaskListPanelProps = {
    panelIndex: number,
    selectedIndex: number
}

export default function TaskListPanel({ panelIndex, selectedIndex }: TaskListPanelProps) {
    const { tasks, totalTasks, completedTasks, addTask, toggleComplete, deleteTask } = useContext(TasksContext)
    const { gainCredits } = useContext(DayInformationContext);
    const [isAdding, setIsAdding] = useState(false);
    const taskNameRef = useRef<HTMLInputElement>(null);
    const durationRef = useRef<HTMLInputElement>(null);

    const handleSubmitTask = (e: FormEvent) => {
        e.preventDefault();
        addTask(taskNameRef.current!.value, durationRef.current!.value)
            taskNameRef.current!.value = '';
            durationRef.current!.value = '';
            taskNameRef.current?.focus(); 
    }

    const handleToggleComplete = (id: string) => {
        const completedTask = toggleComplete(id); 

        if (completedTask?.completed === true) {
            gainCredits(completedTask.CDRValue, 'gaining');
        }

        if (completedTask?.completed === false) {
            gainCredits(completedTask.CDRValue, 'returning');
        }
    }

    const handleDeleteTask = (id: string) => { deleteTask(id) }; 

    return (
        <div
            className={styles.taskListPanelContainer}
            hidden={selectedIndex !== panelIndex}
            style={{ display: selectedIndex !== panelIndex ? 'none' : 'flex' }}
            role='tabpanel'
            id={`productivity-tabpanel-${panelIndex}`}
            aria-labelledby={`task-list-tab`}

        >
            <div className={styles.header}>
                <h2>Today's Task</h2>
                <span>{completedTasks}/{totalTasks}</span>
            </div>

            <ul className={styles.taskListContainer}>
                {tasks.map(task => (
                    <Task {...task} handleDeleteTask={handleDeleteTask} handleToggleTaskComplete={handleToggleComplete} key={task.id} />
                ))}
            </ul>

            {isAdding && (
                <form className={styles.newTaskForm} onSubmit={handleSubmitTask}>
                    <label htmlFor="newTaskName" className={styles.labels}>
                        Task
                        <input type="text" id='newTaskName' className={`${styles.inputs} ${styles.taskInput}`} required ref={taskNameRef} />
                    </label>

                    <label htmlFor="newTaskduration" className={styles.labels}>
                        Duration
                        <input type="number" name="newTaskduration" id="newTaskduration" className={`${styles.inputs} ${styles.durationInput}`} ref={durationRef} />
                        <span className={styles.minuteSpan} style={{ fontSize: '0.9em', color: '#666' }}>min</span>
                    </label>

                    <div className={styles.formActions}>
                        <button className={styles.submitTask} type='submit'>Add</button>
                        <button className={styles.cancelBtn} onClick={() => setIsAdding(false)}>Cancel</button>
                    </div>
                </form>
            )}

            <button className={styles.addTaskBtn} onClick={() => setIsAdding(true)} style={{ display: isAdding ? 'none' : 'block' }}>
                <FontAwesomeIcon icon={faPlus} /> Add task
            </button>
        </div>
    )
}
