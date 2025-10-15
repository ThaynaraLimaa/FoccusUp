import { FormEvent, useContext, useEffect, useRef, useState } from 'react'
import styles from './Timer.module.css'
import { Slider } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { formatNumberDigits } from '../../utils/formatNumber';
import { timeBasedGreeting } from '../../utils/timeBasedGreeting';
import { TimerState } from '../../App';
import { DayInformationContext } from '../../context/DayInformationContext';

type TimerProps = {
    username: string,
    timerState: TimerState,
    setTimerState: (newState: TimerState) => void
}

export default function Timer({ username, timerState, setTimerState }: TimerProps) {
    const { gainCredits, increaseTotalMinutes, increaseTotalCircles } = useContext(DayInformationContext);
    const [circleDuration, setCircleDuration] = useState<number>(45); // state to control initial circle duration 
    const [endTime, setEndTime] = useState(''); // state used to display time when circles ends 
    const [secondsLeft, setSecondsLeft] = useState(0); // state uses to display the remaining time 
    const timerRef = useRef<number | null>(null);

    // Shows an alert if user tries to close the tab when timer is running 
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (timerState === 'running') {
                event.preventDefault();
                event.returnValue = "";
            }
        };

        // Add the event listener
        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [timerState]);


    // Change circleDuration based on slider value 
    const handleSliderChange = (_e: Event, newValue: number) => { setCircleDuration(newValue); }

    // When new circle starts 
    const handleStartFocusCircle = (e: FormEvent) => {
        e.preventDefault();
        setTimerState('running'); // change the timer state 
        const circleEndDate = calculateEndTime(circleDuration); // Date object with when the circle ends 
        setEndTime(`${formatNumberDigits(circleEndDate.getHours())}:${formatNumberDigits(circleEndDate.getMinutes())}`);

        setSecondsLeft(circleDuration * 60); // converts circle duration from minutes to seconds 

        // start timer
        timerRef.current = setInterval(() => {
            setSecondsLeft(calculateTimeRemaining(circleEndDate))
        }, 1000);
    }

    const handlePauseTimer = () => {
        if (timerState == 'running') {
            setTimerState('paused');
            clearInterval(timerRef.current!);
            timerRef.current = null;
        }

        if (timerState == 'paused') {
            setTimerState('running');
            const newCircleEndTime = calculateEndTime(secondsLeft / 60);
            setEndTime(`${formatNumberDigits(newCircleEndTime.getHours())}:${formatNumberDigits(newCircleEndTime.getMinutes())}`);

            timerRef.current = setInterval(() => {
                setSecondsLeft(calculateTimeRemaining(newCircleEndTime))
            }, 1000);
        }
    };

    useEffect(() => {
        // When circles ends 
        if (secondsLeft == 0 && timerState == 'running') {
            clearInterval(timerRef.current!);
            setTimerState('stopped');

            alert('congratulations!! You finished a focus circle!');

            // Add credits and update day stats 
            gainCredits(calculateCreditsEarned(circleDuration), 'gaining');
            increaseTotalCircles();
            increaseTotalMinutes(circleDuration);

        }
    }, [secondsLeft])

    return (
        <>
            {timerState == 'stopped' ? (
                <div className={styles.timerContainer}>
                    <p className={styles.message}>{timeBasedGreeting()}, {username}</p>
                    <div className={styles.clock}>
                        {circleDuration}:00
                    </div>
                    <form className={styles.form} onSubmit={handleStartFocusCircle}>
                        <Slider
                            aria-label='minutes'
                            value={circleDuration}
                            min={15}
                            max={180}
                            onChange={handleSliderChange}
                            sx={{ width: '100%', height: 5, color: 'var(--color-primary)', }}
                        />
                        <button className={styles.button}>Start</button>
                    </form>
                </div>
            ) : (
                <div className={`${styles.timerContainer} ${styles.timerContainerFocusView}`}>
                    <p className={styles.message}>Let's focus, {username}</p>
                    <div className={`${styles.clock} ${styles.clockFocusView}`}>
                        {convertSecondsToMinutes(secondsLeft)}
                    </div>
                    <div className={styles.progressContainer}>
                        <div className={styles.progress} style={{ width: `${((secondsLeft / (circleDuration * 60)) * 100)}%` }}></div>
                    </div>
                    <button className={styles.button} onClick={handlePauseTimer}>
                        {timerState === 'running' ? 'Pause' : 'Start'}
                    </button>
                    <p className={styles.endTime}><FontAwesomeIcon icon={faClock} /> Ends at {endTime} </p>
                </div>
            )
            }
        </>
    )
}

// Convert seconds to minutes and seconds 
function convertSecondsToMinutes(secs: number) {
    const minutes = Math.floor(secs / 60)
    const seconds = secs % 60
    return `${formatNumberDigits(minutes)}:${formatNumberDigits(seconds)}`
}

// Calculate when the time circle will end 
function calculateEndTime(circleDurationInMin: number): Date {
    const now = new Date().getTime();
    const durationInMillis = circleDurationInMin * 1000 * 60;
    const circlesEndsAt = now + durationInMillis;
    const endCircleTime = new Date(circlesEndsAt);

    return endCircleTime
}

function calculateTimeRemaining(endTime: Date) {
    const now = new Date().getTime();
    const endTimeInMillis = endTime.getTime();
    const diff = endTimeInMillis - now;

    if (diff <= 0) return 0;

    const secondsRemaining = Math.floor(diff / 1000)

    return secondsRemaining
}

// Calculate how many credits earned based on a circle durarion 
function calculateCreditsEarned(min: number) {
    const minutesPerCredit = 15; 
    return Math.floor(min / minutesPerCredit)
}