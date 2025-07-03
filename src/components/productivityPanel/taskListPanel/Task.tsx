import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Task.module.css'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Task as TaskData } from '../../../types/tasks'

type TaskProps = {
    handleToggleTaskComplete: (id: string) => void,
    handleDeleteTask: (id: string) => void,
} & TaskData

export default function Task({ id, name, duration, CDRValue, completed, handleDeleteTask, handleToggleTaskComplete }: TaskProps) {
    return (
        <li className={styles.task}>
            <div className={styles.taskInfo}>
                <input
                    type="checkbox"
                    name={`${id}-checkbox`}
                    id={`${id}-checkbox`}
                    className={styles.checkbox}
                    checked={completed}
                    onChange={() => handleToggleTaskComplete(id)} />
                <label htmlFor={`${id}-checkbox`} className={styles.label}>
                    <span className={styles.customCheckbox}></span>
                    {name}
                </label>
                <p aria-label={`duration: ${duration}`} className={styles.duration}>{duration}</p>
            </div>
            {completed ? (
                <p>+ {CDRValue}CDR</p>
            ) : (
                <button className={styles.deleteButton} aria-label={`delete task ${name}`} onClick={() => handleDeleteTask(id)}><FontAwesomeIcon icon={faTrash} /></button>
            )}
        </li>
    )
}
