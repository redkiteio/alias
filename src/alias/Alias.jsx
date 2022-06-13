import { Typography, Button, IconButton, Tooltip, Modal, Box } from "@mui/material";
import { LightbulbOutlined as LightbulbOutlinedIcon, CloseOutlined as CloseOutlinedIcon } from "@mui/icons-material";
import useAlias from "./aliasHook";
// import AddForm from "./AddForm";

const Alias = () => {
    const { wordsList, moadlState, currentPhraseDescription, handleGuess, createList, handleModalState, handleCurrentDescription } = useAlias();

    return (
        <>
            {/* TODO: find out why POST doesn't work */}
            {/* <AddForm /> */}
            <Typography
                component="div"
                sx={{
                    width: "400px",
                    padding: "10px",
                    margin: "0 auto",
                    border: "2px solid grey",
                }}
            >
                {!!wordsList.length &&
                    wordsList.map((word) => {
                        const { phrase, description, isGuessed } = word;
                        return (
                            <Typography
                                key={phrase}
                                sx={{
                                    padding: "5px",
                                    display: "flex",
                                    marginBottom: "7px",
                                    borderRadius: "5px",
                                    alignItems: "center",
                                    background: isGuessed ? "#90dbe7" : "",
                                }}
                            >
                                <Typography component="span" onClick={() => handleGuess(phrase)} sx={{ flexGrow: 1, cursor: "pointer" }}>
                                    {word.phrase.trim()}
                                </Typography>
                                {!!description && (
                                    <Tooltip title="description" placement="right-start">
                                        <IconButton onClick={() => handleCurrentDescription(description)}>
                                            <LightbulbOutlinedIcon color={isGuessed ? "primary" : "warning"} />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </Typography>
                        );
                    })}
                <Modal open={moadlState} onClose={handleModalState}>
                    <Box
                        sx={{
                            p: 4,
                            width: 400,
                            boxShadow: 24,
                            top: "50%",
                            left: "50%",
                            position: "absolute",
                            border: "1px solid grey",
                            bgcolor: "background.paper",
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <Typography variant="h4" display="flex" component="div" alignItems="center">
                            <Typography component="i" variant="h5" flexGrow={1}>
                                Description
                            </Typography>
                            <IconButton onClick={() => handleModalState()} color="error">
                                <CloseOutlinedIcon />
                            </IconButton>
                        </Typography>
                        <Typography component="div" sx={{ fontWeight: "600" }}>
                            {currentPhraseDescription.trim()}
                        </Typography>
                    </Box>
                </Modal>
                <Button fullWidth size="small" color="primary" variant="contained" onClick={createList}>
                    Next
                </Button>
            </Typography>
        </>
    );
};

export default Alias;
