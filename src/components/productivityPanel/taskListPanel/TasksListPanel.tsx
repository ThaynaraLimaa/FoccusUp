import styles from './TasksListPanel.module.css'
import Task from "./Task"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FormEvent, useRef, useState } from 'react'
import useLocalStorage from '../../../hooks/useLocalStorage'
import { LocalStorageKeys } from '../../../constants/localStorageKeys'
import { v4 as uuid4 } from 'uuid'
import {Task as TaskData} from '../../../types/tasks'

type TaskListPanelProps = {
    panelIndex: number,
    selectedIndex: number
}

export default function TaskListPanel({ panelIndex, selectedIndex }: TaskListPanelProps) {
    const [tasks, setTasks] = useLocalStorage<TaskData[]>(LocalStorageKeys.Tasks, [] as TaskData[])
    const [isAdding, setIsAdding] = useState(false);
    const taskNameRef = useRef<HTMLInputElement>(null);
    const durationRef = useRef<HTMLInputElement>(null);

    const handleSubmitTask = (e: FormEvent) => {
        e.preventDefault();
        console.log(createNewTask(taskNameRef.current!.value, durationRef.current!.value))
       setTasks(prev => [
        ...prev,
        createNewTask(taskNameRef.current!.value, durationRef.current!.value)
       ])
        
    }

    const handleDeleteTask = (id: string) => {
        setTasks(prev => prev.filter(task => task.id !== id))
    }

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
                <span>3/5</span>
            </div>

            <ul className={styles.taskListContainer}>
                {tasks.map(task => (
                    <Task {...task} handleDeleteTask={handleDeleteTask} key={task.id} />
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

function formartDuration(min: number) {
    if (min == 0) {
        return '--'
    }

    if (min < 60) {
        return `${min}m`
    }

    const hours = Math.floor(min / 60);
    const minutes = min % 60

    if (minutes !== 0) {
        return `${hours}h${minutes}m`

    } else {
        return `${hours}h`
    }
}

function createNewTask(name: string, duration: string | undefined): TaskData {
    const formatedDuration = duration == undefined ? '--' : formartDuration(Number(duration))
    return {
        id: uuid4(), 
        name: name,
        duration: formatedDuration, 
        CDRValue: 1, 
        completed: false
    }
}