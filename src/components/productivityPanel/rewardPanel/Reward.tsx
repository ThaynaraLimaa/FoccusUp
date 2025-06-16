import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Reward.module.css'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Reward as RewardData} from '../../../types/rewards';

export default function Reward({ id, name, cost, isCollected }: RewardData) {
    const [isChecked, setIsChecked] = useState(isCollected);

    const handleChangeCollectedState = () => {
        setIsChecked(prev => !prev);
        // more actions will happen
    }

    const handleDeleteReward = () => {
        alert("I'm still working on this, this reward won't be deleted for now")
    }

    return (
        <li className={styles.reward}>
            <label htmlFor={`${id}-checkbox`} className={styles.label}>
                <input
                    type="checkbox"
                    name={`${id}-checkbox`}
                    id={`${id}-checkbox`}
                    className={styles.checkbox}
                    checked={isChecked}
                    onChange={handleChangeCollectedState}
                />
                <span className={styles.customCheckbox}></span>
                {name}
            </label>
            <div className={styles.left}>
                <p aria-label={`reward cost: ${cost}`} className={styles.cost}>{cost} CDR</p>
                <button className={styles.deleteButton} aria-label={`delete reward ${name}`} onClick={handleDeleteReward}><FontAwesomeIcon icon={faTrash} /></button>
            </div>

        </li>
    )
}