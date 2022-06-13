import { useEffect, useState } from "react";
import { sampleSize } from "lodash";
import { words as localMock } from "./words";

const useAlias = () => {
    const [moadlState, setModalState] = useState(false);
    const [wordsList, setWordsList] = useState([]);
    const [currentPhraseDescription, setCurrentPhraseDescription] = useState("");

    const handleModalState = () => setModalState(!moadlState);
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

    return {
        wordsList,
        moadlState,
        currentPhraseDescription,
        handleGuess,
        createList,
        handleModalState,
        handleCurrentDescription,
    };
};

export default useAlias;
