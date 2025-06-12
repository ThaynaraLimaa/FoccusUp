import Timer from "./components/timer/Timer"
import Header from "./layout/Header"
import useLocalStorage from "./hooks/useLocalStorage";
import ProductivityPanel from "./components/productivityPanel/ProductivityPanel";
import { LocalStorageKeys } from "./constants/localStorageKeys";

function App() {
  const [username, setUsername] = useLocalStorage(LocalStorageKeys.Username, '')

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
      <Timer username={username} />
      <ProductivityPanel />
    </>
  )
}

export default App
