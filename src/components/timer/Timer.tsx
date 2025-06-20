import { FormEvent, useEffect, useRef, useState } from 'react'
import styles from './Timer.module.css'
import { Slider } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { formatNumberDigits } from '../../utils/formatNumber';
import { timeBasedGreeting } from '../../utils/timeBasedGreeting';
import { TimerState } from '../../App';

type TimerProps = {
    username: string,
    timerState: TimerState,
    setTimerState: (newState: TimerState) => void
}

export default function Timer({ username, timerState, setTimerState }: TimerProps) {
    const [circleDuration, setCircleDuration] = useState<number>(1);
    const [timeLeft, setTimeLeft] = useState(0);
    const [endHour, setEndHour] = useState('');
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

    // When circles ends 
    if (timeLeft == 0 && timerState == 'running') {
        alert('congratulations!! You finished a focus circle!');
        clearInterval(timerRef.current!);
        setTimerState('stopped');
    }

    const handleSliderChange = (e: Event, newValue: number) => {
        setCircleDuration(newValue);
    }

    // When new circle starts 
    const handleStartFocusCircle = (e: FormEvent) => {
        e.preventDefault();
        setTimerState('running');
        setEndHour(calculateEndHour(circleDuration));
        setTimeLeft(circleDuration * 60); // converts circle duration from minutes to seconds 

        // start timer
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => prev - 1)
        }, 100);
    }

    const handlePauseTimer = () => {
        if (timerState == 'running') {
            setTimerState('paused');
            clearInterval(timerRef.current!);
            timerRef.current = null;
        }

        if (timerState == 'paused') {
            setTimerState('running');
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1)
            }, 1000);
        }
    };

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
                        {convertSecondsToMinutes(timeLeft)}
                    </div>
                    <div className={styles.progressContainer}>
                        <div className={styles.progress} style={{ width: `${((timeLeft / (circleDuration * 60)) * 100)}%` }}></div>
                    </div>
                    <button className={styles.button} onClick={handlePauseTimer}>
                        {timerState === 'running' ? 'Pause' : 'Start'}
                    </button>
                    <p className={styles.endTime}><FontAwesomeIcon icon={faClock} /> Ends at {endHour}</p>
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

function calculateEndHour(min: number): string {
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    const hours = Math.floor(min / 60);
    const minutes = min % 60;

    let endHour = currentHour + hours < 23 ? currentHour + hours : (currentHour + hours) - 24
    let endMinutes;

    if ((currentMinute + minutes) < 60) {
        endMinutes = currentMinute + minutes
    } else {
        endMinutes = (currentMinute + minutes) % 60
        endHour += 1
    }

    return `${formatNumberDigits(endHour)}:${formatNumberDigits(endMinutes)}`
}