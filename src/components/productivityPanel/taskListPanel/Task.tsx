import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Task.module.css'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import useLocalStorage from '../../../hooks/useLocalStorage'
import { LocalStorageKeys } from '../../../constants/localStorageKeys'
import { Task as TaskData } from '../../../types/tasks'


type TaskProps = {
    handleDeleteTask:  (id: string) => void
} & TaskData

export default function Task({ id, name, duration, CDRValue, completed, handleDeleteTask }: TaskProps) {
    const [isChecked, setIsChecked] = useState(completed);
    const [tasks, setTasks] = useLocalStorage(LocalStorageKeys.Tasks, [] as TaskData[]); 

    const handleChangeCompleteState = () => {
        setIsChecked(prev => !prev)
    }
    
    return (
        <li className={styles.task}>
            <div>
                <input 
                type="checkbox" 
                name={`${id}-checkbox`} 
                id={`${id}-checkbox`} 
                className={styles.checkbox} 
                checked={isChecked} 
                onChange={handleChangeCompleteState}/>
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
