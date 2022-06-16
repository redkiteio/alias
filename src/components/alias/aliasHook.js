import { useEffect, useState } from "react";
import { sampleSize } from "lodash";
import { words as localMock } from "./words";

const useAlias = () => {
    const [round, setRound] = useState(1);
    const [time, setTime] = useState(60);
    const [timeCopy, setTimeCopy] = useState(60);
    const [turn, setTurn] = useState("teamOne");
    const [winner, setWinner] = useState("");
    const [teamOne, setTeamOne] = useState("Team-1");
    const [teamTwo, setTeamTwo] = useState("Team-2");
    const [teamOneCount, setTeamOneCount] = useState(0);
    const [teamTwoCount, setTeamTwoCount] = useState(0);
    const [winningCount, setWinningCount] = useState(50);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isMiddleRound, setIsMiddleRound] = useState(false);
    const [wordsList, setWordsList] = useState([]);
    const [modalState, setModalState] = useState(false);
    const [currentPhraseDescription, setCurrentPhraseDescription] = useState("");

    const handleStartGame = () => {
        setIsGameStarted(true);
    };

    const handleRestartGame = () => {
        setIsGameStarted(false);
        setTime(0);
        setTimeCopy(0);
        setTurn("teamOne");
        setWinner("");
        setTeamOne("");
        setTeamTwo("");
        setTeamOneCount(0);
        setTeamTwoCount(0);
        setWinningCount(0);
        setIsMiddleRound(false);
        setModalState(false);
        createList();
        setRound(1);
    };

    const handleContinueGame = () => {
        createList();
        setTime(timeCopy);
        setModalState(false);
        setIsMiddleRound(false);
        setTurn(turn === "teamOne" ? "teamTwo" : "teamOne");
        setCurrentPhraseDescription("");
        setRound((prevRound) => prevRound + 1);
    };

    const handleGameChange = (e, name) => {
        const value = e.target.value;
        if (name === "time") {
            setTime(Number(value));
            setTimeCopy(Number(value));
        }
        if (name === "teamOne") {
            setTeamOne(value);
        }
        if (name === "teamTwo") {
            setTeamTwo(value);
        }
        if (name === "winningCount") {
            setWinningCount(Number(value));
        }
    };

    const handleModalState = () => {
        setModalState(!modalState);
        if (modalState) setCurrentPhraseDescription("");
    };

    const handleCurrentDescription = (description) => {
        setCurrentPhraseDescription(description);
        handleModalState();
    };

    const createList = () => {
        const randomList = sampleSize(localMock, 5);
        const transformToState = randomList.map((word) => {
            return { ...word, isGuessed: false };
        });

        setWordsList(transformToState);
    };

    const handleGuess = (phrase) => {
        const toggledStateGuess = wordsList.map((word) => {
            if (word.phrase === phrase) {
                if (turn === "teamOne") {
                    word.isGuessed ? setTeamOneCount((prevCount) => prevCount - 1) : setTeamOneCount((prevCount) => prevCount + 1);
                }
                if (turn === "teamTwo") {
                    word.isGuessed ? setTeamTwoCount((prevCount) => prevCount - 1) : setTeamTwoCount((prevCount) => prevCount + 1);
                }

                word.isGuessed ? (word.isGuessed = false) : (word.isGuessed = true);

                return word;
            }

            return word;
        });

        setWordsList(toggledStateGuess);
    };

    useEffect(() => {
        createList();
    }, []);

    useEffect(() => {
        if (isGameStarted && time > 0) {
            const intervalId = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        }
        if (isGameStarted && time === 0) {
            if (!winner) {
                setModalState(true);
                setIsMiddleRound(true);
            }
        }
    }, [time, isGameStarted]);

    useEffect(() => {
        if (isGameStarted && time === 0 && round % 2 === 0) {
            let winner;
            const isAboveWinningCount = teamOneCount >= winningCount || teamTwoCount >= winningCount;
            winner = teamOneCount > teamTwoCount ? teamOne : teamTwo;
            winner = teamOneCount === teamTwoCount ? "Equal game" : winner;
            if (isAboveWinningCount) {
                setModalState(true);
                setWinner(winner);
                setIsMiddleRound(false);
            }
        }
    }, [teamOneCount, teamTwoCount, time]);

    return {
        time,
        turn,
        winner,
        teamOne,
        teamTwo,
        wordsList,
        modalState,
        winningCount,
        teamOneCount,
        teamTwoCount,
        isGameStarted,
        isMiddleRound,
        currentPhraseDescription,
        createList,
        handleGuess,
        handleStartGame,
        handleGameChange,
        handleModalState,
        handleRestartGame,
        handleContinueGame,
        handleCurrentDescription,
    };
};

export default useAlias;
