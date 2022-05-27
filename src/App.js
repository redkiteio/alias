import * as React from "react";
import './App.css';
import { useAddToHomescreenPrompt } from "./useAddToHomescreenPrompt";


function App() {

  const [prompt, promptToInstall] = useAddToHomescreenPrompt();
  const [isVisible, setVisibleState] = React.useState(false);

  const hide = () => setVisibleState(false);

  React.useEffect(
    () => {
      if (prompt) {
        setVisibleState(true);
      }
    },
    [prompt]
  );

  return (
    <div>
      12345
    {isVisible && <div onClick={hide}>
      <button onClick={hide}>Close</button>
      <button onClick={promptToInstall}>Add to homescreen</button>
    </div>}
    </div>
  );
}

export default App;
