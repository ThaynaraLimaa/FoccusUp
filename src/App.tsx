import Timer from "./components/timer/Timer"
import Header from "./layout/Header"
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [username, setUsername] = useLocalStorage('foccusUsername', '')

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
      <Header/>
      <Timer />
    </>
  )
}

export default App
