import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Reward.module.css'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Reward as RewardData } from '../../../types/rewards';

type RewardProps = {
    hanldeCollectReward: (id: string) => void,
    handleDeleteReward: (id: string) => void
} & RewardData

export default function Reward({ id, name, cost, isCollected, hanldeCollectReward, handleDeleteReward }: RewardProps) {
    return (
        <li className={styles.reward}>
            <label htmlFor={`${id}-checkbox`} className={styles.label}>
                <input
                    type="checkbox"
                    name={`${id}-checkbox`}
                    id={`${id}-checkbox`}
                    className={styles.checkbox}
                    checked={isCollected}
                    onChange={() => hanldeCollectReward(id)}
                />
                <span className={styles.customCheckbox}></span>
                {name}
            </label>
            <div className={styles.left}>
                <p aria-label={`reward cost: ${cost}`} className={styles.cost}>{cost} CDR</p>
                <button className={styles.deleteButton} aria-label={`delete reward ${name}`} onClick={() => handleDeleteReward(id)} style={isCollected ? {display: 'none'} : {display: 'block'}}><FontAwesomeIcon icon={faTrash} /></button>
            </div>
        </li>
    )
}