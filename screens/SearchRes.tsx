/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable space-in-parens */
import React, { useContext } from 'react';
import { Text } from '@ui-kitten/components';
import { singleWord, AppContext, myWords } from '../App';
import { styles } from '../styles';
import { getCapitalizedIfNeeded, getTypeOfWord } from '../assets/utils';
import { TouchableOpacity, View } from 'react-native';

type searchProps = {
    word: singleWord;
    isAlreadyThere: boolean;
    setAddSearchResults: (words: myWords) => void;
    setAddSearchKeyword: (word: string) => void;
};

export const SearchRes = (props: searchProps) => {
    const { word, isAlreadyThere, setAddSearchResults, setAddSearchKeyword } = props;

    const appData = useContext(AppContext);

    const { addSingleWord } = appData;

    const typeOfWord = getTypeOfWord(word);

    const addSmartHandler = (passedWord: singleWord) => {
        if (!isAlreadyThere) {
            addSingleWord(passedWord);
        }

        setAddSearchResults([]);
        setAddSearchKeyword('');
    };

    return (
        <TouchableOpacity
            onPress={() => addSmartHandler(word)}
            style={styles.singleSearchResult}
            activeOpacity={0.9}
        >
            <View style={[
                styles.searchResultWordBlock,
                isAlreadyThere && styles['searchResultWordBlock--Disabled']
            ]}>
                <Text>
                    <Text style={styles.singleSearchResultMainWord}>{getCapitalizedIfNeeded(word)}</Text>
                </Text>
                <Text style={styles.enWord} >{word.og}</Text>
            </View>
            <View style={styles.searchResultTypeOfWordBlock}>
                <Text style={[styles.typeOfWord, styles[typeOfWord.class]]}>{typeOfWord.name}</Text>
            </View>
        </TouchableOpacity>
    );
};

