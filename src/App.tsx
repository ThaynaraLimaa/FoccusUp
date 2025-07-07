import Timer from "./components/timer/Timer"
import Header from "./layout/Header"
import useLocalStorage from "./hooks/useLocalStorage";
import ProductivityPanel from "./components/productivityPanel/ProductivityPanel";
import { LocalStorageKeys } from "./constants/localStorageKeys";
import { DayInformationProvider } from "./context/DayInformationContext";
import { TasksProvider } from "./context/TasksContext";
import { useEffect, useState } from "react";
import { FoccusUpInformations } from "./types/foccusUpInformation";
import { RewardsProvider } from "./context/RewardsContext";

export type TimerState = 'stopped' | 'running' | 'paused'

function App() {
  const [foccusUpInformation, setFoccusUpInformation] = useLocalStorage(LocalStorageKeys.FoccusUpInformations, {} as FoccusUpInformations);
  const [timerState, setTimerState] = useState<TimerState>('stopped');

  if (!foccusUpInformation.username) {
    const prompt = window.prompt(`What's your name?`);
    if (!prompt) {
      window.alert("Alright, I'm going to call you Tony Stank then");
      setFoccusUpInformation(prev => {
        return {
          ...prev,
          username: 'Tony Stank'
        }
      });
    } else {
      setFoccusUpInformation(prev => {
        return {
          ...prev,
          username: prompt
        }
      });
    }
  }

  useEffect(() => {
    // If there isn't a last use date, it is created with the current date 
    if (!foccusUpInformation.currentDate) {
      setFoccusUpInformation(prev => {
        return {
          ...prev,
          currentDate: `${new Date('Apr 05, 2025').toDateString()}`
        }
      })
    }

  }, [])

  return (
    <>
      <Header />
      <DayInformationProvider>
        <TasksProvider>
          <RewardsProvider>
            <Timer username={foccusUpInformation.username} timerState={timerState} setTimerState={setTimerState} />
            {timerState == "stopped" && <ProductivityPanel />}
          </RewardsProvider>
        </TasksProvider>
      </DayInformationProvider>
    </>
  )
}

export default App
