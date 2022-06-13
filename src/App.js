import { useState, useEffect } from "react";
import Alias from "./alias/Alias";
import "./App.css";
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
            1234567891234
            {isVisible && (
                <div onClick={hide}>
                    <button onClick={hide}>Close</button>
                    <button onClick={promptToInstall}>Download the App</button>
                </div>
            )}
            <Alias />
        </div>
    );
}

export default App;
