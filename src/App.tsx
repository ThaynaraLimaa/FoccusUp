import Timer from "./components/timer/Timer"
import Header from "./layout/Header"
import useLocalStorage from "./hooks/useLocalStorage";
import ProductivityPanel from "./components/productivityPanel/ProductivityPanel";
import { LocalStorageKeys } from "./constants/localStorageKeys";
import { DayInformationProvider } from "./context/DayInformationContext";
import { TasksProvider } from "./context/TasksContext";
import { useEffect, useState } from "react";

export type TimerState = 'stopped' | 'running' | 'paused'

function App() {
  const [username, setUsername] = useLocalStorage(LocalStorageKeys.Username, '')
  const [timerState, setTimerState] = useState<TimerState>('stopped'); 

  useEffect(() => console.log(timerState), [timerState]);

  if (!username) {
    const prompt = window.prompt(`What's your name?`);
    if (!prompt) {
      window.alert("Alright, I'm going to call you Tony Stank then");
      setUsername('Tony Stank');
    } else {
      setUsername(prompt);
    }
  }

  return (
    <>
      <Header />
      <DayInformationProvider>
        <TasksProvider>
          <Timer username={username} timerState={timerState} setTimerState={setTimerState}/>
          {timerState == "stopped" && <ProductivityPanel />}
        </TasksProvider>
      </DayInformationProvider>
    </>
  )
}

export default App
