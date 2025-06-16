import { FormEvent, useRef, useState } from 'react';
import Reward from './Reward';
import styles from './RewardsPanel.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { LocalStorageKeys } from '../../../constants/localStorageKeys';
import { Reward as RewardData} from '../../../types/rewards';
import { v4 as uuid4 } from 'uuid';

type RewardsPanelProps = {
    panelIndex: number,
    selectedIndex: number
}

export default function RewardsPanel({ panelIndex, selectedIndex }: RewardsPanelProps) {
    const [isAdding, setIsAdding] = useState(false); 
    const rewardRef = useRef<HTMLInputElement>(null); 
    const [rewards, setRewards] = useLocalStorage(LocalStorageKeys.Reward, [] as RewardData[])

    const handleSubmitReward = (e: FormEvent) => {
        e.preventDefault();
        setRewards((prev) => [
            ...prev,
            createNewReward(rewardRef.current!.value)
        ]); 
    }

    const handleCollectReward = (id: string) => {
        const updatedRewards = rewards.map(reward => {
            return reward.id == id ? {...reward, isCollected: !reward.isCollected} : reward
        });

        setRewards(updatedRewards);
    }

    const handleDeleteReward = (id: string) => {
        const updatedRewards = rewards.filter(reward => reward.id !== id);
        setRewards(updatedRewards);
    }

    return (
        <div
            className={styles.rewardsPanelContainer}
            role='tabpanel'
            hidden={selectedIndex !== panelIndex}
            style={{ display: selectedIndex !== panelIndex ? 'none' : 'flex' }}
            id={`productivity-tabpanel-${panelIndex}`}
            aria-labelledby='rewards-tab'
        >
            <div className={styles.header}>
                <h2>My Rewards</h2>
                <span>Today's Credits: 12 CDR</span>
            </div>
            <ul className={styles.taskListContainer}>
                {rewards.map(reward => (
                    <Reward {...reward} hanldeCollectReward={handleCollectReward} handleDeleteReward={handleDeleteReward} key={reward.id} />
                ))}
            </ul>
            
            {isAdding && (
                <form className={styles.newRewardForm} onSubmit={handleSubmitReward}>
                    <label htmlFor="newTaskName" className={styles.label}>
                        Reward
                        <input type="text" id='newTaskName' className={styles.input} required ref={rewardRef} />
                    </label>

                    <div className={styles.formActions}>
                        <button className={styles.submitBtn} type='submit'>Add</button>
                        <button className={styles.cancelBtn} onClick={() => setIsAdding(false)}>Cancel</button>
                    </div>
                </form>
            )}

            <button className={styles.addRewardBtn} onClick={() => setIsAdding(true)} style={{ display: isAdding ? 'none' : 'block' }}>
                <FontAwesomeIcon icon={faPlus} /> Add New Reward
            </button>
        </div>
    )
}


function createNewReward(name: string): RewardData {
    return {
        id: uuid4(), 
        name: name,
        cost: 6, 
        isCollected: false
    }
}