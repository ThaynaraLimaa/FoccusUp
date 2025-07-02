import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import Reward from './Reward';
import styles from './RewardsPanel.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { DayInformationContext } from '../../../context/DayInformationContext';
import { RewardsContext } from '../../../context/RewardsContext';

type RewardsPanelProps = {
    panelIndex: number,
    selectedIndex: number
}

export default function RewardsPanel({ panelIndex, selectedIndex }: RewardsPanelProps) {
    const [isAdding, setIsAdding] = useState(false);
    const rewardRef = useRef<HTMLInputElement>(null);
    const { rewards, addReward, toogleCollectReward, deleteReaward } = useContext(RewardsContext);
    const { creditsAvailable, spendCredits } = useContext(DayInformationContext);

    useEffect(() => {
        if (rewardRef.current) rewardRef.current.focus();
    }, [isAdding])

    const handleSubmitReward = (e: FormEvent) => {
        e.preventDefault();
        addReward(rewardRef.current!.value); 
        setIsAdding(false)
    }

    const handleCollectReward = (id: string) => {
        const updatedReward = toogleCollectReward(id); 

        if(updatedReward?.isCollected === true) {
            spendCredits(updatedReward.cost, "spending");
        }

        if(updatedReward?.isCollected === false) {
            spendCredits(updatedReward.cost, "returning"); 
        }
    }

    const handleDeleteReward = (id: string) => deleteReaward(id)

    return (
        <div
            className={styles.rewardsPanelContainer}
            role='tabpanel'
            hidden={selectedIndex !== panelIndex}
            style={{ display: selectedIndex !== panelIndex ? 'none' : 'flex' }}
            id={`productivity-tabpanel-${panelIndex}`}
            aria-labelledby='rewards-tab'
        >
            {rewards.length < 1 && isAdding == false ? (
                <div className={styles.noRewardContainer}>
                    <h1>No rewards here yet... </h1>
                    <p>Let's add some motivation!</p>
                    <button onClick={() => setIsAdding(true)}><FontAwesomeIcon icon={faPlus} aria-label='plus icon' /> Add reward</button>
                </div>
            ) : (
                <>
                    <div className={styles.header}>
                        <h2>My Rewards</h2>
                        <span>Today's Credits: {creditsAvailable} CDR</span>
                    </div>
                    <ul className={styles.rewardListContainer}>
                        {rewards.map(reward => (
                            <Reward
                                {...reward}
                                isDisabled={reward.cost > creditsAvailable && !reward.isCollected}
                                hanldeCollectReward={handleCollectReward}
                                handleDeleteReward={handleDeleteReward}
                                key={reward.id} />
                        ))}
                    </ul>
                </>
            )}

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

            <button className={styles.addRewardBtn} onClick={() => setIsAdding(true)} style={{ display: isAdding || rewards.length < 1 ? 'none' : 'block' }}>
                <FontAwesomeIcon icon={faPlus} /> Add New Reward
            </button>
        </div>
    )
}


