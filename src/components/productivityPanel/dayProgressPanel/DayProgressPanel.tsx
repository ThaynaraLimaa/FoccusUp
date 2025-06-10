import styles from './DayProgressPanel.module.css'

const tempProgress = {
    hours: 4,
    cycles: 8,
    CDR: { earned: 12, spent: 6 },
    redeemedRewards: 1,
    tasks: { completed: 3, total: 5 }
}

type DayProgressPanelProps = {
    panelIndex: number,
    selectedIndex: number
}

export default function DayProgressPanel({ panelIndex, selectedIndex }: DayProgressPanelProps) {
    const taskCompletedPercentage = (tempProgress.tasks.completed / tempProgress.tasks.total) * 100;
    const now = new Date();
    const date = now.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })

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
                <li className={styles.numbers}><span className={styles.number}>{tempProgress.hours}</span>Hours</li>
                <li className={styles.numbers}><span className={styles.number}>{tempProgress.cycles}</span>Cycles</li>
                <li className={styles.numbers}><span className={styles.number}>{tempProgress.CDR.earned}</span>CDR Earned</li>
                <li className={styles.numbers}><span className={styles.number}>{tempProgress.CDR.spent}</span>CDR Spent</li>
                <li className={styles.numbers}><span className={styles.number}>{tempProgress.redeemedRewards}</span>Rewards Redeemed</li>
            </ul>
            <div className={styles.tasksProgressContainer}>
                <div className={styles.taskProgressHeader}>
                    <p>Tasks</p>
                    <span>{tempProgress.tasks.completed}/{tempProgress.tasks.total}</span>
                </div>
                <div className={styles.progressBarContainer} role='progressbar' aria-valuenow={taskCompletedPercentage} aria-valuemin={0} aria-valuemax={100} >
                    <div className={styles.progress} style={{ width: `${taskCompletedPercentage}%` }}></div>
                </div>
            </div>
        </div>
    )
}