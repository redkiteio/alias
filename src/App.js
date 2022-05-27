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

  if (!isVisible) {
    return <div />;
  }

  return (
    <div>
      3
    <div onClick={hide}>
      2
      <button onClick={hide}>Close</button>
      Hello! Wanna add to homescreen?
      <button onClick={promptToInstall}>Add to homescreen</button>
    </div>
    </div>
  );
}

export default App;
