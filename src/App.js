import { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import Alias from "./components/alias/Alias";
import "./App.css";
import { useAddToHomescreenPrompt } from "./useAddToHomescreenPrompt";

function App() {
    const [prompt, promptToInstall] = useAddToHomescreenPrompt();
    const [isVisibleOffer, setIsVisibleOffer] = useState(true);

    const hide = () => setIsVisibleOffer(false);

    useEffect(() => {
        if (prompt) {
            setIsVisibleOffer(true);
        }
    }, [prompt]);

    return (
        <Typography component="div">
            {isVisibleOffer && (
                <Typography
                    component="div"
                    sx={{
                        width: "400px",
                        padding: "10px",
                        margin: "0 auto",
                        textAlign: "center",
                    }}
                >
                    <Typography component="p" variant="h5" marginBottom={2}>
                        Would you like to download the application?
                    </Typography>
                    <Button variant="contained" onClick={hide} sx={{ marginRight: 2 }}>
                        Close and start
                    </Button>
                    <Button variant="contained" onClick={promptToInstall}>
                        Download the App
                    </Button>
                </Typography>
            )}
            {!isVisibleOffer && <Alias />}
        </Typography>
    );
}

export default App;
