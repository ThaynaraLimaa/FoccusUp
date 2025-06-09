import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Task.module.css'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

type TaskProps = {
    id: string,
    name: string,
    duration: string,
    CDRValue: number,
    completed: boolean
}

export default function Task({ id, name, duration, CDRValue, completed }: TaskProps) {
    const [isChecked, setIsChecked] = useState(completed);

    const handleChangeCompleteState = () => {
        setIsChecked(prev => !prev)
    }

    const handleDeleteTask = () => {
        alert("I'm still working on this, this task won't be deleted for now")
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
                <button className={styles.deleteButton} aria-label={`delete task ${name}`} onClick={handleDeleteTask}><FontAwesomeIcon icon={faTrash} /></button>
            )}
        </li>
    )
}
