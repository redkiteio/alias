import { useState, useEffect } from "react";
import './App.css';
import { useAddToHomescreenPrompt } from "./useAddToHomescreenPrompt";


function App() {

  const [prompt, promptToInstall] = useAddToHomescreenPrompt();
  const [isVisible, setVisibleState] = useState(false);

  const hide = () => setVisibleState(false);

  useEffect(() => {
      if (prompt) {
        setVisibleState(true);
      }
    }, [prompt]);

  return (
    <div>
      123456789123
    {isVisible && <div onClick={hide}>
      <button onClick={hide}>Close</button>
      <button onClick={promptToInstall}>Download the App</button>
    </div>}
    </div>
  );
}

export default App;
