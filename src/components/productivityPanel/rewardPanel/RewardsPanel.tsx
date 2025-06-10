import Reward from './Reward';
import styles from './RewardsPanel.module.css'

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
        </div>
    )
}