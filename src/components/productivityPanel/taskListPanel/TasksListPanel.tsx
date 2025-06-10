import styles from './TasksListPanel.module.css'
import Task from "./Task"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FormEvent, useRef, useState } from 'react'

const tempTask = [
    { id: '1', name: "Finish Project UI", duration: "1h", CDRValue: 1, completed: true },
    { id: '2', name: "Write Unit Tests", duration: "2h30m", CDRValue: 1, completed: true },
    { id: '3', name: "Debug API Integration", duration: "1h", CDRValue: 1, completed: true },
    { id: '4', name: "Research New Frameworks", duration: "--", CDRValue: 1, completed: false },
    { id: '5', name: "Read news about Programming", duration: "30m", CDRValue: 1, completed: false },
]

type TaskListPanelProps = {
    panelIndex: number,
    selectedIndex: number
}

export default function TaskListPanel({panelIndex, selectedIndex}: TaskListPanelProps) {
    const [isAdding, setIsAdding] = useState(false);
    const taskNameRef = useRef<HTMLInputElement>(null);
    const durationRef = useRef<HTMLInputElement>(null);

    const handleSubmitTask = (e: FormEvent) => {
        e.preventDefault();
        alert("I'm still working on this, this task won't be added for now")
    }

    return (

        <div
            className={styles.taskListPanelContainer}
            hidden={selectedIndex !== panelIndex}
            style={{display: selectedIndex !== panelIndex ? 'none' : 'flex'}}
            role='tabpanel'
            id={`productivity-tabpanel-${panelIndex}`}
            aria-labelledby={`task-list-tab`}

        >
            <div className={styles.header}>
                <h2>Today's Task</h2>
                <span>3/5</span>
            </div>

            <ul className={styles.taskListContainer}>
                {tempTask.map(task => (
                    <Task {...task} key={task.id} />
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

// This function will be used later
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