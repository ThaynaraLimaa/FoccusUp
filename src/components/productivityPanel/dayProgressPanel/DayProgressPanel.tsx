import { useContext } from 'react';
import styles from './DayProgressPanel.module.css'
import { DayInformationContext } from '../../../context/DayInformationContext';
import { TasksContext } from '../../../context/TasksContext';

type DayProgressPanelProps = {
    panelIndex: number,
    selectedIndex: number
}

export default function DayProgressPanel({ panelIndex, selectedIndex }: DayProgressPanelProps) {
    const { totalCircles, totalMinutes, creditsEarned, creditsSpent, rewardsRedeemed } = useContext(DayInformationContext);
    const { totalTasks, completedTasks } = useContext(TasksContext);
    const taskCompletedPercentage = (completedTasks / totalTasks) * 100;
    const now = new Date();
    const date = now.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });

    const formatTime = (min: number): string => {
        const hours = Math.floor(min / 60);
        const minutes = min % 60;

        if (hours == 0) {
            return `0h ${min}m`
        }

        return `${hours}h ${minutes}m`

    }

    return (
        <div
            className={styles.dayProgressPanelContainer}
            role='tabpanel'
            hidden={selectedIndex !== panelIndex}
            style={{ display: selectedIndex !== panelIndex ? 'none' : 'flex' }}
            id={`productivity-tabpanel-${panelIndex}`}
            aria-labelledby='day-progress-tab'
        >
            <div className={styles.header}>
                <h2>Today's Progress</h2>
                <span>{date}</span>
            </div>
            <ul className={styles.progressNumbersContainer}>
                <li className={styles.numbers}><span className={styles.number}>{formatTime(totalMinutes)}</span>Time focused</li>
                <li className={styles.numbers}><span className={styles.number}>{totalCircles}</span>Cycles</li>
                <li className={styles.numbers}><span className={styles.number}>{creditsEarned}</span>CDR Earned</li>
                <li className={styles.numbers}><span className={styles.number}>{creditsSpent}</span>CDR Spended</li>
                <li className={styles.numbers}><span className={styles.number}>{rewardsRedeemed}</span>Rewards Redeemed</li>
            </ul>
            <div className={styles.tasksProgressContainer}>
                <div className={styles.taskProgressHeader}>
                    <p>Tasks</p>
                    <span>{completedTasks}/{totalTasks}</span>
                </div>
                <div className={styles.progressBarContainer} role='progressbar' aria-valuenow={taskCompletedPercentage} aria-valuemin={0} aria-valuemax={100} >
                    <div className={styles.progress} style={{ width: `${taskCompletedPercentage}%` }}></div>
                </div>
            </div>
        </div>
    )
}