import { FormEvent, useRef, useState } from 'react';
import Reward from './Reward';
import styles from './RewardsPanel.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const rewardTempList = [
    { id: '10', name: "Watch a Movie", cost: 6, isCollected: false },
    { id: '20', name: "Order a Special Dessert", cost: 6, isCollected: true },
    { id: '30', name: "Buy a Small Gift", cost: 6, isCollected: false }
];

type RewardsPanelProps = {
    panelIndex: number,
    selectedIndex: number
}

export default function RewardsPanel({ panelIndex, selectedIndex }: RewardsPanelProps) {
    const [isAdding, setIsAdding] = useState(false); 
    const rewardRef = useRef<HTMLInputElement>(null); 

    const handleSubmitReward = (e: FormEvent) => {
        e.preventDefault();
        alert("I'm working on this, this reward won't be added for now")
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
                {rewardTempList.map(reward => (
                    <Reward {...reward} key={reward.id} />
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